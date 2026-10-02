export type Profile = 'military' | 'adult';
export type Field = 'height' | 'weight';
export type InputError = 'required' | 'decimal' | 'range';
export type AdultCategory =
  'underweight' | 'healthy' | 'overweight' | 'class1' | 'class2' | 'class3';
export type MilitaryCategory = 'below' | 'within' | 'above';

export interface Ratio {
  numerator: bigint;
  denominator: bigint;
}
export interface Measurements {
  height: bigint;
  weight: bigint;
  bmi: Ratio;
}
export type MeasurementResult =
  | { ok: true; measurements: Measurements }
  | { ok: false; errors: Partial<Record<Field, InputError>> };

// Decimal input is limited to three places. Cross multiplication keeps the legal
// and medical boundaries exact, including values that binary floats misclassify.
export function parseMeasurement(
  raw: string,
  field: Field,
): bigint | InputError {
  const input = raw.trim();
  if (!input) return 'required';
  if (input.length > 12 || !/^\d{1,4}(?:[.,]\d{1,3})?$/.test(input))
    return 'decimal';
  const [whole = '', fraction = ''] = input.replace(',', '.').split('.');
  const value = BigInt(whole) * 1000n + BigInt(fraction.padEnd(3, '0'));
  const [minimum, maximum] =
    field === 'height' ? [50_000n, 300_000n] : [1_000n, 1_000_000n];
  return value < minimum || value > maximum ? 'range' : value;
}

export function calculate(height: string, weight: string): MeasurementResult {
  const h = parseMeasurement(height, 'height');
  const w = parseMeasurement(weight, 'weight');
  const errors: Partial<Record<Field, InputError>> = {};
  if (typeof h !== 'bigint') errors.height = h;
  if (typeof w !== 'bigint') errors.weight = w;
  if (typeof h !== 'bigint' || typeof w !== 'bigint')
    return { ok: false, errors };
  return {
    ok: true,
    measurements: {
      height: h,
      weight: w,
      bmi: { numerator: w * 10_000_000n, denominator: h * h },
    },
  };
}

export function compare(ratio: Ratio, thresholdTenths: bigint): -1 | 0 | 1 {
  const difference =
    ratio.numerator * 10n - ratio.denominator * thresholdTenths;
  return difference < 0n ? -1 : difference > 0n ? 1 : 0;
}

export function militaryCategory(bmi: Ratio): MilitaryCategory {
  return compare(bmi, 180n) < 0
    ? 'below'
    : compare(bmi, 299n) > 0
      ? 'above'
      : 'within';
}

export function adultCategory(bmi: Ratio): AdultCategory {
  if (compare(bmi, 185n) < 0) return 'underweight';
  if (compare(bmi, 250n) < 0) return 'healthy';
  if (compare(bmi, 300n) < 0) return 'overweight';
  if (compare(bmi, 350n) < 0) return 'class1';
  if (compare(bmi, 400n) < 0) return 'class2';
  return 'class3';
}

function fixed(value: bigint, places: number, separator: string): string {
  const digits = value.toString().padStart(places + 1, '0');
  return digits.slice(0, -places) + separator + digits.slice(-places);
}

export function displayBmi(bmi: Ratio, profile: Profile): string {
  const thresholds =
    profile === 'military' ? [180n, 299n] : [185n, 250n, 300n, 350n, 400n];
  for (let places = 2; places <= 12; places++) {
    const scale = 10n ** BigInt(places);
    const rounded =
      (bmi.numerator * scale * 2n + bmi.denominator) / (bmi.denominator * 2n);
    const presented = { numerator: rounded, denominator: scale };
    if (thresholds.every((t) => compare(presented, t) === compare(bmi, t)))
      return fixed(rounded, places, profile === 'military' ? ',' : '.');
  }
  throw new Error('Unable to display BMI without crossing a category boundary');
}

export function displayMeasurement(value: bigint, profile: Profile): string {
  const result = fixed(value, 3, profile === 'military' ? ',' : '.');
  return result.replace(/0+$/, '').replace(/[.,]$/, '');
}
