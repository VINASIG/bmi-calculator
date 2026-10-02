import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  adultCategory,
  calculate,
  compare,
  displayBmi,
  displayMeasurement,
  militaryCategory,
  parseMeasurement,
} from '../src/lib/bmi.ts';
import { copy, fieldError } from '../src/lib/copy.ts';

function bmi(height: string, weight: string) {
  const result = calculate(height, weight);
  assert(result.ok);
  return result.measurements.bmi;
}

await test('formula uses centimeters and kilograms without an intermediate rounding', () => {
  assert.deepEqual(bmi('170', '65'), {
    numerator: 650_000_000_000n,
    denominator: 28_900_000_000n,
  });
  assert.equal(displayBmi(bmi('170', '65'), 'adult'), '22.49');
  assert.equal(displayBmi(bmi('170', '65'), 'military'), '22,49');
});
await test('commas, points, whitespace and three decimal places preserve measurement precision', () => {
  assert.deepEqual(
    calculate(' 170,125 ', '65,875'),
    calculate('170.125', '65.875'),
  );
  assert.equal(displayMeasurement(170_125n, 'military'), '170,125');
  assert.equal(displayMeasurement(65_500n, 'adult'), '65.5');
});
for (const raw of [
  '',
  '  ',
  '-1',
  '+170',
  '0',
  '1e2',
  'Infinity',
  'NaN',
  '1,700.0',
  '170 cm',
  '170.1234',
  '1 70',
  '<script>',
  '170\n0',
]) {
  await test(`invalid height is rejected: ${JSON.stringify(raw)}`, () => {
    assert.equal(calculate(raw, '65').ok, false);
  });
}
await test('both missing fields have separate errors and valid input is not discarded', () => {
  assert.deepEqual(calculate('', ''), {
    ok: false,
    errors: { height: 'required', weight: 'required' },
  });
  assert.deepEqual(calculate('170', 'abc'), {
    ok: false,
    errors: { weight: 'decimal' },
  });
});
await test('technical input guard allows its boundaries and rejects impossible ranges', () => {
  assert.equal(parseMeasurement('50', 'height'), 50_000n);
  assert.equal(parseMeasurement('300', 'height'), 300_000n);
  assert.equal(parseMeasurement('1', 'weight'), 1000n);
  assert.equal(parseMeasurement('1000', 'weight'), 1_000_000n);
  for (const raw of ['49.999', '300.001'])
    assert.equal(parseMeasurement(raw, 'height'), 'range');
  for (const raw of ['0.999', '1000.001'])
    assert.equal(parseMeasurement(raw, 'weight'), 'range');
});
for (const [weight, expected] of [
  ['71.999', 'below'],
  ['72', 'within'],
  ['72.001', 'within'],
  ['119.599', 'within'],
  ['119.6', 'within'],
  ['119.601', 'above'],
] as const) {
  await test(`military exact boundary at 200 cm and ${weight} kg`, () => {
    assert.equal(militaryCategory(bmi('200', weight)), expected);
  });
}
for (const [weight, expected] of [
  ['73.999', 'underweight'],
  ['74', 'healthy'],
  ['99.999', 'healthy'],
  ['100', 'overweight'],
  ['119.999', 'overweight'],
  ['120', 'class1'],
  ['139.999', 'class1'],
  ['140', 'class2'],
  ['159.999', 'class2'],
  ['160', 'class3'],
] as const) {
  await test(`CDC exact boundary at 200 cm and ${weight} kg`, () => {
    assert.equal(adultCategory(bmi('200', weight)), expected);
  });
}
await test('classification is separate from display rounding near the legal upper bound', () => {
  assert.equal(displayBmi(bmi('200', '119.601'), 'military'), '29,9003');
  assert.equal(displayBmi(bmi('200', '119.599'), 'military'), '29,8998');
  assert.equal(displayBmi(bmi('200', '119.6'), 'military'), '29,90');
});
await test('display preserves every category relation for a broad deterministic sample', () => {
  for (const h of [
    '50',
    '150.123',
    '170',
    '199.999',
    '200',
    '275.125',
    '300',
  ]) {
    for (let w = 1; w <= 1000; w += 7) {
      const ratio = bmi(h, String(w));
      for (const profile of ['military', 'adult'] as const) {
        const formatted = displayBmi(ratio, profile).replace(',', '.');
        const [whole = '', fraction = ''] = formatted.split('.');
        const displayed = {
          numerator: BigInt(whole + fraction),
          denominator: 10n ** BigInt(fraction.length),
        };
        for (const threshold of profile === 'military'
          ? [180n, 299n]
          : [185n, 250n, 300n, 350n, 400n])
          assert.equal(
            compare(displayed, threshold),
            compare(ratio, threshold),
          );
      }
    }
  }
});
await test('the two interpretations intentionally differ at BMI 18 and 29.95', () => {
  assert.equal(militaryCategory(bmi('200', '72')), 'within');
  assert.equal(adultCategory(bmi('200', '72')), 'underweight');
  assert.equal(militaryCategory(bmi('200', '119.8')), 'above');
  assert.equal(adultCategory(bmi('200', '119.8')), 'overweight');
});
await test('error copy is localized and neither tool requests personal identity', () => {
  assert.match(fieldError('military', 'height', 'required'), /chiều cao/);
  assert.match(fieldError('adult', 'weight', 'range'), /1 - 1000 kg/);
  assert.match(copy.adult.intro, /20/);
  assert.match(copy.military.scope, /Hội đồng/);
});
