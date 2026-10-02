import {
  adultCategory,
  calculate,
  displayBmi,
  displayMeasurement,
  militaryCategory,
} from '../lib/bmi.ts';
import type { Field, Profile } from '../lib/bmi.ts';
import { adultLabels, copy, fieldError, militaryLabels } from '../lib/copy.ts';

function element<T extends HTMLElement>(id: string, type: { new (): T }): T {
  const node = document.getElementById(id);
  if (!(node instanceof type)) throw new Error(`Missing ${id}`);
  return node;
}

const profile: Profile =
  document.body.dataset['profile'] === 'military' ? 'military' : 'adult';
const c = copy[profile];
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
const empty = element('empty-result', HTMLDivElement);
const heading = element('result-heading', HTMLHeadingElement);
const value = element('bmi-value', HTMLSpanElement);
const category = element('category', HTMLParagraphElement);
const calculation = element('calculation', HTMLParagraphElement);

function invalidate(message = ''): void {
  result.hidden = true;
  empty.hidden = false;
  value.textContent = '';
  category.textContent = '';
  category.removeAttribute('data-state');
  calculation.textContent = '';
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
        errors[key].textContent = fieldError(profile, key, error);
        errors[key].hidden = false;
        first ??= key;
      }
    }
    status.textContent = c.error;
    status.dataset['state'] = 'error';
    if (first) fields[first].focus();
    return;
  }
  const { bmi, height: h, weight: w } = answer.measurements;
  value.textContent = displayBmi(bmi, profile);
  value.classList.toggle('precise', value.textContent.length > 5);
  if (profile === 'military') {
    const band = militaryCategory(bmi);
    category.textContent = militaryLabels[band];
    category.dataset['state'] = band === 'within' ? 'info' : 'warning';
  } else {
    category.textContent = adultLabels[adultCategory(bmi)];
    category.dataset['state'] = 'info';
  }
  // The recap preserves the input's full precision; no rounded intermediate is
  // used for arithmetic. Centimeters make the stated calculation unambiguous.
  calculation.textContent = `${displayMeasurement(w, profile)} kg · ${displayMeasurement(h, profile)} cm`;
  empty.hidden = true;
  result.hidden = false;
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
