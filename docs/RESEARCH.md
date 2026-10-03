# Adult BMI source review

Reviewed 3 October 2026. This repository now contains one adult-health tool. Vietnamese / and English /en/ are translations.

## Medical scope

[CDC adult BMI categories](https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html) supplies the age-20-and-older scope and thresholds: below 18.5; 18.5 to below 25; 25 to below 30; obesity classes 30 to below 35, 35 to below 40, and at least 40. Sex, identity and date of birth are unnecessary for that arithmetic.

[CDC BMI explanation](https://www.cdc.gov/bmi/about/index.html) distinguishes screening from individual health assessment. BMI does not distinguish muscle, fat or bone. [NHS adult-calculator scope](https://www.nhs.uk/health-assessment-tools/calculate-your-body-mass-index/calculate-bmi-for-adults) supports not applying general adult assessment during pregnancy. Children and adolescents are outside this tool.

[NHS healthy weight gain](https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/healthy-ways-to-gain-weight/) supports regular nutritious meals, protein and professional assessment for unintended weight loss. Advice is general, not an individual calorie or treatment prescription. Underweight users are never advised to lose further weight.

## Exact arithmetic and reference weights

Measurements accept three decimal places and use integers scaled by 1000. BMI uses the exact rational weight × 10,000,000 / height² for scaled units. Categories compare this ratio before rounding. Prominent BMI displays one decimal place. Separate comparison text increases precision until every boundary relation remains faithful. Thus displayed 25.0 may still have unrounded BMI below 25; the comparison line clarifies it.

The health reference conversion deliberately uses BMI **18.5–24.9**, inside the CDC healthy interval whose upper boundary is below 25. Weight at a threshold equals BMI × height in meters squared. Round the lower weight up and the upper down to 0.1 kg, keeping displayed weights in range. Distances and changes towards this interval are arithmetic references, not an individually prescribed goal. Tests cover multiple heights and both boundaries.

No Asia-specific thresholds or imperial inputs are added. Those optional features need separately labeled evidence and tests. No age or pregnancy data is collected.

## Maintenance

Update primary-source dates, visible guidance and tests together. No representative survey, clinical validation or professional medical review is claimed. Captures remain under ignored output/research/. The military tool has an independent repository, source review, UI, copy and tests.
