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
const clear = element('clear', HTMLButtonElement);
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
const value = element('bmi-value', HTMLSpanElement);
const category = element('category', HTMLParagraphElement);
const calculation = element('calculation', HTMLParagraphElement);
const exact = element('exact-bmi', HTMLSpanElement);
const range = element('weight-range', HTMLElement);
const distance = element('weight-distance', HTMLParagraphElement);
const change = element('weight-change', HTMLParagraphElement);
const advice = element('health-advice', HTMLParagraphElement);
const validated = new Set<HTMLInputElement>();
let composing = false;
let clearing = false;
clear.addEventListener('pointerdown', () => {
  clearing = true;
});
window.addEventListener('pointerup', () => {
  window.setTimeout(() => {
    clearing = false;
  }, 0);
});
window.addEventListener('pointercancel', () => {
  clearing = false;
});
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
function refresh(validateAll = false): void {
  invalidate();
  if (composing) return;
  const answer = calculate(height.value, weight.value);
  if (!answer.ok) {
    let first: Field | undefined;
    for (const key of ['height', 'weight'] as const) {
      const error = answer.errors[key];
      if (error && (validateAll || validated.has(fields[key]))) {
        fields[key].setAttribute('aria-invalid', 'true');
        errors[key].textContent = fieldError(lang, key, error);
        errors[key].hidden = false;
        first ??= key;
      }
    }
    if (first) {
      status.textContent = c.error;
      status.dataset['state'] = 'error';
      if (validateAll) fields[first].focus();
    }
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
  calculation.textContent = `${displayMeasurement(measurements.weight, lang)} kg - ${displayMeasurement(measurements.height, lang)} cm`;
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
  status.textContent = `BMI ${formatRatio(measurements.bmi, lang)}. ${c.done}`;
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  refresh(true);
});
form.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
    event.preventDefault();
    if (!event.isComposing) refresh(true);
  }
});
for (const input of [height, weight]) {
  input.addEventListener('input', () => {
    validated.delete(input);
    refresh();
  });
  input.addEventListener('blur', (event) => {
    if (clearing || event.relatedTarget === clear) return;
    validated.add(input);
    refresh();
  });
  input.addEventListener('compositionstart', () => {
    composing = true;
    invalidate();
  });
  input.addEventListener('compositionend', () => {
    composing = false;
    refresh();
  });
}
form.addEventListener('reset', () => {
  clearing = false;
  composing = false;
  validated.clear();
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
for (const input of [height, weight]) input.disabled = false;
clear.disabled = false;
for (const submit of form.querySelectorAll<HTMLButtonElement>(
  '[data-enter-submit]',
))
  submit.disabled = false;
form.dataset['ready'] = 'true';
