import assert from 'node:assert/strict';
import { test } from 'node:test';
import { adultCategory, healthyReference } from '../src/lib/adult.ts';
import { copy, fieldError } from '../src/lib/adult-copy.ts';
import { calculate, compare, bmiRatio } from '../src/lib/math.ts';
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
] as const)
  await test(`CDC boundary 200cm/${weight}kg`, () => {
    const answer = calculate('200', weight);
    assert(answer.ok);
    assert.equal(adultCategory(answer.measurements.bmi), expected);
  });
await test('reference weights round inward and never target underweight or overweight', () => {
  for (const height of ['50', '155.499', '170', '170.125', '200', '300'])
    for (const weight of ['1', '50', '55', '1000']) {
      const answer = calculate(height, weight);
      assert(answer.ok);
      const range = healthyReference(answer.measurements);
      assert(
        compare(bmiRatio(answer.measurements.height, range.lower), 185n) >= 0,
      );
      assert(
        compare(bmiRatio(answer.measurements.height, range.upper), 249n) <= 0,
      );
      assert(range.increaseToLower >= 0n && range.decreaseToUpper >= 0n);
    }
  const answer = calculate('170', '50');
  assert(answer.ok);
  assert.deepEqual(healthyReference(answer.measurements), {
    lower: 53_500n,
    upper: 71_900n,
    increaseToLower: 3_500n,
    decreaseToUpper: 0n,
    distanceToLower: 3_500n,
    distanceToUpper: 21_900n,
  });
});
await test('bilingual advice addresses low weight safely and states adult scope', () => {
  assert.match(copy.vi.underAdvice, /Không tiếp tục giảm cân/);
  assert.match(copy.en.underAdvice, /Do not continue losing weight/);
  assert.match(copy.vi.intro, /20/);
  assert.match(copy.en.intro, /20/);
  assert.match(fieldError('vi', 'height', 'required'), /chiều cao/);
  assert.match(fieldError('en', 'weight', 'range'), /1 - 1000 kg/);
});
