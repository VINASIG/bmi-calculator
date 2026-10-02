# Product decisions

The owner's main goal is a Vietnamese military-service BMI check, with an English medical screening tool in the same design language as VINASIG's existing utilities.

One repository and one deployment keep shared arithmetic, assets, accessibility fixes, dependencies and tests consistent. Separate URLs and visible tool navigation give each interpretation its own language, scope, canonical metadata and source. Do not silently substitute adult categories for legal rules or introduce a language toggle that suggests identical meanings.

## Acceptance criteria

- Two persistent labels and direct decimal inputs for height in cm and weight in kg. No sliders or identity collection.
- Short input, Calculate, result and Clear flow. Invalid measurements retain their entered text with field-specific errors and focus. Editing removes the old result. Clear removes both measurements and the old interpretation. The first page load does not steal focus.
- Native links and disclosures, keyboard operation, useful status announcements and a visible mobile result without animated scrolling. No custom menu, overlay, authenticated route or hover-only function is needed.
- Static assets and local calculations. Measurements are not serialized into form URLs, stored in cookies or web storage, logged, sent through a backend or copied into links. Script failure leaves Calculate disabled. Page reload and navigation discard the product's measurements.
- Reuse the adopted VINASIG neutral surfaces, semantic colors, local Space Grotesk, existing exported logo/favicons and Lucide. Use quiet 160 ms button motion on fine pointers and remove it for reduced motion.
- Check both routes at the five standard viewports, 320 px, the 759/760/761 px breakpoint neighbors and intermediate widths. Test normal and 200% root text, errors, expanded notes, boundary and long numerical results, themes, touch and keyboard.

## Arithmetic and scope

Inputs accept positive plain decimals with up to three fractional places, using a point or comma. Thousands separators, exponents, embedded units and non-finite values are rejected. Technical input guards of 50-300 cm and 1-1000 kg catch mistaken units and extreme input. These broad software guards are not clinical or recruitment limits. A technically valid input does not establish that the measurements describe a real adult.

Scaled decimal integers and rational cross multiplication keep threshold classification exact. The result normally shows two decimals. Display precision increases, up to twelve places, when rounding would change the relationship to a threshold. The recap preserves the original measurement precision. No intermediate rounded height, BMI or category is used in the comparison.

The medical profile uses CDC's age-20-and-older scope without asking the user for a birth date. The military profile checks only the specific BMI criterion. It does not score height, weight, chest measurement, eyesight, illness or overall health, and does not assert exemption, deferment or certainty of a call-up. It applies to recruitment into the military, not a separate police or military-school admission calculator.

No dietary advice, weight targets, legal evasion guidance, charts of stored health data, sharing of personal results, accounts or unrelated feature panels are included.
