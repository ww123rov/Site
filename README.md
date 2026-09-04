# wweshka — bio

Личная страница-визитка: статус в Discord и трек из Spotify в реальном времени,
контакты, проекты, стек.

**Живая версия:** https://ww123rov.github.io/Site/

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
```

`usePresence` открывает сокет Lanyard, отвечает на `op 1` своим `op 3` каждые
27 секунд (сервер рвёт соединение ровно на 30-й) и переподключается с
экспоненциальной задержкой. Пока сокет лежит, presence подтягивается по REST раз
в минуту. На скрытой вкладке и сокет, и все таймеры останавливаются.

## Деплой

Пуш в `main` запускает `.github/workflows/deploy.yml`: линт, сборка, публикация
`dist/` в GitHub Pages. В настройках репозитория **Settings → Pages → Source**
должно быть выбрано **GitHub Actions**.

## Доступность

Контраст текста проверен: минимум 4.93:1 на самой светлой поверхности (норма
WCAG AA — 4.5:1). Движение убирается по `prefers-reduced-motion`, прозрачность —
по `prefers-reduced-transparency`, ховер-эффекты включаются только при
`(hover: hover) and (pointer: fine)`. Цель нажатия — не меньше 44px.

## Лицензия

[MIT](./LICENSE)
