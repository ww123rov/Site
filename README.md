# wweshka · bio

Портфолио и личная страница разработчика: статус в Discord и трек из Spotify в реальном времени, проекты, стек и контакты.

**Сайт:** https://ww123rov.github.io/Site/

## Стек

- React 19, TypeScript
- Tailwind CSS 4, `@tailwindcss/vite`
- Vite 8
- Inter Variable
- Lanyard API (WebSocket + REST fallback)

## Команды

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
npm run deploy
```

Требуется Node.js 20.19+ или 22.12+.

## Структура

```
src/
  lib/profile.ts        контент и ссылки профиля
  lib/lanyard-types.ts  типы Lanyard API
  lib/discord.ts        аватар, статус, форматирование времени
  hooks/usePresence.ts  WebSocket с heartbeat и REST-фолбэком
  hooks/useClock.ts     часы с автоопределением часового пояса
  hooks/useNow.ts       таймер для трека Spotify
  components/           компоненты страницы
  styles/tokens.css     дизайн-токены
  styles/app.css        базовые стили и компоненты
scripts/publish.mjs     скрипт публикации в gh-pages
```

## Лицензия

[MIT](./LICENSE)
