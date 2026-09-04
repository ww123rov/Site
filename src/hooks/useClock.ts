import { useEffect, useState } from "react";

export function useClock(timeZone: string): { time: string; zone: string } {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timer: number | null = null;

    const stop = () => {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    };

    const start = () => {
      if (timer !== null) return;
      setNow(new Date());
      timer = window.setInterval(() => setNow(new Date()), 1_000);
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const time = now.toLocaleTimeString("ru-RU", { timeZone, hour12: false });
  const zone =
    new Intl.DateTimeFormat("en-GB", { timeZone, timeZoneName: "short" })
      .formatToParts(now)
      .find((part) => part.type === "timeZoneName")?.value ?? "";

  return { time, zone };
}
