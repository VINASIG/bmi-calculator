import { compare, quantize, weightAtBmi } from './math.ts';
import type { Measurements, Ratio } from './math.ts';
export type AdultCategory =
  'underweight' | 'healthy' | 'overweight' | 'class1' | 'class2' | 'class3';
export function adultCategory(bmi: Ratio): AdultCategory {
  if (compare(bmi, 185n) < 0) return 'underweight';
  if (compare(bmi, 250n) < 0) return 'healthy';
  if (compare(bmi, 300n) < 0) return 'overweight';
  if (compare(bmi, 350n) < 0) return 'class1';
  if (compare(bmi, 400n) < 0) return 'class2';
  return 'class3';
}
export function healthyReference({ height, weight }: Measurements) {
  const lower = quantize(weightAtBmi(height, 185n), 1, 'ceil') * 100n;
  const upper = quantize(weightAtBmi(height, 249n), 1, 'floor') * 100n;
  return {
    lower,
    upper,
    increaseToLower: lower > weight ? lower - weight : 0n,
    decreaseToUpper: weight > upper ? weight - upper : 0n,
    distanceToLower: weight > lower ? weight - lower : lower - weight,
    distanceToUpper: weight > upper ? weight - upper : upper - weight,
  };
}
