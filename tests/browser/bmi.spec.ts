import assert from 'node:assert/strict';
import { test, expect } from '@playwright/test';
import type { Page, BrowserContext } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, access, writeFile } from 'node:fs/promises';
import { startServer } from '../../scripts/serve.ts';
import { copy } from '../../src/lib/copy.ts';
import type { Profile } from '../../src/lib/bmi.ts';

const phase = process.env['CAPTURE_PHASE'] === 'before' ? 'before' : 'after';
const app = await startServer();
test.afterAll(async () => {
  await app.close();
});
const sizes = [
  [320, 800],
  [360, 800],
  [390, 844],
  [440, 800],
  [600, 800],
  [759, 1024],
  [760, 1024],
  [761, 1024],
  [768, 1024],
  [900, 800],
  [1023, 768],
  [1024, 768],
  [1439, 900],
  [1440, 900],
] as const;
const url = (profile: Profile) => app.url + (profile === 'adult' ? 'en/' : '');

async function open(page: Page, profile: Profile) {
  await page.goto(url(profile));
  await expect(
    page.getByRole('button', { name: copy[profile].calculate, exact: true }),
  ).toBeEnabled();
  await expect(page.locator('html')).toHaveAttribute(
    'lang',
    copy[profile].lang,
  );
}
async function input(
  page: Page,
  profile: Profile,
  height: string,
  weight: string,
) {
  await page
    .getByRole('textbox', { name: copy[profile].height, exact: true })
    .fill(height);
  await page
    .getByRole('textbox', { name: copy[profile].weight, exact: true })
    .fill(weight);
  await page
    .getByRole('button', { name: copy[profile].calculate, exact: true })
    .click();
}
async function capture(
  page: Page,
  name: string,
  scriptEnabled = true,
  scroll = true,
) {
  await mkdir('output/responsive', { recursive: true });
  if (scriptEnabled) {
    await page.evaluate(async (shouldScroll) => {
      await document.fonts.ready;
      if (shouldScroll) {
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              resolve();
            }),
          ),
        );
        window.scrollTo(0, 0);
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              resolve();
            }),
          ),
        );
      }
    }, scroll);
    const bounds = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
      controls: [
        ...document.querySelectorAll<HTMLElement>(
          'input,button,nav,summary,.workspace,#bmi-value',
        ),
      ]
        .filter((e) => e.getBoundingClientRect().width > 0)
        .map((e) => {
          const r = e.getBoundingClientRect();
          return {
            tag: e.tagName,
            id: e.id,
            left: r.left,
            right: r.right,
            width: r.width,
            height: r.height,
          };
        }),
    }));
    expect(bounds.scroll, JSON.stringify(bounds)).toBeLessThanOrEqual(
      bounds.width + 1,
    );
    expect(bounds.body, JSON.stringify(bounds)).toBeLessThanOrEqual(
      bounds.width + 1,
    );
    for (const control of bounds.controls) {
      expect(control.left).toBeGreaterThanOrEqual(-1);
      expect(control.right).toBeLessThanOrEqual(bounds.width + 1);
    }
    await mkdir('output/checks', { recursive: true });
    await writeFile(
      'output/checks/' + phase + '-' + name + '.json',
      JSON.stringify(bounds) + '\n',
    );
  } else {
    await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
    await expect(page.getByRole('contentinfo')).toBeInViewport();
    await page.getByRole('heading', { level: 1 }).scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
  }
  const filename = 'output/responsive/' + phase + '-' + name + '.png';
  if (phase === 'before') {
    let exists = false;
    try {
      await access(filename);
      exists = true;
    } catch {
      /* New baseline filename. */
    }
    assert(!exists, 'Never overwrite a before screenshot');
  }
  await page.screenshot({ path: filename, fullPage: true });
}
async function axe(page: Page) {
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
}
async function privateContext(context: BrowserContext, page: Page) {
  expect(await context.cookies()).toEqual([]);
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
}

for (const profile of ['military', 'adult'] as const) {
  const c = copy[profile];
  for (const [width, height] of sizes)
    for (const text of [100, 200]) {
      test(`responsive ${profile} ${String(width)}x${String(height)} text ${String(text)}`, async ({
        page,
      }, info) => {
        await page.setViewportSize({ width, height });
        await open(page, profile);
        await page.evaluate((scale) => {
          document.documentElement.style.fontSize =
            String((16 * scale) / 100) + 'px';
        }, text);
        const name = `${profile}-${String(width)}x${String(height)}-${info.project.name}-text-${String(text)}`;
        await capture(page, name + '-idle');
        await page
          .getByRole('button', { name: c.calculate, exact: true })
          .click();
        await expect(page.locator('#height')).toBeFocused();
        await expect(page.locator('#height-error')).toBeVisible();
        await expect(page.locator('#weight-error')).toBeVisible();
        await capture(page, name + '-error');
        await input(page, profile, '170', '65,5');
        await expect(page.locator('#bmi-value')).toHaveText(
          profile === 'military' ? '22,66' : '22.66',
        );
        await expect(page.locator('#result-heading')).toBeFocused();
        await capture(page, name + '-success');
        for (const summary of await page.locator('summary').all())
          await summary.click();
        await input(page, profile, '200', '119.601');
        await expect(page.locator('#bmi-value')).toHaveText(
          profile === 'military' ? '29,9003' : '29.90',
        );
        await capture(page, name + '-boundary-notes-open');
        await input(page, profile, '50', '1000');
        await expect(page.locator('#bmi-value')).toHaveText(
          profile === 'military' ? '4000,00' : '4000.00',
        );
        await capture(page, name + '-long-result');
      });
    }
  for (const [width, height] of [
    [390, 844],
    [1440, 900],
  ] as const)
    for (const theme of ['light', 'dark'] as const)
      for (const reduced of ['no-preference', 'reduce'] as const) {
        test(`privacy accessibility ${profile} ${String(width)} ${theme} ${reduced}`, async ({
          browser,
        }, info) => {
          const context = await browser.newContext({
            viewport: { width, height },
            colorScheme: theme,
            reducedMotion: reduced,
          });
          try {
            const page = await context.newPage();
            const requests: { url: string; method: string }[] = [];
            const errors: string[] = [];
            page.on('request', (request) => {
              requests.push({ url: request.url(), method: request.method() });
            });
            page.on('pageerror', (error) => {
              errors.push(error.message);
            });
            await open(page, profile);
            await expect(page.locator('input')).toHaveCount(2);
            await expect(page.locator('input[type=range]')).toHaveCount(0);
            await expect(page.locator('#height')).not.toBeFocused();
            await axe(page);
            await page
              .getByRole('button', { name: c.calculate, exact: true })
              .click();
            await expect(page.locator('#height-error')).toBeVisible();
            await axe(page);
            await input(page, profile, '170.125', '65.875');
            for (const summary of await page.locator('summary').all())
              await summary.click();
            await axe(page);
            const bandWeights =
              profile === 'military'
                ? ['71.999', '72', '119.6', '119.601']
                : ['73.999', '74', '100', '120', '140', '160'];
            for (const bandWeight of bandWeights) {
              await input(page, profile, '200', bandWeight);
              await axe(page);
            }
            await input(page, profile, '170.125', '65.875');
            await capture(
              page,
              `${profile}-${String(width)}x${String(height)}-${info.project.name}-${theme}-${reduced}-result`,
            );
            const css = await page
              .locator('#height')
              .evaluate((e) => getComputedStyle(e).fontFamily);
            expect(css).toContain('Space Grotesk');
            expect(
              await page
                .locator('.brand img')
                .evaluate((e) => (e as HTMLImageElement).naturalWidth),
            ).toBeGreaterThan(0);
            await privateContext(context, page);
            expect(errors).toEqual([]);
            expect(
              requests.every(
                (r) =>
                  r.method === 'GET' &&
                  new URL(r.url).origin === new URL(app.url).origin,
              ),
            ).toBe(true);
            expect(
              requests.some(
                (r) => r.url.includes('65.875') || r.url.includes('170.125'),
              ),
            ).toBe(false);
            await page.locator('#weight').fill('66');
            await expect(page.locator('#result')).toBeHidden();
            await expect(page.locator('#bmi-value')).toBeEmpty();
            await page
              .getByRole('button', { name: c.clear, exact: true })
              .click();
            await expect(page.locator('#height')).toHaveValue('');
            await expect(page.locator('#weight')).toHaveValue('');
            await expect(page.locator('#height')).toBeFocused();
            await expect(page.locator('#empty-result')).toBeVisible();
            await input(page, profile, '200', '72');
            await expect(page.locator('#category')).toHaveText(
              profile === 'military'
                ? 'BMI trong ngưỡng tuyển quân'
                : 'Underweight',
            );
          } finally {
            await context.close();
          }
        });
      }
  test(`exact category boundaries ${profile}`, async ({ page }) => {
    await open(page, profile);
    const rows =
      profile === 'military'
        ? [
            ['71.999', 'BMI dưới ngưỡng tuyển quân'],
            ['72', 'BMI trong ngưỡng tuyển quân'],
            ['119.599', 'BMI trong ngưỡng tuyển quân'],
            ['119.6', 'BMI trong ngưỡng tuyển quân'],
            ['119.601', 'BMI trên ngưỡng tuyển quân'],
          ]
        : [
            ['73.999', 'Underweight'],
            ['74', 'Healthy weight'],
            ['99.999', 'Healthy weight'],
            ['100', 'Overweight'],
            ['119.999', 'Overweight'],
            ['120', 'Obesity, class 1'],
            ['139.999', 'Obesity, class 1'],
            ['140', 'Obesity, class 2'],
            ['159.999', 'Obesity, class 2'],
            ['160', 'Obesity, class 3'],
          ];
    for (const [weight, label] of rows) {
      assert(weight && label);
      await input(page, profile, '200', weight);
      await expect(page.locator('#category')).toHaveText(label);
    }
  });
  test(`invalid inputs and recovery ${profile}`, async ({ page }) => {
    await open(page, profile);
    for (const [h, w] of [
      ['0', '65'],
      ['1.70', '65'],
      ['170cm', '65'],
      ['170', '-65'],
      ['170', '1e2'],
      ['170', '65.1234'],
      ['170', '1000.001'],
    ]) {
      assert(h && w);
      await input(page, profile, h, w);
      await expect(page.locator('#result')).toBeHidden();
      await expect(page.locator('[aria-invalid=true]')).toHaveCount(1);
    }
    await input(page, profile, '170', '65');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('[aria-invalid=true]')).toHaveCount(0);
  });
  test(`keyboard touch and disclosure ${profile}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
    });
    try {
      const page = await context.newPage();
      await open(page, profile);
      const skip = page.getByRole('link', { name: c.skip });
      await page.keyboard.press('Tab');
      if (process.platform === 'win32' && info.project.name === 'webkit') {
        // The Windows WebKit port tabs to text fields by default, including
        // with Alt+Tab. Verify that native path, then separately check skip-link
        // activation from DOM focus. Do not claim Tab reaches links in this port.
        await expect(page.locator('#height')).toBeFocused();
        await skip.focus();
      }
      await expect(skip).toBeFocused();
      await page.keyboard.press('Enter');
      await page.keyboard.press('Tab');
      await expect(page.locator('#height')).toBeFocused();
      await page.keyboard.type('170');
      await page.keyboard.press('Tab');
      await page.keyboard.type('65');
      await page.keyboard.press('Enter');
      await expect(page.locator('#bmi-value')).toHaveText(
        profile === 'military' ? '22,49' : '22.49',
      );
      await page.locator('summary').first().tap();
      await expect(page.locator('details').first()).toHaveAttribute('open', '');
      await capture(page, `${profile}-390x844-${info.project.name}-touch`);
      await page.getByRole('button', { name: c.clear, exact: true }).tap();
      await expect(page.locator('#height')).toHaveValue('');
    } finally {
      await context.close();
    }
  });
  for (const mode of ['disabled', 'blocked'] as const)
    test(`no script privacy ${profile} ${mode}`, async ({ browser }, info) => {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        javaScriptEnabled: mode !== 'disabled',
      });
      try {
        const page = await context.newPage();
        const requests: string[] = [];
        page.on('request', (r) => {
          requests.push(r.url());
        });
        if (mode === 'blocked') await page.route('**/*.js', (r) => r.abort());
        await page.goto(url(profile));
        await expect(
          page.getByRole('button', { name: c.calculate, exact: true }),
        ).toBeDisabled();
        await page.locator('#height').fill('177.777');
        await page.locator('#weight').fill('77.777');
        for (const key of ['height', 'weight'])
          await expect(page.locator('#' + key)).not.toHaveAttribute(
            'name',
            /.+/,
          );
        await page
          .getByRole('button', { name: c.calculate, exact: true })
          .click({ force: true });
        await page.locator('#weight').press('Enter');
        await capture(
          page,
          `${profile}-390x844-${info.project.name}-script-${mode}`,
          false,
        );
        expect(page.url()).toBe(url(profile));
        expect(
          requests.some((r) => r.includes('177.777') || r.includes('77.777')),
        ).toBe(false);
        await expect(page.locator('#result')).toBeHidden();
      } finally {
        await context.close();
      }
    });
  test(`offline calculation after load ${profile}`, async ({
    page,
    context,
  }) => {
    await open(page, profile);
    await context.setOffline(true);
    await input(page, profile, '170', '65');
    await expect(page.locator('#bmi-value')).toHaveText(
      profile === 'military' ? '22,49' : '22.49',
    );
  });
  test(`metadata and sources ${profile}`, async ({ page }) => {
    await open(page, profile);
    expect(await page.title()).toBe(c.title + ' | VINASIG');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
      'href',
      'https://vinasig.github.io/bmi-calculator/' +
        (profile === 'adult' ? 'en/' : ''),
    );
    await expect(page.locator('nav a[aria-current=page]')).toHaveCount(1);
    await expect(page.locator('link[hreflang]')).toHaveCount(0);
    await page.locator('summary').first().click();
    await expect(
      page.getByRole('link', { name: c.sourceName, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: c.sourceName, exact: true }),
    ).toHaveAttribute('href', c.source);
    const structuredData: unknown = JSON.parse(
      await page
        .locator('script[type="application/ld+json"]')
        .evaluate((node) => node.textContent),
    );
    expect(structuredData).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: c.title,
      inLanguage: c.lang,
      url:
        'https://vinasig.github.io/bmi-calculator/' +
        (profile === 'adult' ? 'en/' : ''),
      publisher: { '@type': 'Organization', name: 'VINASIG' },
    });
  });
}

test('switching tools and reload do not carry measurements or stale interpretation', async ({
  page,
}) => {
  await open(page, 'military');
  await input(page, 'military', '200', '72');
  await page.getByRole('link', { name: 'Adult BMI', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('#height')).toHaveValue('');
  await expect(page.locator('#result')).toBeHidden();
  await input(page, 'adult', '200', '72');
  await expect(page.locator('#category')).toHaveText('Underweight');
  await page.reload();
  await expect(page.locator('#height')).toHaveValue('');
  await expect(page.locator('#result')).toBeHidden();
  await page.getByRole('link', { name: 'BMI NVQS', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  await expect(page.locator('#height')).toHaveValue('');
  await page.goBack();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('#height')).toHaveValue('');
  await expect(page.locator('#weight')).toHaveValue('');
  await expect(page.locator('#result')).toBeHidden();
});
for (const reduced of ['no-preference', 'reduce'] as const)
  test(`motion reversal ${reduced}`, async ({ page }, info) => {
    await page.emulateMedia({ reducedMotion: reduced });
    await open(page, 'military');
    const button = page.getByRole('button', {
      name: copy.military.calculate,
      exact: true,
    });
    await button.hover();
    const css = await button.evaluate((e) => ({
      duration: getComputedStyle(e).transitionDuration,
      transform: getComputedStyle(e).transform,
    }));
    if (reduced === 'reduce') {
      expect(css.duration).toBe('0s');
      expect(css.transform).toBe('none');
    } else expect(css.duration).toContain('0.16s');
    await capture(
      page,
      `motion-${info.project.name}-${reduced}-start`,
      true,
      false,
    );
    await page.mouse.move(0, 0);
    await capture(
      page,
      `motion-${info.project.name}-${reduced}-reverse`,
      true,
      false,
    );
    await expect
      .poll(() => button.evaluate((e) => getComputedStyle(e).transform))
      .toBe('none');
    await capture(
      page,
      `motion-${info.project.name}-${reduced}-end`,
      true,
      false,
    );
  });
