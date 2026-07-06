# Wayfinder — AI Trip-Planning Cockpit

*Портфолио-проект. Демонстрирует самый дефицитный навык рынка 2026: интерфейсный слой между агентом и человеком (agent UX / generative UI), построенный на motion/SVG-стеке.*

Название рабочее — переименуй как хочешь (варианты: Wayfinder, Voyage, Copilot Deck, Atlas).

---

## ЧАСТЬ 1 — ТЗ проекта

### Цель
Собрать standalone-демо, которое за 20–30 секунд показывает, что автор умеет строить **cockpit для AI-агента**: прозрачный, управляемый, анимированный интерфейс, а не «чёрный ящик с чатом». Итог — живой деплой + GitHub + demo-видео для LinkedIn и портфолио.

### Концепция
Пользователь описывает поездку на естественном языке. Агент планирует её через несколько вызовов инструментов. Но фокус проекта — **не** планирование поездки, а **интерфейс наблюдения и контроля над агентом**. Домен «путешествие» выбран потому что он визуально богатый (карта, карточки, таймлайн), понятен всем и не требует платных API (все данные — мок).

### Layout: двухпанельный cockpit
- **Левая панель:** ввод намерения + живой reasoning trace (анимированная лента шагов агента) + чат.
- **Правая панель (canvas):** generative UI — карточки-предложения (рейс, отель,活день маршрута), карта, итоговый таймлайн.

### Ключевые фичи (это и есть 5 дефицитных паттернов agent UX)
1. **Live reasoning trace.** Шаги агента в реальном времени как анимированный timeline/граф: «разбираю запрос → ищу отели → фильтрую по бюджету → собираю день 1…». Здесь работает твой SVG/motion-скилл — не текст, а движущаяся визуализация.
2. **Tool-call inspector.** Раскрывающиеся карточки: какой инструмент вызван, с какими аргументами, что вернул. Прозрачность вместо чёрного ящика.
3. **Human-in-the-loop gate.** Перед «финализацией/бронированием» агент останавливается и ждёт: кнопки Approve / Reject / Edit. (В Vercel AI SDK это tool approval.)
4. **Progressive delegation.** Слайдер/тумблер автономии: «спрашивать всегда → спрашивать только перед бронированием → полная автономия». Прямо паттерн доверия из статей 2026.
5. **Generative UI.** Результаты инструментов рендерятся как настоящие React-компоненты (карточки, карта, таймлайн), а не текст. Ядро тренда: соединение результата tool call с React-компонентом.

### Стек
- **Next.js (App Router) + TypeScript**
- **Vercel AI SDK** — `streamText`, tool calling, generative UI (tool → компонент)
- **Модель:** Anthropic Claude (haiku — дёшево) через AI SDK; для локальной разработки можно бесплатный Gemini/Groq
- **Карта:** MapLibre + бесплатные тайлы (переиспользуешь свой опыт)
- **State:** **Zustand** (бонус — легитимно попадает в резюме)
- **Motion:** твой SVG / CSS / GSAP стек — reasoning trace, переходы состояний карточек, сборка маршрута
- **Данные:** мок-инструменты на seeded JSON. `searchFlights`, `searchHotels`, `searchActivities`, `buildItinerary` возвращают реалистичные захардкоженные данные. Без бэкенда, без БД, без платных API.

### Границы (что НЕ делать)
Никаких реальных бронирований, оплат, авторизации, реальных travel-API, бэкенда и базы. Всё мок. 100% усилий — в cockpit-UX и motion. Это осознанный скоуп, а не недоделка — так и скажешь на интервью.

### Критерий готовности (demo-сценарий на видео)
1. Пустой hero с полем ввода → печатаешь намерение.
2. Агент начинает рассуждать — анимированный trace оживает.
3. На canvas собираются карточки-предложения (с переходами).
4. Агент упирается в approval gate перед финализацией — ты жмёшь Approve.
5. Маршрут финализируется, карта показывает нитку по точкам, таймлайн собран.
6. Бонус-дубль: двигаешь слайдер автономии на «full auto» и повторяешь — агент проходит без остановок.

### Порядок сборки (по вечерам)
1. **Дизайн в Claude Design** (см. Часть 2) → получаешь визуал и токены.
2. Двухпанельный каркас + статичные generative-UI карточки по дизайну.
3. Подключаешь Vercel AI SDK + 3 мок-инструмента + стриминг.
4. Reasoning trace — анимация шагов.
5. Human-in-the-loop gate + слайдер delegation.
6. MapLibre + полировка переходов + запись demo.

---

## ЧАСТЬ 2 — Brief for Claude Design

*Paste the block below into Claude Design as-is.*

---

**Product:** "Wayfinder" — a web app that plans a trip through an AI agent. The hero of the product is not the trip, it's the **agent cockpit**: a transparent, controllable interface where the user watches the AI reason step-by-step, inspects what it's doing, and approves key actions. Think "mission control for an AI agent," applied to travel planning.

**Audience & tone:** For a technical, design-literate audience (it's a portfolio piece aimed at senior engineering roles). It should feel precise, calm and confident — a professional control surface, not a playful consumer app. Avoid generic SaaS templates, avoid glassmorphism clichés, avoid stocky gradients.

**Aesthetic direction:** Editorial and spatial. Generous whitespace, a strong typographic hierarchy, one confident accent color against a restrained neutral base. It should read as a premium "instrument" — closer to a pro audio/aviation console or a refined analytics tool than a marketing site. Dark mode as the primary theme, with a considered light variant. Motion is central to this product, so design with animation in mind (states that transition, not just static screens).

**Layout — a two-pane cockpit (desktop-first):**
- **Left pane — the agent lane:** the natural-language input, the conversation, and a vertical **reasoning trace** — an animated timeline of the agent's steps (parsing intent, searching, filtering, assembling). Each step is a node with a live status (running / done / waiting).
- **Right pane — the canvas:** where the agent's output renders as rich components — proposal cards (flight, hotel, a day-by-day itinerary), a map, and a final trip timeline. This is the "generative UI" surface; it fills in progressively as the agent works.

**Key components to design:**
1. **Hero / empty state** — a single, inviting intent input ("Describe your trip…") with a few example chips.
2. **Reasoning trace** — the animated step timeline (running/done/waiting states, with a sense of motion between steps).
3. **Tool-call inspector card** — an expandable card showing the tool name, its arguments, and its returned result. Clean, monospace-tinged, developer-legible.
4. **Proposal cards** — flight card, hotel card, and a day-of-itinerary card. Rich but scannable.
5. **Human-in-the-loop gate** — an inline approval moment before finalizing: Approve / Reject / Edit, visually distinct so it clearly halts the flow.
6. **Progressive delegation control** — a 3-stop control for autonomy level ("Ask always / Ask before booking / Full auto").
7. **Map canvas frame** — how the map sits in the right pane and how the finalized route/timeline is presented.

**Motion notes (for the designer to account for):** the reasoning trace should feel alive as steps progress; proposal cards should assemble onto the canvas rather than pop in; state changes (waiting → approved) should be clearly animated. Design the states so these transitions are obvious.

**Color & type:** propose a restrained neutral base + one accent, plus semantic colors for agent states (running, waiting-for-human, done, error). A precise, modern typographic system with a clear display/body split, and a monospace accent for the tool inspector.

**Deliverable:** desktop-first screens for the states above (hero, mid-plan with reasoning trace + partial canvas, approval gate, finalized trip with map), plus the reusable component set and design tokens.
