# Product scope

This repository contains **one independent tool**: Adult BMI Calculator. Vietnamese `/` and English `/en/` are translations of that same tool. There is no mode switch, shared UI or combined interpretation. The other tool lives in [VINASIG/nvqs-bmi-calculator](https://github.com/VINASIG/nvqs-bmi-calculator); the purpose block at the bottom links to its matching locale with an absolute deployed URL.

## Privacy and interaction

Direct text inputs accept centimeters/kilograms and up to three decimal places, with a point or comma. No sliders, accounts, date of birth, analytics, remote computation, input URL parameters or persistent health storage. Reload, locale navigation, history restoration and Clear remove measurements and stale results. Scripts must enable calculation only after loading; absent or blocked scripts cannot submit measurements. Static explanations, source links, navigation and disclosure controls remain available without JavaScript.

Entering valid height and weight immediately updates the result, category and reference guidance without a Calculate button. Empty or invalid input immediately clears the previous result. Updates preserve input focus and scroll position. Input errors appear after blur or explicit Enter validation. IME composition clears stale output and postpones calculation until composition ends. Measurement inputs and Clear start disabled until client handlers are installed. The exact calculation, category boundaries and safe reference weights remain unchanged.

## Specialized behavior

Adult screening categories use CDC thresholds for ages 20+: underweight below 18.5; healthy 18.5 to below 25; overweight 25 to below 30; obesity classes 1, 2 and 3 at 30, 35 and 40. Do not apply the adult categorization below age 20 or during pregnancy.

Show the entered-height weight reference corresponding to BMI 18.5-24.9 and a plain-language comparison for underweight/overweight readings. For 170 cm and 50 kg, show 53.5 - 71.9 kg and explain that the entered weight is about 3.5 kg below 53.5 kg. Keep comparisons with both ends and the inward-rounding explanation in a closed "How this weight range is calculated" disclosure. Keep additional BMI precision and the reason for rounding in a separate closed disclosure. Use exact category decisions, including the healthy category above the displayed reference end but below BMI 25. These are general references, not an individual prescribed target. Underweight guidance recommends professional assessment, regular nutritious meals and no further weight loss. Never import military rules, physique scoring or record comparison into this UI.

## Design and publication

Preserve the existing Space Grotesk, VINASIG assets, Lucide, semantic colors, light/dark surfaces, 760 px breakpoint and quiet reduced-motion-aware interactions. Native disclosure elements keep supplementary material accessible without crowding the first screen. Use the existing strict toolchain and multi-engine Playwright/axe regression coverage. Publish as an independent GitHub Pages project; no medical measurements go to GitHub.

## Explicit limits

No diagnosis, individualized medical plan, height-growth promises, weight targets below BMI 18.5, or advice to manipulate recruitment status. Health reference conversions stay inside BMI 18.5–24.9 and do not establish fitness. No guaranteed enlistment or exemption claims.
