# wweshka — bio

Личная страница-визитка: статус в Discord и трек из Spotify в реальном времени,
контакты, проекты, стек.

**Живая версия:** https://ww123rov.github.io/Site/

> Этот README писал не автор, а ИИ — автору было лень.

## Стек

| Что | Чем |
| --- | --- |
| UI | React 19 + TypeScript (strict), React Compiler |
| Стили | Tailwind CSS 4 через `@tailwindcss/vite`, токены в `src/styles/tokens.css` |
| Сборка | Vite 8, `base: "./"` — работает и из подпути `/Site/`, и из корня домена |
| Шрифт | Inter Variable, локально через `@fontsource-variable` (без CDN) |
| Данные | [Lanyard](https://github.com/Phineas/lanyard): WebSocket + REST-фолбэк |

## Разработка

```bash
npm install
npm run dev        # локальный сервер
npm run build      # сборка в dist/
npm run preview    # посмотреть сборку
npm run lint       # ESLint
npm run typecheck  # tsc без emit
npm run deploy     # сборка + публикация на Pages
```

Нужен Node 20.19+ или 22.12+ (требование Vite 8).

## Структура

```
src/
  lib/profile.ts        весь текст и ссылки страницы — правки контента только здесь
  lib/lanyard-types.ts  типы Lanyard, сверенные с живым API
  lib/discord.ts        аватар, статус, форматирование времени
  hooks/usePresence.ts  сокет с heartbeat, backoff и REST-фолбэком
  hooks/useClock.ts     часы по Europe/Warsaw (CET/CEST определяется сам)
  hooks/useNow.ts       тик раз в секунду для прогресса трека
  components/           карточки страницы
  styles/tokens.css     примитивы -> семантические токены
  styles/app.css        база, компоненты, утилиты
scripts/publish.mjs     сборка dist/ -> ветка gh-pages
```

`usePresence` открывает сокет Lanyard, отвечает на `op 1` своим `op 3` каждые
27 секунд (сервер рвёт соединение ровно на 30-й) и переподключается с
экспоненциальной задержкой. Пока сокет лежит, presence подтягивается по REST раз
в минуту. На скрытой вкладке и сокет, и все таймеры останавливаются.

## Деплой

```bash
npm run deploy
```

Скрипт собирает `dist/`, кладёт его коммитом в ветку `gh-pages` и пушит. Ветка
содержит только собранные файлы, история `main` при этом не трогается. В
**Settings → Pages → Source** выбрана ветка `gh-pages`, папка `/`.

GitHub Actions здесь не используются: на аккаунте стоит блокировка по биллингу,
задание не стартует вообще («The job was not started because your account is
locked due to a billing issue»), поэтому workflow из репозитория убран.

## Доступность

Контраст текста проверен: минимум 4.93:1 на самой светлой поверхности (норма
WCAG AA — 4.5:1). Движение убирается по `prefers-reduced-motion`, прозрачность —
по `prefers-reduced-transparency`, ховер-эффекты включаются только при
`(hover: hover) and (pointer: fine)`. Цель нажатия — не меньше 44px.

## Лицензия

[MIT](./LICENSE)
