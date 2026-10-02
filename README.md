# VINASIG BMI Calculator

Two local BMI tools in one small static site.

- [Vietnamese military-service BMI](https://vinasig.github.io/bmi-calculator/) checks the BMI criterion for recruitment into Vietnam's military.
- [English adult BMI](https://vinasig.github.io/bmi-calculator/en/) applies CDC categories for adults aged 20 and older.

Type height in centimeters and weight in kilograms. No sliders, accounts, names, birth dates or sex fields. No analytics, application cookies, saved measurements or remote calculation service. Decimal points and commas are accepted. Calculations work offline after the initial page load.

## What the results mean

The Vietnamese result is limited to BMI. Under Article 1(1)(b) of Circular 68/2025/TT-BQP, amending Article 4(3)(c) of Circular 148/2018/TT-BQP, BMI below 18.0 or above 29.9 excludes recruitment under that criterion. Both boundary values are inside it. This does not determine a health grade, overall recruitment eligibility, exemption or deferment. Other examinations and the competent authorities still determine the outcome.

The English tool gives a screening category, not a diagnosis. It does not apply adult categories to children or teenagers aged 19 or younger, or during pregnancy. It cannot distinguish fat, muscle and bone. Neither tool gives a weight-change plan.

Primary references and the dated review are in [RESEARCH](docs/RESEARCH.md). Exact decimal arithmetic is compared to the thresholds before display rounding. Extra digits appear near a boundary when two decimals would misrepresent the comparison.

## Development

Use Node 24.21.0 and npm 12.2.0, as pinned in `.node-version` and `package.json`.

```sh
npx --yes npm@12.2.0 ci
npx --yes npm@12.2.0 run dev
npx --yes npm@12.2.0 run check
npx --yes npm@12.2.0 test
npx --yes npm@12.2.0 run build
npx --yes npm@12.2.0 exec playwright -- install chromium firefox webkit
npx --yes npm@12.2.0 run test:browser
npx --yes npm@12.2.0 run test:performance
```

Read the actual server URL from the log. The production preview selects an available port. Browser tests start and close their own server against `dist/`.

## Structure and publication

Astro renders `/bmi-calculator/` in Vietnamese and `/bmi-calculator/en/` in English. The shared calculator component, exact rational arithmetic and localized copy live under `src/`. These are different interpretations, not translated versions of one result. They intentionally have no reciprocal hreflang.

Windows and Linux CI check source, arithmetic, built HTML and Chromium/Firefox/WebKit flows. Linux also checks lab performance budgets on both pages. GitHub Pages deploys only after both verification jobs pass. Pull requests do not deploy. [Workflow results](https://github.com/VINASIG/bmi-calculator/actions) are evidence for individual revisions.

[PRODUCT](docs/PRODUCT.md), [BRAND](docs/BRAND.md), [STANDARDS](docs/STANDARDS.md), [TOOLCHAIN](docs/TOOLCHAIN.md) and [the test guide](tests/README.md) describe decisions and verification limits. Generated screenshots, traces, research captures and reports stay under ignored `output/`.

Public visibility is separate from licensing. Read [LICENSE_STATUS](LICENSE_STATUS.md). Space Grotesk and Lucide retain their notices. VINASIG artwork is preserved without a new license grant.
