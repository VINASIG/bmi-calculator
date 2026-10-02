# BMI implementation and verification

Review date: 3 October 2026. This is the initial product implementation. The English and Vietnamese tools share exact arithmetic and accessible components while retaining separate medical and legal interpretations.

## Scope and source decisions

The root route checks the Vietnamese military recruitment BMI criterion from 18.0 through 29.9, including equality, using the signed Circular 68/2025/TT-BQP and Government transcription. The English /en/ route uses CDC adult categories for age 20 and older and excludes pregnancy. Source access, current legal searches and the limits of the review are recorded in [RESEARCH](../RESEARCH.md).

The product requires two direct decimal inputs. It includes no sliders, identity fields, accounts, measurements in URLs, saved results or remote calculation service. Script failure leaves Calculate disabled and gives the fields no serialization names. Clear, edits, reload, tool navigation and browser history remove stale measurements or results. Tests use synthetic measurements.

The pinned VINASIG standards import, design system, byte-preserved artwork, local Space Grotesk and Lucide are recorded in [STANDARDS](../STANDARDS.md), [BRAND](../BRAND.md) and the asset manifest. Unrelated sibling repositories were checked and preserved.

## Defects found and corrected

| Route and state                                 | Observation                                                  | Cause and correction                                                                                                                                   | Evidence                                                                                                                               |
| ----------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Both routes, initial load, five standard sizes  | The height field took focus automatically.                   | The initialization reset reused the user-initiated Clear focus handler. Initialize empty values directly; reserve focus for errors, results and Clear. | Initial dev screenshots in output/responsive/before-nvqs- and before-adult-, privacy/accessibility regression assertions.              |
| Vietnamese route, 390x844, dark, BMI above 29.9 | Warning text had 1.78:1 contrast against the result surface. | A light-theme warning alias remained dark in the dark theme. Reuse the existing Thinker Orange light shade for dark warning text.                      | before-/after-military-390x844-chromium-dark-warning-probe.png and output/research/dark-warning-before.json / dark-warning-after.json. |

Near-boundary display and long values were designed with exact comparison and responsive wrapping from the start. For example, 119.601 kg at 200 cm is above the recruitment limit and displays 29,9003 rather than an ambiguous 29,90. Both the equality cases and adjacent decimal values have regressions.

The first browser runs also exposed test harness assumptions: a source link inside a closed disclosure must be opened before a role query can find it; structured script data must be read as DOM text and parsed, not rendered text. Those tests now assert the visible exact source URL and the structured-data fields. No product source, medical boundary or metadata assertion was removed.

Windows WebKit's observed native Tab path goes to text fields, including with Alt+Tab. That path is asserted, and skip-link Enter activation is tested separately from DOM focus on that port. Other engines and Linux WebKit retain the native Tab-to-skip-link assertion. This does not establish Tab reachability of links in Windows WebKit. The [test guide](../../tests/README.md) records the source explanation and evidence.

## Checks and evidence

Local source, arithmetic, build and accessibility checks ran against the production build. Immutable before captures and failures are retained; the Astro development toolbar in the first dev captures is absent from production captures. Generated evidence stays under ignored output/, rather than adding binary screenshots and traces to Git.

| Check                                                                              | Observed result                                                                      | Evidence                                                                    |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Astro strictest types, typed ESLint, Stylelint, formatting and standards integrity | PASS; zero source warnings; 37 managed payloads verified                             | output/research/check-corrected.log and output/checks/standards.json        |
| Pure arithmetic and localized validation                                           | PASS; 38 tests, no failures or skips                                                 | output/research/unit-current.log                                            |
| Static build and generated HTML/metadata/asset checks                              | PASS; two routes, eight preserved assets and Lucide notice                           | output/research/build-current.log and output/checks/built.json              |
| Final local browser matrix                                                         | PASS; 178 tests on Chromium and WebKit, no failures, skips, retries or flaky results | output/research/browser-after.log and output/playwright/report.json         |
| Local Firefox launch                                                               | NOT_RUN; the installed executable returned spawn UNKNOWN                             | output/research/firefox-local.json; CI is required to run all three engines |
| Dependency audit                                                                   | PASS; zero reported vulnerabilities in the locked graph                              | output/research/npm-audit.json                                              |

Each route uses 320x800, 360x800, 390x844, 440x800, 600x800, 759x1024, 760x1024, 761x1024, 768x1024, 900x800, 1023x768, 1024x768, 1439x900 and 1440x900, at 100% and 200% root text. The five viewport states are idle, errors, success, precise boundary with all disclosures open, and long numerical output. The separate flows cover every category, input recovery, themes, reduced motion/reversal, keyboard/touch, Clear/edits/reload/history, no-script guards, offline calculations, sources, canonical/schema and application storage/network privacy. Axe also checks all result bands and empty-input errors in both themes.

Full-page production screenshots were opened for both routes at the five standard viewports. Further opened captures cover 320 px text enlargement, breakpoint neighbors, expanded notes, precise results, themes, no-script failure and motion start/end. Additional 320x800 viewport captures make the 200% text states readable without resizing a very tall full-page image. Bounding boxes and computed styles supplement these observations; automated geometry checks do not mean every captured image was manually reviewed.

### Lab performance

Twelve initial prototype navigations and twelve final navigations were measured with Lighthouse: each route has three mobile and three desktop cold-load runs. Final median budgets of LCP <=2500 ms, CLS <=0.1 and TBT <=200 ms passed.

| Route                   | Mobile median LCP | Desktop median LCP | Median CLS | Median TBT |
| ----------------------- | ----------------- | ------------------ | ---------- | ---------- |
| Vietnamese military BMI | 1505.52 ms        | 342.98 ms          | 0          | 0 ms       |
| English adult BMI       | 1505.66 ms        | 343.04 ms          | 0          | 0 ms       |

Each final local run reported Lighthouse performance, accessibility, best-practices and SEO scores of 100. These are lab navigation observations. They do not measure field INP or establish search ranking, medical validity or complete accessibility. Before/after differences at this scale are normal run variance; the color correction is not claimed as a speed improvement. Raw reports, range values and environment details are under output/lighthouse/before/ and output/lighthouse/after/.

Exact-commit CI, publication and live verification are separate post-commit steps. They are NOT_RUN in this pre-publication source record. Their final receipts belong under output/publication/ and the corresponding GitHub Actions run; a source commit cannot truthfully include its own future successful deployment evidence. Both Windows and Linux CI must run all three browser engines before Pages deployment.

## Limits

Physical devices, screen readers, clinical measurement validation, professional medical/legal review, field INP, fresh Codex skill discovery and an independent SI-agent usability trial are NOT_RUN. Automated axe checks are not a complete accessibility certification. Browser emulation and lab performance do not establish every device's behavior, field speed, search visibility or overall recruitment eligibility.

Local Windows WebKit captures paint lighter text strokes than Chromium. The loaded Space Grotesk face, requested CSS weights and weight-dependent canvas metrics were inspected; an explicit font-axis diagnostic did not change that painting. No identity asset or font was replaced to hide a renderer difference. Actual Safari typography on a physical device remains NOT_RUN, and no cross-engine pixel-equivalence claim is made.
