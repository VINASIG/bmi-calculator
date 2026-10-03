import type { AdultCategory } from './adult.ts';
import type { Field, InputError, Locale } from './math.ts';
export const medicalSource =
  'https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html';
export const gainSource =
  'https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/healthy-ways-to-gain-weight/';
export const copy = {
  vi: {
    lang: 'vi',
    title: 'BMI sức khỏe người lớn',
    description:
      'Tính BMI người lớn theo phân loại CDC. Xem khoảng cân nặng tham khảo và lời khuyên sức khỏe, xử lý số đo ngay trong trình duyệt.',
    lead: 'Hai số đo. Hiểu rõ chỉ số BMI của bạn.',
    intro:
      'Dành cho người từ 20 tuổi. BMI là chỉ số sàng lọc, không phải chẩn đoán. Không dùng phân loại này cho trẻ em, người dưới 20 tuổi hoặc trong thai kỳ.',
    formTitle: 'Số đo của bạn',
    height: 'Chiều cao tính bằng cm',
    weight: 'Cân nặng tính bằng kg',
    hint: 'Nhập trực tiếp. Chấp nhận dấu phẩy hoặc dấu chấm, tối đa 3 chữ số thập phân.',
    calculate: 'Tính BMI',
    clear: 'Xóa',
    privacy: 'Số đo chỉ được xử lý trong trình duyệt này.',
    resultTitle: 'Kết quả',
    empty: 'Nhập chiều cao và cân nặng để tính BMI.',
    resultNote:
      'BMI hiển thị 1 chữ số thập phân. Phân loại dùng giá trị chính xác trước khi làm tròn.',
    exact: 'Giá trị dùng để đối chiếu',
    scope:
      'BMI không phân biệt cơ, mỡ và xương. Chuyên gia y tế cần xem thêm tình trạng sức khỏe và các số đo khác.',
    noScript:
      'Bật JavaScript để tính BMI tại chỗ. Phần hướng dẫn vẫn đọc được khi tắt JavaScript.',
    error: 'Kiểm tra các số đo được đánh dấu.',
    edited: 'Số đo đã thay đổi. Tính lại để xem kết quả mới.',
    done: 'Đã tính BMI và khoảng cân nặng tham khảo.',
    skip: 'Đến công cụ tính BMI',
    navigation: 'Ngôn ngữ',
    footer: 'Một công cụ của VINASIG.',
    sourceLink: 'Mã nguồn',
    details: 'Phân loại và cách tính',
    scopeQuestion: 'BMI có thể cho biết điều gì?',
    privacyQuestion: 'Dữ liệu của tôi được xử lý thế nào?',
    privacyDetails:
      'Không gửi số đo đến máy chủ, không lưu lịch sử, không cookie hay analytics. Xóa, đổi ngôn ngữ hoặc tải lại trang để bỏ dữ liệu. Cần mạng cho lần tải trang đầu tiên.',
    formula:
      'BMI bằng cân nặng tính bằng kg chia cho bình phương chiều cao tính bằng mét. Các ngưỡng CDC được so sánh với BMI chưa làm tròn.',
    reviewed: 'Đối chiếu nguồn ngày 03/10/2026.',
    sourceName: 'Phân loại BMI người lớn của CDC',
    adviceTitle: 'Khoảng cân nặng và lời khuyên',
    reference: 'Khoảng tham khảo tại chiều cao đã nhập',
    referenceNote:
      'Khoảng quy đổi dùng BMI 18,5 đến 24,9. Cận thấp làm tròn lên và cận cao làm tròn xuống đến 0,1 kg, để số hiển thị nằm trong khoảng tham khảo. CDC phân loại cân nặng bình thường từ 18,5 đến dưới 25.',
    lower: 'Cận thấp',
    upper: 'Cận cao',
    distance: 'Khoảng cách đến hai cận',
    gain: 'Mức chênh lệch để tới cận thấp',
    lose: 'Mức chênh lệch để tới cận cao',
    maintain:
      'Số đo đang trong khoảng BMI bình thường. Không cần cố đạt một cân nặng duy nhất.',
    underAdvice:
      'Nếu thiếu cân, trao đổi với bác sĩ hoặc chuyên gia dinh dưỡng, nhất là khi yếu, mệt hoặc sụt cân không chủ ý. Ăn đều, có thể chia bữa nhỏ, bổ sung thực phẩm giàu dinh dưỡng và nguồn đạm. Không tiếp tục giảm cân.',
    overAdvice:
      'Nếu BMI từ 25 trở lên, trao đổi với chuyên gia y tế để đánh giá cơ, mỡ và các yếu tố sức khỏe khác. Ưu tiên bữa ăn cân bằng, vận động phù hợp và thay đổi bền vững. Tránh nhịn ăn hoặc giảm cân cấp tốc.',
    normalAdvice:
      'Duy trì ăn uống đa dạng, vận động phù hợp và theo dõi thay đổi không chủ ý. Cân nặng trong dải BMI bình thường không bảo đảm mọi mặt sức khỏe đều tốt.',
    adviceDisclaimer:
      'Thông tin tham khảo chung và phép quy đổi số học, không thay thế khám, chẩn đoán hoặc kế hoạch dinh dưỡng cá nhân. Với số đo bất thường, cần được chuyên gia y tế đánh giá.',
    adviceSource: 'Hướng dẫn NHS về tăng cân lành mạnh',
    chooseTitle: 'Bạn nên dùng công cụ nào?',
    chooseAdult:
      'Dùng BMI sức khỏe để tham khảo phân loại người lớn và khoảng cân nặng theo chiều cao.',
    chooseMilitary:
      'Để đối chiếu thể lực, BMI tuyển quân Việt Nam và số đo trong hồ sơ khám, dùng công cụ BMI NVQS riêng.',
    otherLink: 'Mở BMI NVQS',
  },
  en: {
    lang: 'en',
    title: 'Adult BMI Calculator',
    description:
      'Calculate adult BMI with CDC categories, a reference weight range and general health guidance. Measurements stay in your browser.',
    lead: 'Two measurements. Understand your BMI.',
    intro:
      'For adults aged 20 and older. BMI is a screening measure, not a diagnosis. Do not apply these categories to children, people under 20 or during pregnancy.',
    formTitle: 'Your measurements',
    height: 'Height in cm',
    weight: 'Weight in kg',
    hint: 'Type directly. A decimal point or comma works, with up to 3 decimal places.',
    calculate: 'Calculate BMI',
    clear: 'Clear',
    privacy: 'Your measurements stay in this browser.',
    resultTitle: 'Your result',
    empty: 'Enter height and weight to calculate BMI.',
    resultNote:
      'BMI displays 1 decimal place. Categories use the exact value before rounding.',
    exact: 'Value used for comparison',
    scope:
      'BMI does not distinguish muscle, fat and bone. A health professional needs other health information and measurements to interpret it.',
    noScript:
      'Enable JavaScript to calculate locally. Guidance remains readable without JavaScript.',
    error: 'Check the highlighted measurements.',
    edited: 'Measurements changed. Calculate again for a new result.',
    done: 'BMI and reference weight range calculated.',
    skip: 'Skip to the BMI calculator',
    navigation: 'Language',
    footer: 'A VINASIG tool.',
    sourceLink: 'View source',
    details: 'Categories and calculation',
    scopeQuestion: 'What can BMI tell me?',
    privacyQuestion: 'What happens to my data?',
    privacyDetails:
      'No measurements are sent to a server, saved in history, cookies or analytics. Clear, change language or reload to remove data. An internet connection is needed for the initial page load.',
    formula:
      'BMI = weight in kilograms ÷ height in meters squared. CDC thresholds use the BMI before rounding.',
    reviewed: 'Sources checked on 3 October 2026.',
    sourceName: 'CDC adult BMI categories',
    adviceTitle: 'Weight range and health guidance',
    reference: 'Reference range at your entered height',
    referenceNote:
      'This conversion uses BMI 18.5 through 24.9. The lower weight is rounded up and the upper weight down to 0.1 kg to keep displayed values inside that range. The CDC healthy category is 18.5 to below 25.',
    lower: 'Lower boundary',
    upper: 'Upper boundary',
    distance: 'Distance to each boundary',
    gain: 'Difference to reach the lower boundary',
    lose: 'Difference to reach the upper boundary',
    maintain:
      'These measurements fall in the healthy BMI category. There is no single weight you need to reach.',
    underAdvice:
      'If you are underweight, speak with a doctor or dietitian, especially if you feel weak, tired or lose weight unintentionally. Eat regularly, consider smaller meals, and include nutritious foods and protein. Do not continue losing weight.',
    overAdvice:
      'If BMI is 25 or higher, discuss muscle, body fat and other health factors with a health professional. Favor balanced meals, suitable activity and sustainable changes. Avoid fasting or rapid weight loss.',
    normalAdvice:
      'Maintain varied meals and suitable activity, and discuss unexplained weight changes with a clinician. A healthy BMI does not guarantee good health in every respect.',
    adviceDisclaimer:
      'General reference information and arithmetic, not a diagnosis or an individual nutrition plan. Unusual measurements need professional assessment.',
    adviceSource: 'NHS guidance on healthy weight gain',
    chooseTitle: 'Which tool should you use?',
    chooseAdult:
      'Use Adult BMI for adult screening categories and a weight range at your height.',
    chooseMilitary:
      'Use the separate Military BMI tool for Vietnamese recruitment rules, physique scoring and examination-record comparisons.',
    otherLink: 'Open Military BMI',
  },
} as const;
export const labels: Record<Locale, Record<AdultCategory, string>> = {
  vi: {
    underweight: 'Thiếu cân',
    healthy: 'Cân nặng bình thường',
    overweight: 'Thừa cân',
    class1: 'Béo phì độ I',
    class2: 'Béo phì độ II',
    class3: 'Béo phì độ III',
  },
  en: {
    underweight: 'Underweight',
    healthy: 'Healthy weight',
    overweight: 'Overweight',
    class1: 'Obesity, class 1',
    class2: 'Obesity, class 2',
    class3: 'Obesity, class 3',
  },
};
export const ranges: Record<Locale, readonly string[]> = {
  vi: [
    'Dưới 18,5',
    '18,5 đến dưới 25',
    '25 đến dưới 30',
    '30 đến dưới 35',
    '35 đến dưới 40',
    'Từ 40',
  ],
  en: [
    'Below 18.5',
    '18.5 to below 25',
    '25 to below 30',
    '30 to below 35',
    '35 to below 40',
    '40 or above',
  ],
};
export function fieldError(
  locale: Locale,
  field: Field,
  error: InputError,
): string {
  const name =
    locale === 'vi' ? (field === 'height' ? 'chiều cao' : 'cân nặng') : field;
  if (error === 'required')
    return locale === 'vi' ? `Nhập ${name}.` : `Enter your ${name}.`;
  if (error === 'decimal')
    return locale === 'vi'
      ? 'Dùng số dương, tối đa 3 chữ số thập phân. Không dùng đơn vị hay dấu tách hàng nghìn.'
      : 'Use a positive number with up to 3 decimal places. Omit units and thousands separators.';
  const range = field === 'height' ? '50 - 300 cm' : '1 - 1000 kg';
  return locale === 'vi'
    ? `Kiểm tra đơn vị và nhập ${name} trong khoảng ${range}.`
    : `Check the unit and enter ${name} within ${range}.`;
}
