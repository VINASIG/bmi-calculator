# VINASIG Adult BMI Calculator

[Adult BMI Calculator](https://vinasig.github.io/bmi-calculator/) is an independent, bilingual Astro tool that computes locally without collecting measurements.

Check adult CDC BMI categories, a reference weight range and general health guidance. For adults aged 20 and older; BMI is a screening measure.

The separate [nvqs-bmi-calculator](https://github.com/VINASIG/nvqs-bmi-calculator) serves the other purpose. Each website has a purpose guide and links to the matching language of the other tool.

## Run locally

Use Node 24.21.0 and npm 12.2.0 (pinned in the repository).

```sh
npm ci
npm run dev
```

Use the URL printed by Astro. Production preview uses an automatically allocated port:

```sh
npm run build
npm run preview
```

## Verification

```sh
npm run check
npm test
npm run build
npm run test:browser
npm run test:performance
```

CI verifies Ubuntu and Windows with Chromium, Firefox and WebKit, then deploys only after verification. Local browser engines can be selected with `BROWSER_ENGINES`; this option does not relax the all-engine CI gate. Performance checks cover both languages, three mobile and three desktop runs each. Preserve the existing quality budgets and asset hashes.

## Documentation

- [Product scope](docs/PRODUCT.md)
- [Dated primary-source research](docs/RESEARCH.md)
- [Brand adoption](docs/BRAND.md)
- [Toolchain](docs/TOOLCHAIN.md)
- [Verification coverage](tests/README.md)
- [Specialization verification](docs/audits/2026-10-03-specialization.md)

VINASIG SI agent guidance is in `AGENTS.md` and the pinned local standards snapshot. Public visibility does not grant a license; see `LICENSE_STATUS.md`.
