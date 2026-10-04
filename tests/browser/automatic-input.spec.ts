import path from 'node:path';
import { mkdir } from 'node:fs/promises';
import { test, expect } from '@playwright/test';
import { startServer } from '../../scripts/serve.ts';
import { open } from './support.ts';
import { inspectInterface } from '../../.vinasig/standards/templates/web/interface.mjs';

let app: Awaited<ReturnType<typeof startServer>>;
test.beforeAll(async () => {
  app = await startServer(path.resolve('dist'));
});
test.afterAll(async () => {
  await app.close();
});
for (const lang of ['vi', 'en'] as const)
  for (const theme of ['light', 'dark'] as const)
    for (const [width, height] of [
      [320, 800],
      [360, 800],
      [390, 844],
      [768, 1024],
      [1024, 768],
      [1440, 900],
    ] as const) {
      test(`automatic BMI ${lang} ${theme} ${String(width)}`, async ({
        page,
      }, info) => {
        await page.setViewportSize({ width, height });
        await page.emulateMedia({
          colorScheme: theme,
          reducedMotion: 'reduce',
        });
        await open(page, app.url, lang);
        if (width === 320)
          await page.addStyleTag({ content: 'html {font-size:200%}' });
        await expect(page.locator('#calculate')).toHaveCount(0);
        const clearButton = page.getByRole('button', {
          name: lang === 'vi' ? 'Xóa tất cả' : 'Clear all',
          exact: true,
        });
        await expect(
          clearButton.locator('svg[aria-hidden="true"]'),
        ).toBeVisible();
        const clearStyle = await clearButton.evaluate((node) => ({
          border: getComputedStyle(node).borderTopWidth,
          color: getComputedStyle(node).borderTopColor,
          height: node.getBoundingClientRect().height,
        }));
        expect(Number.parseFloat(clearStyle.border)).toBeGreaterThanOrEqual(1);
        expect(clearStyle.color).not.toMatch(/transparent|rgba\([^)]*, 0\)$/u);
        expect(clearStyle.height).toBeGreaterThanOrEqual(44);
        await page.locator('#height').fill('170');
        await expect(page.locator('#result')).toBeHidden();
        await expect(page.locator('[aria-invalid=true]')).toHaveCount(0);
        await page.locator('#weight').fill('50');
        await expect(page.locator('#bmi-value')).toHaveText(
          lang === 'vi' ? '17,3' : '17.3',
        );
        await expect(page.locator('#result')).toBeVisible();
        await expect(page.locator('#weight')).toBeFocused();
        // Let native focus scrolling finish before measuring movement
        // during subsequent edits on the already focused input.
        await page.evaluate(
          () =>
            new Promise<void>((resolve) => {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  resolve();
                });
              });
            }),
        );
        const scroll = await page.evaluate(() => scrollY);
        for (const measurement of ['55', '50', '55']) {
          await page.keyboard.press('ControlOrMeta+A');
          await page.keyboard.insertText(measurement);
          await expect(page.locator('#bmi-value')).toHaveText(
            measurement === '50'
              ? lang === 'vi'
                ? '17,3'
                : '17.3'
              : lang === 'vi'
                ? '19,0'
                : '19.0',
          );
          await expect(page.locator('#weight')).toBeFocused();
          expect(await page.evaluate(() => scrollY)).toBe(scroll);
        }
        expect(await page.evaluate(inspectInterface)).toEqual([]);
        const folder = `output/responsive/${process.env['CAPTURE_RUN'] ?? 'automatic-input-2026-10-04'}/after`;
        await mkdir(folder, { recursive: true });
        await page.evaluate(async () => {
          await document.fonts.ready;
          window.scrollTo(0, document.body.scrollHeight);
          await new Promise<void>((resolve) =>
            requestAnimationFrame(() => {
              resolve();
            }),
          );
          window.scrollTo(0, 0);
        });
        await page.screenshot({
          path: `${folder}/${lang}-${theme}-${String(width)}x${String(height)}-${info.project.name}-automatic-result.png`,
          fullPage: true,
        });
        await page.locator('#weight').fill('bad');
        await expect(page.locator('#result')).toBeHidden();
        for (const id of [
          'bmi-value',
          'category',
          'weight-range',
          'health-advice',
        ])
          await expect(page.locator('#' + id)).toBeEmpty();
        await expect(page.locator('#weight-error')).toBeHidden();
        await page.locator('#weight').blur();
        await expect(page.locator('#weight-error')).toBeVisible();
        await page.locator('#weight').fill('55');
        await expect(page.locator('#result')).toBeVisible();
        await expect(page.locator('[aria-invalid=true]')).toHaveCount(0);
        await page.locator('#clear').click();
        await expect(page.locator('#height')).toHaveValue('');
        await expect(page.locator('#weight')).toHaveValue('');
        await expect(page.locator('#result')).toBeHidden();
      });
    }
for (const lang of ['vi', 'en'] as const) {
  test(`automatic BMI Clear works while input is incomplete ${lang}`, async ({
    page,
  }) => {
    await open(page, app.url, lang);
    for (const value of ['', 'bad', '0']) {
      await page.locator('#height').fill('170.125');
      await page.locator('#weight').fill('65.875');
      await expect(page.locator('#result')).toBeVisible();
      await page.locator('#weight').fill(value);
      await page.locator('#clear').click();
      await expect(page.locator('#height')).toHaveValue('');
      await expect(page.locator('#weight')).toHaveValue('');
      await expect(page.locator('#height')).toBeFocused();
      await expect(page.locator('#result')).toBeHidden();
    }
  });
  test(`automatic BMI composition, decimals and Enter ${lang}`, async ({
    page,
  }) => {
    await open(page, app.url, lang);
    await page.locator('#height').fill('170');
    await page.locator('#weight').fill('55');
    await expect(page.locator('#result')).toBeVisible();
    await page.locator('#weight').dispatchEvent('compositionstart');
    await page.locator('#weight').evaluate((node) => {
      if (!(node instanceof HTMLInputElement))
        throw new Error('Expected measurement input');
      node.value = '50';
      node.dispatchEvent(
        new InputEvent('input', {
          bubbles: true,
          isComposing: true,
          inputType: 'insertCompositionText',
          data: '50',
        }),
      );
    });
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#weight').dispatchEvent('compositionend');
    await expect(page.locator('#bmi-value')).toHaveText(
      lang === 'vi' ? '17,3' : '17.3',
    );
    await page.locator('#weight').fill('52,6');
    await expect(page.locator('#bmi-value')).toHaveText(
      lang === 'vi' ? '18,2' : '18.2',
    );
    await page.locator('#weight').press('Enter');
    await expect(page.locator('#weight')).toBeFocused();
    expect(page.url()).toBe(app.url + (lang === 'en' ? 'en/' : ''));
    await expect(page.locator('#result-heading')).not.toBeFocused();
  });
}
