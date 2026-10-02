# Medical and Vietnamese legal source review

Reviewed on 3 October 2026. The owner supplied the usability requirements: direct number entry and no unnecessary personal information. This task researches the interpretation of BMI against primary sources. It does not claim a representative user survey, clinical validation or review by a medical or legal professional.

## English adult profile

[CDC adult BMI categories](https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html) supplies the age-20-and-older scope and category thresholds. The implemented intervals are below 18.5, from 18.5 to below 25, from 25 to below 30, and obesity classes from 30 to below 35, 35 to below 40, and 40 or greater. The category does not need sex, race or a birth date for adults in that stated scope.

[CDC's explanation of BMI](https://www.cdc.gov/bmi/about/index.html) supports the metric formula and the distinction between screening and individual health assessment. The product states that BMI does not distinguish tissue types and needs context. Children and teenagers require a different assessment and are outside this tool.

The pages were successfully opened through the web research tool. A separate PowerShell request to CDC returned 403 and is recorded as a failed capture, not valid source evidence. No embedded CDC widget or external calculation request is used.

[NHS adult-calculator scope](https://www.nhs.uk/health-assessment-tools/calculate-your-body-mass-index/calculate-bmi-for-adults) identifies pregnancy as unsuitable for that general self-assessment. This product also displays that exclusion without collecting pregnancy information. It retains CDC's 20-and-older scope and category thresholds, rather than combining the NHS age limit or ethnicity-specific risk interpretation with them.

## Vietnamese military profile

[The Government's publication of Circular 68/2025/TT-BQP](https://xaydungchinhsach.chinhphu.vn/thong-tu-68-2025-tt-bqp-sua-doi-bo-sung-mot-so-dieu-ve-tuyen-chon-va-goi-cong-dan-nhap-ngu-119250707223401315.htm) includes the signed circular as page images. The first page was downloaded from its government CDN and opened at readable resolution. Article 1(1)(b) amends Article 4(3)(c) of Circular 148/2018/TT-BQP and sets the BMI exclusion outside 18.0 through 29.9. The signed text confirms strict less-than and greater-than operators, so equality is inside the criterion.

[The Government's full textual publication](https://xaydungchinhsach.chinhphu.vn/tuyen-chon-va-goi-cong-dan-nhap-ngu-sua-doi-bo-sung-quy-dinh-ve-trach-nhiem-cua-dia-phuong-giao-quan-119250708001023475.htm) independently exposes that clause and the requirement for health classes 1, 2 or 3. [The Ministry of Defence's explanation](https://www.mod.gov.vn/wcm/connect/mod/sa-mod-site/sa-ttsk/sa-tt-qpan/bo-quoc-phong-tra-loi-cu-tri-kien-nghi-dieu-chinh-chi-so-bmi-trong-kham-suc-khoe-nghia-vu-quan-su) distinguishes general health standards in Circular 105/2023/TT-BQP from the specific recruitment provisions amended by Circular 68. This is why the product does not use the older general 18.5-to-30 range as the recruitment criterion.

[The official legal database's history](https://vbpl.vn/hanoi/Pages/ivbpq-lichsu.aspx?ItemID=179779&do=word) indexed Circular 68 as effective from 1 July 2025 and still in force. Direct full-text requests returned 403 or a portal landing page, which were not treated as the circular. The published signed text and Government transcription were used instead. The [22 August 2025 consolidated-text record, 36/VBHN-BQP](https://vbpl.vn/TW/Pages/vbpq-thuoctinh-hopnhat.aspx?ItemID=181030&dvid=13) lists Circulars 148 and 68 as its sources.

Current searches of the official legal database, Ministry and Government sites did not identify a subsequent amendment to this BMI recruitment clause. [A Government response published on 3 September 2026](https://xaydungchinhsach.chinhphu.vn/quy-trinh-so-tuyen-kham-suc-khoe-va-giai-quyet-khieu-nai-trong-thuc-hien-nghia-vu-quan-su-119260903152349204.htm) still refers to Circular 105 as amended by Circular 106/2025/TT-BQP for examinations and health disputes. The citizen's example in that question is not used as the numeric recruitment rule. Circular 106 concerns that examination framework and does not replace the separately verified Circular 68 criterion in this calculator.

## Product consequences and maintenance

The displayed outcome concerns BMI alone. It cannot conclude a health grade, recruitment eligibility, exemption or deferment. No inputs about identity, age, sex or other health conditions are collected to fabricate a wider conclusion.

The arithmetic tests cover equality and immediately adjacent values at 18.0 and 29.9, and at each CDC category threshold. They also prove that the medical and legal interpretations differ for the same measurements.

Review official legal history, the signed clause and current Government/Ministry explanations before changing the recruitment rule. Update the visible review date, this record and boundary tests together. A future rule change must not silently reclassify old stored results; this product stores none. Research captures remain under ignored `output/research/`.
