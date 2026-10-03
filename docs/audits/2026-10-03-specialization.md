# Adult BMI specialization verification

Date: **3 October 2026**. Scope: the independent adult tool in `VINASIG/bmi-calculator`. This audit records local checks before publication; exact-commit CI and live deployment are subsequent publication checks.

## Product changes

- Replaced the combined calculator with `AdultCalculator.astro`, adult-only copy, client code and category tests. Vietnamese `/` and English `/en/` are translations of this one product. There is no mode switch or embedded military calculator.
- Added a BMI 18.5–24.9 reference weight range, inward rounding to 0.1 kg, distances to both boundaries and general health guidance. Categories use exact decimal arithmetic before the prominent one-decimal display. Unusual measurements and adult/pregnancy limits are disclosed.
- Added bottom-of-page purpose guidance and an absolute link to the corresponding language of the independent military repository.
- Moved detailed guidance beneath the two primary panels after visual review showed unnecessary empty space beside a long result column. Existing tokens, artwork, local font and short CSS motion remain in use.
- Updated product/research documentation, metadata, generated-output checks and GitHub About information. No dependency was added or upgraded.

## Local checks

| Check                                                     | Result                                                             | Evidence                                       |
| --------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------- |
| Astro strictest typecheck                                 | PASS: 0 errors, warnings or hints                                  | `npm run check`                                |
| Strict typed ESLint, Stylelint, Prettier                  | PASS                                                               | `npm run check`                                |
| Managed standards integrity                               | PASS: 37 owned files and the pinned instruction block              | `output/checks/standards.json`                 |
| Unit tests                                                | PASS: 30/30                                                        | `tests/adult.test.ts`, `tests/math.test.ts`    |
| Build, generated HTML, metadata, preserved assets/notices | PASS                                                               | `npm run build`, `output/checks/`              |
| Chromium and WebKit product/browser tests                 | PASS: 174/174; 0 skipped, unexpected or flaky                      | `output/playwright/report.json`                |
| Local Firefox product suite                               | NOT_RUN: the installed engine fails to launch with `spawn UNKNOWN` | `output/checks/local-firefox.json`             |
| Lighthouse budgets, both languages                        | PASS: 3 mobile and 3 desktop runs per language                     | `output/lighthouse/after/{vi,en}/summary.json` |

Mobile median LCP was **1,435 ms (vi)** and **1,438 ms (en)**; desktop **344 ms** in both languages. Median CLS and TBT were **0** in all four groups. Each navigation scored 100 for performance, accessibility, SEO and best practices in this local lab. Budgets remain LCP ≤2,500 ms, CLS ≤0.1 and TBT ≤200 ms. Simulated throttling and cold navigations are described in the JSON reports; these are not field measurements or a promise of ranking.

## Browser and visual review

Actual browser tests ran at 320×800, 360×800, 390×844, 440×800, 600×800, 759×1024, 760×1024, 761×1024, 768×1024, 900×800, 1023×768, 1024×768, 1439×900 and 1440×900, with 100% and 200% root text sizes and both languages. States cover idle, validation, successful calculation, exact category boundaries with disclosures open, and long/extreme results. Additional tests cover light/dark, reduced/full motion, keyboard/touch, axe checks across result bands, blocked/disabled scripts, offline calculation, Clear, edits, navigation/history, structured data, sources and cross-link destinations.

Before captures of the original combined product were opened at the five required viewports. Final required-viewport and intermediate-width contact sheets were opened, with detailed readable crops for mobile and desktop. These show the panels stacking at the existing 760 px breakpoint, input/label/result wrapping, guidance below the primary panels, readable expanded information and an accessible footer. No unintended horizontal overflow or overlap was observed in the reviewed images; DOM bounding-box and touch-size assertions separately passed across the automated matrix. Automated capture coverage is broader than individually opened image coverage.

Evidence is retained under ignored `output/responsive/specialization-2026-10-03/`: immutable `before/`, browser `after/` and diagnostic `inspection/` crops/contact sheets. Before images were never overwritten. The Windows WebKit native tab behavior is documented in `tests/README.md`; it does not establish a screen-reader session.

## Publication and limits

CI requires **Chromium, Firefox and WebKit on Ubuntu and Windows**; local engine selection cannot bypass that gate. Deployment depends on both verification jobs. Git attributes preserve the managed instruction block and payload bytes across operating systems rather than weakening the hash check. The brand/font manifest remains unchanged.

Real-device tests, screen-reader sessions, field Core Web Vitals, clinical validation and independent SI-agent trials are **NOT_RUN**. No accounts, tracking, measurement storage, query-string health data or remote calculation endpoints were introduced. A fresh page load still needs the static application assets.
