import {
  calculate,
  displayMeasurement,
  exactDisplay,
  formatRatio,
} from '../lib/math.ts';
import type { Field, Locale } from '../lib/math.ts';
import { adultCategory, healthyReference } from '../lib/adult.ts';
import { copy, fieldError, labels } from '../lib/adult-copy.ts';

function element<T extends HTMLElement>(id: string, type: { new (): T }): T {
  const node = document.getElementById(id);
  if (!(node instanceof type)) throw new Error(`Missing ${id}`);
  return node;
}
const lang: Locale = document.documentElement.lang === 'en' ? 'en' : 'vi';
const c = copy[lang];
const form = element('bmi-form', HTMLFormElement);
const button = element('calculate', HTMLButtonElement);
const height = element('height', HTMLInputElement);
const weight = element('weight', HTMLInputElement);
const fields = { height, weight };
const errors = {
  height: element('height-error', HTMLParagraphElement),
  weight: element('weight-error', HTMLParagraphElement),
};
const status = element('status', HTMLParagraphElement);
const result = element('result', HTMLDivElement);
const details = element('result-details', HTMLElement);
const empty = element('empty-result', HTMLDivElement);
const heading = element('result-heading', HTMLHeadingElement);
const value = element('bmi-value', HTMLSpanElement);
const category = element('category', HTMLParagraphElement);
const calculation = element('calculation', HTMLParagraphElement);
const exact = element('exact-bmi', HTMLSpanElement);
const range = element('weight-range', HTMLElement);
const distance = element('weight-distance', HTMLParagraphElement);
const change = element('weight-change', HTMLParagraphElement);
const advice = element('health-advice', HTMLParagraphElement);
function invalidate(message = ''): void {
  result.hidden = true;
  details.hidden = true;
  empty.hidden = false;
  for (const node of [
    value,
    category,
    calculation,
    exact,
    range,
    distance,
    change,
    advice,
  ])
    node.textContent = '';
  category.removeAttribute('data-state');
  status.textContent = message;
  status.removeAttribute('data-state');
  for (const key of ['height', 'weight'] as const) {
    fields[key].removeAttribute('aria-invalid');
    errors[key].textContent = '';
    errors[key].hidden = true;
  }
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  invalidate();
  const answer = calculate(height.value, weight.value);
  if (!answer.ok) {
    let first: Field | undefined;
    for (const key of ['height', 'weight'] as const) {
      const error = answer.errors[key];
      if (error) {
        fields[key].setAttribute('aria-invalid', 'true');
        errors[key].textContent = fieldError(lang, key, error);
        errors[key].hidden = false;
        first ??= key;
      }
    }
    status.textContent = c.error;
    status.dataset['state'] = 'error';
    if (first) fields[first].focus();
    return;
  }
  const measurements = answer.measurements;
  value.textContent = formatRatio(measurements.bmi, lang);
  exact.textContent = exactDisplay(
    measurements.bmi,
    [185n, 250n, 300n, 350n, 400n],
    lang,
  );
  const band = adultCategory(measurements.bmi);
  category.textContent = labels[lang][band];
  category.dataset['state'] = 'info';
  calculation.textContent = `${displayMeasurement(measurements.weight, lang)} kg · ${displayMeasurement(measurements.height, lang)} cm`;
  const reference = healthyReference(measurements);
  range.textContent = `${displayMeasurement(reference.lower, lang)} - ${displayMeasurement(reference.upper, lang)} kg`;
  distance.textContent = `${c.distance}. ${c.lower} ${displayMeasurement(reference.distanceToLower, lang)} kg. ${c.upper} ${displayMeasurement(reference.distanceToUpper, lang)} kg.`;
  change.textContent =
    band === 'underweight'
      ? `${c.gain} ${displayMeasurement(reference.increaseToLower, lang)} kg.`
      : band === 'healthy'
        ? c.maintain
        : `${c.lose} ${displayMeasurement(reference.decreaseToUpper, lang)} kg.`;
  advice.textContent =
    band === 'underweight'
      ? c.underAdvice
      : band === 'healthy'
        ? c.normalAdvice
        : c.overAdvice;
  empty.hidden = true;
  result.hidden = false;
  details.hidden = false;
  status.textContent = c.done;
  heading.focus({ preventScroll: true });
  if (window.innerWidth <= 760)
    heading.scrollIntoView({ behavior: 'instant', block: 'start' });
});
for (const input of [height, weight])
  input.addEventListener('input', () => {
    invalidate(c.edited);
  });
form.addEventListener('reset', () => {
  invalidate();
  window.setTimeout(() => {
    height.focus();
  }, 0);
});
window.addEventListener('pagehide', () => {
  form.reset();
  invalidate();
});
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    form.reset();
    invalidate();
  }
});
height.value = '';
weight.value = '';
invalidate();
button.disabled = false;
