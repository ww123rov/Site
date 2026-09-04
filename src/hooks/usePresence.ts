import { useEffect, useRef, useState } from "react";
import {
  Op,
  type Presence,
  type PresenceState,
  type SocketFrame,
} from "../lib/lanyard-types";

const REST_ENDPOINT = "https://api.lanyard.rest/v1/users";
const SOCKET_ENDPOINT = "wss://api.lanyard.rest/socket";

const HEARTBEAT_LEAD_MS = 3_000;
const MAX_BACKOFF_MS = 30_000;
const REST_POLL_MS = 60_000;

function isPresence(value: unknown): value is Presence {
  return (
    typeof value === "object" &&
    value !== null &&
    "discord_status" in value &&
    "discord_user" in value
  );
}

function readInitState(
  data: Presence | Record<string, Presence>,
  userId: string,
): Presence | null {
  if (isPresence(data)) return data;
  return data[userId] ?? null;
}

export function usePresence(userId: string): PresenceState {
  const [state, setState] = useState<PresenceState>({
    presence: null,
    source: "none",
    loading: true,
    error: false,
  });

  const socketRef = useRef<WebSocket | null>(null);
  const heartbeatRef = useRef<number | null>(null);
  const reconnectRef = useRef<number | null>(null);
  const pollRef = useRef<number | null>(null);
  const attemptsRef = useRef(0);

  useEffect(() => {
    let disposed = false;

    const clearTimer = (ref: React.RefObject<number | null>) => {
      if (ref.current !== null) {
        clearTimeout(ref.current);
        clearInterval(ref.current);
        ref.current = null;
      }
    };

    const closeSocket = () => {
      clearTimer(heartbeatRef);
      const socket = socketRef.current;
      socketRef.current = null;
      if (!socket) return;
      socket.onopen = null;
      socket.onmessage = null;
      socket.onclose = null;
      socket.onerror = null;
      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        socket.close(1000, "client");
      }
    };

    const applyPresence = (
      presence: Presence | null,
      source: "socket" | "rest",
    ) => {
      if (disposed || !presence) return;
      setState({ presence, source, loading: false, error: false });
    };

    const fetchRest = async () => {
      try {
        const response = await fetch(
          `${REST_ENDPOINT}/${encodeURIComponent(userId)}`,
          { cache: "no-store" },
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const body: unknown = await response.json();
        if (
          typeof body === "object" &&
          body !== null &&
          "data" in body &&
          isPresence(body.data)
        ) {
          applyPresence(body.data, "rest");
          return true;
        }
        throw new Error("unexpected payload");
      } catch {
        if (!disposed) {
          setState((prev) =>
            prev.presence
              ? prev
              : { presence: null, source: "none", loading: false, error: true },
          );
        }
        return false;
      }
    };

    const startRestPolling = () => {
      if (pollRef.current !== null) return;
      void fetchRest();
      pollRef.current = window.setInterval(() => void fetchRest(), REST_POLL_MS);
    };

    const connect = () => {
      if (disposed || document.hidden) return;
      closeSocket();

      let socket: WebSocket;
      try {
        socket = new WebSocket(SOCKET_ENDPOINT);
      } catch {
        startRestPolling();
        return;
      }
      socketRef.current = socket;

      socket.onmessage = (event: MessageEvent<string>) => {
        let frame: SocketFrame;
        try {
          frame = JSON.parse(event.data) as SocketFrame;
        } catch {
          return;
        }

        if (frame.op === Op.Hello) {
          attemptsRef.current = 0;
          clearTimer(pollRef);
          socket.send(
            JSON.stringify({
              op: Op.Initialize,
              d: { subscribe_to_id: userId },
            }),
          );
          const interval = Math.max(
            5_000,
            frame.d.heartbeat_interval - HEARTBEAT_LEAD_MS,
          );
          clearTimer(heartbeatRef);
          heartbeatRef.current = window.setInterval(() => {
            if (socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify({ op: Op.Heartbeat }));
            }
          }, interval);
          return;
        }

        if (frame.op !== Op.Event) return;
        if (frame.t === "INIT_STATE") {
          applyPresence(readInitState(frame.d, userId), "socket");
        } else if (frame.t === "PRESENCE_UPDATE") {
          applyPresence(frame.d, "socket");
        }
      };

      socket.onclose = () => {
        clearTimer(heartbeatRef);
        socketRef.current = null;
        if (disposed || document.hidden) return;

        attemptsRef.current += 1;
        startRestPolling();
        const delay = Math.min(
          1_000 * 2 ** attemptsRef.current,
          MAX_BACKOFF_MS,
        );
        clearTimer(reconnectRef);
        reconnectRef.current = window.setTimeout(connect, delay);
      };
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        closeSocket();
        clearTimer(reconnectRef);
        clearTimer(pollRef);
        return;
      }
      void fetchRest();
      if (!socketRef.current) {
        attemptsRef.current = 0;
        connect();
      }
    };

    void fetchRest();
    connect();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", onVisibilityChange);
      closeSocket();
      clearTimer(reconnectRef);
      clearTimer(pollRef);
    };
  }, [userId]);

  return state;
}
