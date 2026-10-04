import { adultCategory, healthyReference } from './adult.ts';
import { copy } from './adult-copy.ts';
import { displayMeasurement } from './math.ts';
import type { Locale, Measurements } from './math.ts';

export function adultGuidance(measurements: Measurements, lang: Locale) {
  const reference = healthyReference(measurements);
  const c = copy[lang];
  const band = adultCategory(measurements.bmi);
  function comparison(boundary: bigint): string {
    const difference = measurements.weight - boundary;
    const weight = displayMeasurement(boundary, lang);
    if (difference === 0n)
      return lang === 'vi'
        ? `Cân nặng của bạn bằng mức ${weight} kg.`
        : `Your weight is exactly ${weight} kg.`;
    const amount = displayMeasurement(
      difference < 0n ? -difference : difference,
      lang,
    );
    return lang === 'vi'
      ? `Bạn đang ${difference < 0n ? 'nhẹ hơn' : 'nặng hơn'} mức ${weight} kg khoảng ${amount} kg.`
      : `Your weight is about ${amount} kg ${difference < 0n ? 'below' : 'above'} ${weight} kg.`;
  }
  return {
    range: `${displayMeasurement(reference.lower, lang)} - ${displayMeasurement(reference.upper, lang)} kg`,
    distance: `${comparison(reference.lower)} ${comparison(reference.upper)}`,
    change:
      band === 'underweight'
        ? comparison(reference.lower)
        : band === 'healthy'
          ? c.maintain
          : comparison(reference.upper),
    advice:
      band === 'underweight'
        ? c.underAdvice
        : band === 'healthy'
          ? c.normalAdvice
          : c.overAdvice,
  };
}
