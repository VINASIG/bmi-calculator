# VINASIG Adult BMI

Read README.md, docs/PRODUCT.md, docs/RESEARCH.md, docs/BRAND.md and docs/TOOLCHAIN.md before changing this Astro and TypeScript product.

- This repository contains only adult CDC BMI screening for ages 20+. Root Vietnamese and /en/ are actual translations with reciprocal hreflang. Link to the other independent repository at the bottom; never embed it or add mode/profile branches.
- Direct numeric text inputs, local computation, no accounts, sliders, DOB, analytics, health storage or remote calculation APIs. Never serialize measurements into URLs. Recalculate automatically as valid measurements change. Invalid/incomplete input, Clear and navigation must clear stale results. Keep focus and scroll at the input, defer errors until blur or explicit Enter, and do not calculate unfinished IME composition. Inputs remain disabled until their handlers load. Do not restore a calculate button.
- Verify medical/legal changes using current primary sources and dated research. Compare exact decimal BMI before rounding. Do not recommend changing weight to alter recruitment status. Health reference targets stay inside BMI 18.5–24.9; do not suggest height growth or diagnose individuals.
- Keep adult health categories separate from military recruitment criteria. Share only pure arithmetic with the military repository; keep UI, copy, conclusions and tests independent.
- Write the main BMI result and health guidance in ordinary language. Show the reference weight range, one clear lighter/heavier comparison and practical general advice. Put rounding, additional precision and comparisons with both range ends in closed disclosures. Do not repeat boundary jargon in the main result. Preserve exact categories, adult scope and health safeguards. Test the healthy category immediately below BMI 25 even when the displayed BMI rounds to 25.0.
- Keep measurement errors immediately below their own input and referenced by aria-describedby. Clear all must remain visibly recognizable as a button, with a contrasting outline, a decorative Lucide icon and a specific localized label. Test recovery, reset from a focused invalid field and zero stale errors after reset in both themes and at enlarged text sizes.
- For scroll invariance regressions, let native focus scrolling finish before recording the baseline. Exercise repeated edits with the keyboard on the already focused input. Preserve exact position assertions and inspect failure traces before changing implementation or test setup.
- Adopt Bright Playful Minimalism, preserved VINASIG exports, local Space Grotesk and Lucide. Technical documentation and commits are English; product text is Vietnamese/English. Respond in Vietnamese. Use SI agents in VINASIG-authored prose.
- Run npm run check, npm test, npm run build, Playwright and performance checks. Inspect screenshots at all standard sizes, 320 px, breakpoint neighbors, intermediate widths and enlarged text. Check both locales, invalid input, result bands, keyboard, touch, dark/reduced motion, offline and script failure. Preserve assets, notices and all quality gates.
- Keep immutable before captures and reports in ignored output/; record durable audits in docs/audits/. Before authorized publication inspect the staged diff, then verify remote HEAD, exact-commit CI, deployment and live pages. Preserve unrelated work and sibling repositories.
- Report real devices, screen readers, field metrics and independent SI-agent trials as NOT_RUN unless observed.

## Canonical domain

The owner authorized the custom-domain migration on 4 October 2026. Publish this site at https://bmi.vinasig.io.vn/ with an origin-root base. Preserve that domain in canonical/social metadata, sitemap, robots, package homepage, preview and browser assertions. Keep GitHub repository/source links intact. Read docs/DOMAIN.md. GitHub Actions deploys through the repository Pages custom-domain setting; a CNAME file alone does not configure an Actions deployment.

## Language and appearance

Read `docs/LOCALIZATION.md`. Both locales must include navigation, accessible names, validation, loading and result copy. Keep native reciprocal language links and locale metadata. Preserve technical identifiers, code and user content. Only the optional light or dark preference uses `vinasig-theme` storage. Never save or send measurements, files or generator content. Verify both locales and themes before publishing.
## Shared header and footer

Read docs/SITE_CHROME.md before header or footer changes. Keep shared chrome consistent and run npm run test:chrome.

<!-- VINASIG STANDARDS BEGIN -->
## VINASIG SI agent standards 0.1.0

Read `.vinasig/standards/policies/core.md` and `language.md` before repository work. Respect platform instructions, current user authorization and local project guidance. Preserve unrelated changes. Never invent verification or weaken a quality gate to pass.

Active profile is `web-typescript`. Read `.vinasig/standards/profiles/web-typescript.md` and the task-relevant policies. Core is valid for CLI and documentation projects and installs no browser dependencies.

Use `$vinasig-workflow` for implementation work and `$vinasig-dependencies` when adding or upgrading dependencies. Report PASS, FAIL, NOT_RUN or NOT_APPLICABLE with evidence and reasons. Commit, push and publish only within the task authorization.

For license selection, imported material or distribution changes read `policies/licensing.md` and `LICENSES.md` inside the snapshot. LIC-001 through LIC-004 require purpose-based selection, authority and dependency review, separate documentation/font/data/brand rights, consistent SPDX metadata and delivery evidence. Importing this standard does not relicense the host project.

For UI changes read `policies/web.md` inside the snapshot. Apply LANG-004/LANG-005 to all visible copy and locales. WEB-001 requires original transparent header logos matched to the actual surface, without a padded or rounded logo card, linking to https://vinasig.io.vn/. Run inspectHeaderBrand and exercise the logo link on local and deployed pages. WEB-008 requires a full control inventory and styled initial/open/scrolled states, including popup scrollbars, checkbox/radio, search clear, range/progress parts and disclosure indicators. Use the reviewed control-surfaces CSS, preserve native form/keyboard/touch behavior and test forced colors. Run inspectControlSurfaces and inspectControlIndicators with nonzero expected counts. Ordinary dropdown indicators need a measured 16 px inner trailing inset, a 12 px value gap and their declared SVG size. Open before/after and deployed screenshots. Use `$vinasig-responsive` for layout/accessibility, `$vinasig-motion` for movement, `$vinasig-search` for SEO/AEO/GEO, `$vinasig-performance` for speed, and `$vinasig-agent-readiness` for browser-agent tasks. Space Grotesk, Lucide and Simple Icons follow their separate roles.

The local manifest pins the approved snapshot. A Markdown path is a reading instruction, not an automatic import. Stop and report unresolved conflicts with mandatory policy. Record approved exceptions with owner, reason and review date.
<!-- VINASIG STANDARDS END -->
