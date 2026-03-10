# AI Workflow — Cursor (Claude Sonnet 4.6)

## Role in This Project

Cursor was used for all code generation. Every prompt was written in the Claude planning session first, then executed in Cursor. Cursor never made architectural decisions — it implemented specifications that were already fully designed. The prompts were written to be precise enough that outputs required minimal correction.

---

## Prompts Executed (in order)

1. **Project scaffolding** — monorepo init, both packages, folder structure, placeholder files, root `concurrently` script
2. **TypeScript types** — all interfaces and types for both server and frontend, `req.user` Express extension, server constants
3. **Mock data** — residents, transactions, gift cards, helper functions (`findById`, `deductPoints`, `addTransaction`, `generateTransactionId`)
4. **Server implementation** — middleware, routes, controllers, `index.ts` in dependency order
5. **Frontend components** — all seven components in dependency order
6. **Accessibility pass** — ARIA labels, semantic HTML, focus management, modal focus trap across all components
7. **Frontend data layer** — `api/client.ts`, `useResident` hook, `App.tsx`
8. **Layout fixes** — `max-w-6xl` container, grid breakpoint adjustment, `GiftCardItem` vertical stack fix
9. **README and AI documentation** (this prompt)

---

## What Was Accepted

Overall structure and implementation matched specifications closely across all prompts. The server implementation, type definitions, mock data, and component structure were accepted with minor review. The accessibility pass was thorough — semantic list markup, `role="dialog"`, `aria-modal`, focus trap via `useEffect` and `useRef`, Escape key handler, `aria-live` regions — and required minimal correction after generation.

---

## What Was Modified After Generation

- The Vite proxy config was generated in shorthand form (`'/api': 'http://localhost:3001'`) and did not include the `rewrite` function to strip the `/api` prefix. This was caught during review and fixed — without the rewrite, every API call would have forwarded `/api/auth/login` to the server instead of `/auth/login`, causing universal 404s.
- The `balanceAfter` value in the redeem controller was reviewed carefully to confirm points were deducted before the snapshot was taken. The order was correct but required deliberate verification given it was a post-mutation state read.
- The `GiftCardCatalog` header row was adjusted after generation — on mobile, the title and filter tabs were sharing a horizontal row in a way that felt cramped. Fixed with a single `flex-col` → responsive `sm:flex-row` change.
- The `GiftCardItem` card layout was rendering broken on large screens — cards were stretching with content clipping. Root cause was the parent container width, not the card itself. Fixed by widening `max-w-4xl` to `max-w-6xl` in App.tsx and adjusting grid breakpoints in `GiftCardCatalog`, rather than patching the card component in isolation.

---

## What Was Rejected

- Initial flat route structure (controllers collapsed into route handlers) — rejected, replaced with an explicit MVC prompt separating routes, controllers, and models
- JWT-last implementation order suggested during planning — overridden, JWT was implemented from the start
- `express-rate-limit` applied globally across all routes — rejected, scoped only to `POST /residents/:id/redeem`

---

## Verification Process

A 15-test curl script was generated and executed after the server implementation was complete to verify all routes, auth behavior, error codes, and redemption logic before any frontend work began. All 15 tests passed. The script covered happy paths, ownership enforcement (403 when token resident mismatches requested resource), insufficient points (422 with `required` and `current` fields), out-of-stock cards (400), invalid gift card IDs, and missing request fields. Having this baseline confirmed the backend was correct before layering the frontend on top.

The frontend was manually tested end-to-end across both residents at mobile, tablet, and desktop breakpoints after implementation. The redemption flow was tested through all modal states (confirming → loading → success and confirming → loading → error), and the balance update was verified to persist correctly in the UI after a successful redemption.
