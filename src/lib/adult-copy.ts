import type { AdultCategory } from './adult.ts';
import type { Field, InputError, Locale } from './math.ts';
export const medicalSource =
  'https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html';
export const gainSource =
  'https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/healthy-ways-to-gain-weight/';
export const copy = {
  vi: {
    lang: 'vi',
    brandHome: 'Trang chủ VINASIG',
    title: 'BMI sức khỏe người lớn',
    description:
      'Tính BMI người lớn theo phân loại CDC. Xem khoảng cân nặng tham khảo và lời khuyên sức khỏe, xử lý số đo ngay trong trình duyệt.',
    lead: 'Hai số đo. Hiểu rõ chỉ số BMI của bạn.',
    intro:
      'Dành cho người từ 20 tuổi. BMI giúp tham khảo cân nặng theo chiều cao, không cho biết bạn có bệnh hay không. Không dùng phân loại này cho người dưới 20 tuổi hoặc trong thai kỳ.',
    formTitle: 'Số đo của bạn',
    height: 'Chiều cao tính bằng cm',
    weight: 'Cân nặng tính bằng kg',
    hint: 'Nhập trực tiếp. Chấp nhận dấu phẩy hoặc dấu chấm, tối đa 3 chữ số thập phân.',
    automatic: 'Kết quả tự cập nhật khi nhập chiều cao và cân nặng.',
    clear: 'Xóa tất cả',
    privacy: 'Số đo chỉ được xử lý trong trình duyệt này.',
    resultTitle: 'Kết quả',
    empty: 'Nhập chiều cao và cân nặng để tính BMI.',
    resultNote:
      'Số BMI ở trên được làm tròn cho dễ đọc. Việc xếp nhóm vẫn dùng số đầy đủ, nên không đổi nhóm chỉ vì làm tròn.',
    bmiExplanation: 'Vì sao số BMI được làm tròn?',
    exact: 'BMI chi tiết hơn là',
    scope:
      'BMI không cho biết bạn có bao nhiêu cơ hay mỡ. Nếu lo lắng về sức khỏe, hãy hỏi bác sĩ.',
    noScript:
      'Bật JavaScript để tính BMI tại chỗ. Phần hướng dẫn vẫn đọc được khi tắt JavaScript.',
    error: 'Kiểm tra các số đo được đánh dấu.',
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
    reviewed: 'Đối chiếu nguồn ngày 04-10-2026.',
    sourceName: 'Phân loại BMI người lớn của CDC',
    adviceTitle: 'Cân nặng và lời khuyên',
    reference: 'Với chiều cao của bạn, cân nặng tham khảo là',
    weightMethod: 'Cách tính khoảng cân nặng',
    referenceNote:
      'Khoảng cân nặng này được tính từ chiều cao của bạn, với BMI từ 18,5 đến 24,9. Hai đầu khoảng được làm tròn đến 0,1 kg, số nhỏ làm tròn lên và số lớn làm tròn xuống để vẫn nằm trong khoảng đó. CDC xếp cân nặng bình thường từ BMI 18,5 đến dưới 25, nên cân nặng hơi cao hơn số cuối khoảng vẫn có thể thuộc nhóm bình thường.',
    maintain:
      'Cân nặng của bạn ở mức bình thường theo BMI. Không cần cố đạt một số cân duy nhất.',
    underAdvice:
      'Nên hỏi bác sĩ hoặc chuyên gia dinh dưỡng về cách tăng cân phù hợp, nhất là khi bạn yếu, mệt hoặc sụt cân dù không định giảm. Ăn đủ bữa, có thể thêm bữa nhỏ và các món như trứng, cá, thịt hoặc đậu. Không tiếp tục giảm cân.',
    overAdvice:
      'Nên hỏi bác sĩ để biết bạn có cần giảm cân hay không, vì BMI không phân biệt cơ và mỡ. Ăn đủ bữa, thêm rau và vận động phù hợp với sức khỏe. Nếu cần giảm cân, hãy thay đổi từ từ. Tránh nhịn ăn hoặc giảm cân cấp tốc.',
    normalAdvice:
      'Tiếp tục ăn uống đa dạng và vận động phù hợp. Nếu cân nặng thay đổi dù bạn không định tăng hay giảm, hãy hỏi bác sĩ. BMI bình thường không có nghĩa là mọi mặt sức khỏe đều tốt.',
    adviceDisclaimer:
      'Khoảng này để tham khảo, không phải số cân bạn bắt buộc phải đạt. Lời khuyên không thay thế việc khám bác sĩ hoặc hướng dẫn riêng từ chuyên gia dinh dưỡng.',
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
    brandHome: 'VINASIG home',
    title: 'Adult BMI Calculator',
    description:
      'Calculate adult BMI with CDC categories, a reference weight range and general health guidance. Measurements stay in your browser.',
    lead: 'Two measurements. Understand your BMI.',
    intro:
      'For adults aged 20 and older. BMI helps you check weight for your height, but cannot tell whether you have an illness. Do not use these categories under age 20 or during pregnancy.',
    formTitle: 'Your measurements',
    height: 'Height in cm',
    weight: 'Weight in kg',
    hint: 'Type directly. A decimal point or comma works, with up to 3 decimal places.',
    automatic:
      'Your result updates automatically as you enter height and weight.',
    clear: 'Clear all',
    privacy: 'Your measurements stay in this browser.',
    resultTitle: 'Your result',
    empty: 'Enter height and weight to calculate BMI.',
    resultNote:
      'The BMI above is rounded to make it easier to read. Your category still uses the full number, so rounding alone cannot change it.',
    bmiExplanation: 'Why is the BMI number rounded?',
    exact: 'BMI in more detail is',
    scope:
      'BMI cannot tell how much muscle or fat you have. Ask a doctor if you are concerned about your health.',
    noScript:
      'Enable JavaScript to calculate locally. Guidance remains readable without JavaScript.',
    error: 'Check the highlighted measurements.',
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
    reviewed: 'Sources checked on 4 October 2026.',
    sourceName: 'CDC adult BMI categories',
    adviceTitle: 'Your weight and next steps',
    reference: 'At your height, the reference weight range is',
    weightMethod: 'How this weight range is calculated',
    referenceNote:
      'This range uses your height and BMI from 18.5 to 24.9. Both ends are rounded to 0.1 kg, the smaller weight up and the larger weight down, to stay within that range. The CDC healthy category runs from BMI 18.5 to below 25, so a weight slightly above the last number may still be in the healthy category.',
    maintain:
      'Your weight is in the healthy BMI category. There is no single weight you need to reach.',
    underAdvice:
      'Ask a doctor or dietitian about a suitable way to gain weight, especially if you feel weak, tired or lose weight without trying. Eat regular meals, add smaller meals if helpful, and include foods such as eggs, fish, meat or beans. Do not continue losing weight.',
    overAdvice:
      'Ask a doctor whether you need to lose weight, because BMI cannot tell muscle from fat. Eat regular meals, include vegetables and stay active in a way that suits your health. If weight loss is needed, make gradual changes. Avoid fasting or rapid weight loss.',
    normalAdvice:
      'Keep eating varied meals and staying active in a way that suits your health. Ask a doctor if your weight changes without trying to gain or lose it. A healthy BMI does not mean every aspect of your health is good.',
    adviceDisclaimer:
      'This range is a reference, not a weight you must reach. The guidance does not replace medical care or advice tailored to you by a dietitian.',
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
