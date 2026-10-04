# Automatic adult BMI calculation

Date: 4 October 2026. Scope: Vietnamese `/` and English `/en/`.

## Reproduction and implementation

The previous production build required a calculation button after entering valid height and weight. Chromium baseline captures cover both languages and themes at 390x844 and 1440x900. Immutable full-page and workspace screenshots are in `output/responsive/automatic-input-2026-10-04/before`. The shared task manifest is `../qr-generator/output/automatic-input-before.json`.

Valid input now immediately updates BMI, category and reference guidance. Empty or invalid input immediately clears every old result. There is no visible calculation button. Automatic updates retain input focus and do not scroll to the result. Errors appear after blur or explicit Enter validation. IME composition waits until composition ends. Exact arithmetic, categories, rounding and health reference/advice are unchanged.

Measurement fields and Clear start disabled until handlers are installed. A hidden, initially disabled submit control retains the native Enter path without disabling the HTML validation rule. Reload, history restoration, locale navigation and Clear still remove measurements. No input storage, remote calculation or measurement requests are introduced.

Verification found a Clear interaction problem during development: blur validation inserted an error before the pointer click completed, moving the button. The handler now recognizes Clear intent before reflow, including browsers that do not focus a button on pointer activation. This was reproduced by the full privacy flow and covered by new empty/invalid Clear regressions in all three engines.

## Regression coverage

`tests/browser/automatic-input.spec.ts` checks automatic calculation, focus/scroll, incomplete data, invalidation/recovery, Clear during incomplete or invalid input, IME, decimal commas and Enter without navigation. Existing helpers no longer submit to produce a result. Category, exact boundary, advice, privacy, keyboard, accessibility and geometry assertions remain enabled.

Both routes run in Chromium, Firefox and WebKit. The new flow has both themes at 360x800, 390x844, 768x1024, 1024x768 and 1440x900, plus 320x800 with 200% text. Existing coverage retains all 14 widths, 100%/200% text and the 759/760/761 breakpoint checks.

The synthetic IME regression sets the field value and dispatches an `InputEvent` with `isComposing` between composition start and end. Mixing synthetic start with Firefox `fill()` ended the simulated session through a complete native composition sequence. The corrected setup retains the hidden-result and exact-value assertions. All six locale/engine cases passed their focused rerun. The shared event diagnostic is in `../qr-generator/output/automatic-input-composition-diagnostic.log`.

## Verification evidence

`npm run check` passed TypeScript/Astro, ESLint, Stylelint, formatting, standards integrity and licensing. `npm test` passed 30/30. `npm run build` passed both language pages, HTML validation, metadata and preserved asset checks. The complete `npm run test:browser` run passed 420/420 across Chromium, Firefox and WebKit, including 84 new automatic-input cases. The final report has zero skipped, unexpected or flaky tests. Logs are under `output/automatic-input-*.log`, with browser results in `output/playwright/report.json`.

Full-page captures and focused input/result viewport captures were opened at all five required sizes and 320x800 with 200% text. The inspected selection covers both languages/themes and WebKit mobile. Results and reference guidance appear without a button, the typing focus remains in the field, and validation/recovery fit the mobile layout. Before captures remain separate. Images are in `output/responsive/automatic-input-2026-10-04/before` and `after`. The shared focused visual manifest is `../qr-generator/output/automatic-input-visual-workspaces.json`.

`npm run test:performance` passed 12 cold Lighthouse runs, with three runs per language and form factor. Median mobile LCP was 1504 ms in both languages. Desktop medians were 363 ms in Vietnamese and 362 ms in English. Median CLS and TBT were zero in every group. The unchanged budgets are LCP <=2500 ms, CLS <=0.1 and TBT <=200 ms. Reports are in `output/lighthouse/after/vi/summary.json` and `output/lighthouse/after/en/summary.json`.

Real devices, screen readers and field performance are NOT_RUN. Local browser emulation does not establish those outcomes.
