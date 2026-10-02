# Verification guide

`npm test` checks pure exact-decimal arithmetic, input validation, all legal/medical boundaries, display precision and the intentional difference between interpretations. No server or personal data is needed.

After building, `npm run test:browser` starts a production server on an available local port and checks Chromium, Firefox and WebKit. `BROWSER_ENGINES=chromium,webkit` is an explicit local subset when an engine cannot launch. CI rejects subsets and runs all three on Windows and Linux. Retries are zero. A launch failure is NOT_RUN, not a passing engine.

Both routes use 320×800, 360×800, 390×844, 440×800, 600×800, 759×1024, 760×1024, 761×1024, 768×1024, 900×800, 1023×768, 1024×768, 1439×900 and 1440×900. Each viewport checks 100% and 200% root text with idle, missing-input error, result, expanded notes/boundary and long numerical result states. This is text enlargement, not every browser's page zoom.

Separate flows check exact boundaries, malformed/range inputs and recovery, two inputs with no sliders, light/dark, normal/reduced motion, font/logo loading, field focus, keyboard/touch, disclosures, Clear, edits, reload and navigation, offline use after load, metadata, no application cookies/storage/payload requests, and JavaScript disabled or the module blocked. Forced clicks are used only to probe disabled no-script guards. Normal user flows use semantic roles and labels.

Axe checks empty-input errors and every output band in both themes. Keyboard tests assert the native Tab path. In the Windows WebKit port, observed Tab and Alt+Tab both reach the first text field, so that path is asserted; skip-link Enter activation is checked separately after DOM focus. This does not claim keyboard Tab reachability of links in that port. Other engines and Linux WebKit must reach the skip link with native Tab. [WebKit's explanation of browser preferences](https://bugs.webkit.org/show_bug.cgi?id=199671) and [the Playwright maintainer's Mac-specific Alt+Tab advice](https://github.com/microsoft/playwright/issues/5609) explain why one shortcut cannot be assumed across ports. The local probe and initial failures remain in output/research/ and output/checks/.

Full-page captures scroll to the bottom and return to the top after paint frames. With JavaScript disabled, native locator scrolling checks the footer and heading. Before captures fail if their filename already exists. Set `CAPTURE_PHASE=before` for a first immutable baseline. Final captures use `after`. Open screenshots at both routes' standard sizes, narrow/enlarged text, breakpoint neighbors, themes, errors and precise results before accepting the UI. Geometry and axe assertions supplement that inspection.

`npm run check` uses Astro strictest TypeScript with declaration checking, typed strict ESLint, Stylelint on actual styles, Prettier and immutable standards integrity. `npm run build` also validates both generated HTML pages, canonical/sitemap/schema, no inappropriate hreflang, and asset/notice byte preservation.

`npm run test:performance` measures each route three times on mobile and three on desktop. LCP ≤2500 ms, CLS ≤0.1 and TBT ≤200 ms are median lab budgets. `--baseline` on each performance script preserves the initial complete prototype. Raw HTML/JSON and variance stay in `output/lighthouse/`. This does not measure field INP.

Physical phone input, screen readers, clinical measurements, field vitals, professional medical/legal review, fresh Codex discovery and independent SI-agent trials remain NOT_RUN unless actually observed.
