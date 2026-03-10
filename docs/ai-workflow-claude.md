# AI Workflow — Claude (claude.ai)

## Role in This Project

Claude was used exclusively as a planning and architecture partner before any code was written. No code was generated in this session. All outputs were prompts, data models, API contracts, and architectural decisions — handed off to Cursor for implementation.

---

## What Claude Assisted With

Claude helped clarify and scope the requirements from the brief, identifying what was essential (auth, transaction history, redemption flow) and what to leave out to stay within scope. From there it assisted in choosing the technology stack and justifying tradeoffs — Express over NestJS given the simplicity of the API surface, in-memory state over SQLite for portability, and `useState` in App.tsx over Context API given the limited state complexity.

Claude designed the core data model — `Resident`, `Transaction`, and `GiftCard` — including the decision to denormalize `balanceAfter` onto each transaction record so the frontend could display balance snapshots without reconstructing history. It then designed the full API contract: 5 routes, all request/response shapes, HTTP status codes, and a 10-step sequential validation sequence for the redemption endpoint that ensures all checks pass before any state is mutated.

Beyond the data model and API, Claude structured the MVC directory layout and sequenced the entire build order so that each Cursor prompt could depend on already-implemented layers — types first, then mock data, then server, then frontend components, then data layer wiring. It also wrote all Cursor prompts and recommended specific libraries (`react-hot-toast`, `logo.dev`, `concurrently`) while explicitly recommending against others (NestJS, Redux, Context API, Docker).

---

## How Suggestions Were Reviewed

All architectural suggestions were evaluated before accepting. Claude initially proposed a flat route structure that collapsed controllers into route handlers. This was rejected in favor of a familiar MVC pattern — routes, controllers, and models as separate concerns. Claude adapted the structure accordingly and the prompt was rewritten to match.

Claude also recommended implementing JWT auth last as a time-saving measure, treating it as an add-on rather than a core concern. This was overridden — JWT was implemented first so auth was threaded through the entire build from the start rather than retrofitted at the end. This also meant the curl test script could fully validate ownership enforcement before any frontend work began.

Library suggestions were evaluated individually. `react-hot-toast` was accepted — minimal, zero runtime dependencies, appropriate for the scope. Clearbit's logo API was suggested for brand logos and rejected in favor of `logo.dev`, which is more reliable and doesn't require an API key. Context API was suggested for state management and rejected — `useState` in App.tsx was sufficient and adding Context would have been unnecessary complexity.

---

## Human Decisions That Shaped the Final Output

- MVC structure over flat routes — matched an existing mental model and is more legible to reviewers
- JWT implemented at the start, not the end
- Two residents instead of one — allows switching during demo, shows the API is properly parameterized
- Select dropdown on the login screen instead of a text input — eliminates typos, faster to demo
- Mutable in-memory state over static mock data — redemptions persist within a session, balance updates survive page interactions
- Accessibility treated as a dedicated prompt and pass, not an afterthought
- Separate documentation files for Claude and Cursor — reflects the actual distinct roles each tool played
- Three-phase audit ran before submission — runtime test, security audit, and senior engineer code review — catching two bugs in RedeemModal including a React 18 automatic batching issue where the success state was double-deducting points from an already updated balance
