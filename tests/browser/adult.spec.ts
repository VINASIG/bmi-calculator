import assert from 'node:assert/strict';
import { test, expect } from '@playwright/test';
import { startServer } from '../../scripts/serve.ts';
import { copy, labels, medicalSource } from '../../src/lib/adult-copy.ts';
import {
  sizes,
  open,
  input,
  expand,
  capture,
  axe,
  privacy,
} from './support.ts';
const app = await startServer();
test.afterAll(async () => {
  await app.close();
});
for (const lang of ['vi', 'en'] as const) {
  const c = copy[lang];
  for (const [width, height] of sizes)
    for (const text of [100, 200])
      test(`responsive adult ${lang} ${String(width)}x${String(height)} text ${String(text)}`, async ({
        page,
      }, info) => {
        await page.setViewportSize({ width, height });
        await open(page, app.url, lang);
        await page.evaluate((scale) => {
          document.documentElement.style.fontSize =
            String((16 * scale) / 100) + 'px';
        }, text);
        const name = `adult-${lang}-${String(width)}x${String(height)}-${info.project.name}-text-${String(text)}`;
        await capture(page, name + '-idle');
        await page.locator('#calculate').click();
        await expect(page.locator('#height')).toBeFocused();
        await expect(page.locator('#height-error')).toBeVisible();
        await expect(page.locator('#weight-error')).toBeVisible();
        await capture(page, name + '-error');
        await input(page, lang, '170', '65,5');
        await expect(page.locator('#bmi-value')).toHaveText(
          lang === 'vi' ? '22,7' : '22.7',
        );
        await expect(page.locator('#result-heading')).toBeFocused();
        await capture(page, name + '-success');
        await expand(page);
        await input(page, lang, '200', '99.999');
        await expect(page.locator('#category')).toHaveText(
          labels[lang].healthy,
        );
        await expect(page.locator('#exact-bmi')).toHaveText(
          lang === 'vi' ? '24,9998' : '24.9998',
        );
        await capture(page, name + '-boundary-notes-open');
        await input(page, lang, '50', '1000');
        await expect(page.locator('#bmi-value')).toHaveText(
          lang === 'vi' ? '4000,0' : '4000.0',
        );
        await capture(page, name + '-long-result');
      });
  for (const [width, height] of [
    [390, 844],
    [1440, 900],
  ] as const)
    for (const theme of ['light', 'dark'] as const)
      for (const reduced of ['no-preference', 'reduce'] as const)
        test(`privacy accessibility adult ${lang} ${String(width)} ${theme} ${reduced}`, async ({
          browser,
        }, info) => {
          const context = await browser.newContext({
            viewport: { width, height },
            colorScheme: theme,
            reducedMotion: reduced,
          });
          try {
            const page = await context.newPage();
            const requests: {
              url: string;
              method: string;
              body: string | null;
            }[] = [];
            const errors: string[] = [];
            page.on('request', (r) => {
              requests.push({
                url: r.url(),
                method: r.method(),
                body: r.postData(),
              });
            });
            page.on('pageerror', (e) => {
              errors.push(e.message);
            });
            await open(page, app.url, lang);
            await expect(page.locator('input')).toHaveCount(2);
            await expect(page.locator('input[type=range]')).toHaveCount(0);
            await axe(page);
            await page.locator('#calculate').click();
            await axe(page);
            await expand(page);
            for (const weight of ['73.999', '74', '100', '120', '140', '160']) {
              await input(page, lang, '200', weight);
              await axe(page);
            }
            await input(page, lang, '170.125', '65.875');
            await capture(
              page,
              `adult-${lang}-${String(width)}x${String(height)}-${info.project.name}-${theme}-${reduced}`,
            );
            await privacy(context, page);
            expect(errors).toEqual([]);
            expect(
              requests.every(
                (r) =>
                  r.method === 'GET' &&
                  r.body === null &&
                  new URL(r.url).origin === new URL(app.url).origin,
              ),
            ).toBe(true);
            expect(
              requests.some(
                (r) => r.url.includes('65.875') || r.url.includes('170.125'),
              ),
            ).toBe(false);
            expect(
              await page
                .locator('#height')
                .evaluate((e) => getComputedStyle(e).fontFamily),
            ).toContain('Space Grotesk');
            expect(
              await page
                .locator('.brand img')
                .evaluate((e) => (e as HTMLImageElement).naturalWidth),
            ).toBeGreaterThan(0);
            await page.locator('#weight').fill('66');
            await expect(page.locator('#result')).toBeHidden();
            for (const id of ['bmi-value', 'health-advice', 'weight-range'])
              await expect(page.locator('#' + id)).toBeEmpty();
            await page
              .getByRole('button', { name: c.clear, exact: true })
              .click();
            await expect(page.locator('#height')).toHaveValue('');
            await expect(page.locator('#height')).toBeFocused();
          } finally {
            await context.close();
          }
        });
  test(`adult category boundaries and safe advice ${lang}`, async ({
    page,
  }) => {
    await open(page, app.url, lang);
    for (const [weight, category] of [
      ['73.999', 'underweight'],
      ['74', 'healthy'],
      ['99.999', 'healthy'],
      ['100', 'overweight'],
      ['119.999', 'overweight'],
      ['120', 'class1'],
      ['140', 'class2'],
      ['160', 'class3'],
    ] as const) {
      await input(page, lang, '200', weight);
      await expect(page.locator('#category')).toHaveText(
        labels[lang][category],
      );
    }
    await input(page, lang, '170', '50');
    await expect(page.locator('#weight-range')).toHaveText(
      lang === 'vi' ? '53,5 - 71,9 kg' : '53.5 - 71.9 kg',
    );
    await expect(page.locator('#weight-change')).toContainText(
      lang === 'vi' ? '3,5 kg' : '3.5 kg',
    );
    await expect(page.locator('#health-advice')).toHaveText(c.underAdvice);
  });
  test(`invalid inputs and recovery ${lang}`, async ({ page }) => {
    await open(page, app.url, lang);
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
      await input(page, lang, h, w);
      await expect(page.locator('#result')).toBeHidden();
      await expect(page.locator('[aria-invalid=true]')).toHaveCount(1);
    }
    await input(page, lang, '170', '65');
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('[aria-invalid=true]')).toHaveCount(0);
  });
  test(`keyboard touch and disclosures ${lang}`, async ({ browser }, info) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
    });
    try {
      const page = await context.newPage();
      await open(page, app.url, lang);
      const skip = page.getByRole('link', { name: c.skip });
      await page.keyboard.press('Tab');
      if (process.platform === 'win32' && info.project.name === 'webkit') {
        // Windows WebKit skips links and now reaches the header theme button.
        await expect(page.locator('[data-theme-toggle]')).toBeFocused();
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
        lang === 'vi' ? '22,5' : '22.5',
      );
      await page.locator('summary').first().tap();
      await expect(page.locator('details').first()).toHaveAttribute('open', '');
      await capture(page, `adult-${lang}-390x844-${info.project.name}-touch`);
      await page.getByRole('button', { name: c.clear, exact: true }).tap();
      await expect(page.locator('#height')).toHaveValue('');
    } finally {
      await context.close();
    }
  });
  for (const mode of ['disabled', 'blocked'] as const)
    test(`script failure privacy ${lang} ${mode}`, async ({
      browser,
    }, info) => {
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
        await page.goto(app.url + (lang === 'en' ? 'en/' : ''));
        await expect(page.locator('#calculate')).toBeDisabled();
        await page.locator('#height').fill('177.777');
        await page.locator('#weight').fill('77.777');
        for (const key of ['height', 'weight'])
          await expect(page.locator('#' + key)).not.toHaveAttribute(
            'name',
            /.+/,
          );
        await page.locator('#weight').press('Enter');
        await capture(
          page,
          `adult-${lang}-390x844-${info.project.name}-script-${mode}`,
          false,
        );
        expect(
          requests.some((r) => r.includes('177.777') || r.includes('77.777')),
        ).toBe(false);
        await expect(page.locator('#result')).toBeHidden();
      } finally {
        await context.close();
      }
    });
  test(`offline, metadata, source and cross-link ${lang}`, async ({
    page,
    context,
  }) => {
    await open(page, app.url, lang);
    expect(await page.title()).toBe(c.title + ' | VINASIG');
    const canonical =
      'https://bmi.vinasig.io.vn/' + (lang === 'en' ? 'en/' : '');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
      'href',
      canonical,
    );
    await expect(page.locator('link[hreflang]')).toHaveCount(3);
    await expect(page.locator('#other-tool')).toHaveAttribute(
      'href',
      'https://nvqs-bmi.vinasig.io.vn/' + (lang === 'en' ? 'en/' : ''),
    );
    await expect(page.locator('body')).toHaveAttribute('data-tool', 'adult');
    await expand(page);
    await expect(
      page.getByRole('link', { name: c.sourceName, exact: true }),
    ).toHaveAttribute('href', medicalSource);
    const structured: unknown = JSON.parse(
      await page.locator('script[type="application/ld+json"]').innerText(),
    );
    expect(structured).toMatchObject({
      '@type': 'WebApplication',
      name: c.title,
      url: canonical,
      inLanguage: lang,
    });
    await context.setOffline(true);
    await input(page, lang, '170', '65');
    await expect(page.locator('#bmi-value')).toHaveText(
      lang === 'vi' ? '22,5' : '22.5',
    );
  });
}
test('locale navigation, reload and history clear state', async ({ page }) => {
  await open(page, app.url, 'vi');
  await input(page, 'vi', '170', '50');
  await page
    .getByRole('link', { name: 'Đọc trang này bằng tiếng Anh', exact: true })
    .click();
  await expect(page.locator('#height')).toHaveValue('');
  await expect(page.locator('#result')).toBeHidden();
  await input(page, 'en', '200', '72');
  await page.reload();
  await expect(page.locator('#height')).toHaveValue('');
  await expect(page.locator('#result')).toBeHidden();
  await page.goBack();
  await expect(page.locator('#height')).toHaveValue('');
});
for (const reduced of ['no-preference', 'reduce'] as const)
  test(`motion reversal ${reduced}`, async ({ page }, info) => {
    await page.emulateMedia({ reducedMotion: reduced });
    await open(page, app.url, 'vi');
    const button = page.locator('#calculate');
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
