import type {
  Profile,
  InputError,
  Field,
  AdultCategory,
  MilitaryCategory,
} from './bmi.ts';

export const medicalSource =
  'https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html';
export const legalSource =
  'https://xaydungchinhsach.chinhphu.vn/thong-tu-68-2025-tt-bqp-sua-doi-bo-sung-mot-so-dieu-ve-tuyen-chon-va-goi-cong-dan-nhap-ngu-119250707223401315.htm';

export const copy = {
  military: {
    lang: 'vi',
    title: 'BMI nghĩa vụ quân sự',
    description:
      'Tính BMI từ chiều cao và cân nặng. Đối chiếu riêng tiêu chí BMI tuyển quân Việt Nam theo Thông tư 68/2025/TT-BQP.',
    lead: 'Hai số đo. Kiểm tra ngưỡng BMI tuyển quân.',
    intro:
      'Chỉ đối chiếu BMI. Kết quả không xác định sức khỏe tổng thể hoặc việc được gọi nhập ngũ.',
    formTitle: 'Số đo của bạn',
    height: 'Chiều cao (cm)',
    weight: 'Cân nặng (kg)',
    hint: 'Nhập số trực tiếp. Dùng dấu phẩy hoặc dấu chấm cho phần thập phân.',
    calculate: 'Tính BMI',
    clear: 'Xóa',
    privacy: 'Số đo chỉ được xử lý trong trình duyệt này.',
    resultTitle: 'Kết quả',
    empty: 'Nhập chiều cao và cân nặng để tính BMI.',
    resultNote:
      'Đối chiếu giá trị chưa làm tròn với ngưỡng từ 18,0 đến 29,9, gồm cả hai mốc.',
    scope:
      'BMI chỉ là một tiêu chí. Hội đồng khám sức khỏe đánh giá thêm các chỉ tiêu khác; cơ quan có thẩm quyền quyết định việc gọi nhập ngũ.',
    sourceName: 'Thông tư 68/2025/TT-BQP',
    source: legalSource,
    reviewed: 'Đối chiếu nguồn ngày 03/10/2026.',
    noScript: 'Bật JavaScript để tính BMI ngay trong trình duyệt.',
    error: 'Kiểm tra lại các số đo được đánh dấu.',
    edited: 'Số đo đã thay đổi. Tính lại để có kết quả mới.',
    done: 'Đã tính BMI từ số đo vừa nhập.',
    skip: 'Đến công cụ tính BMI',
    navigation: 'Chọn công cụ',
    footer: 'Một công cụ của VINASIG.',
    sourceLink: 'Mã nguồn',
    details: 'Căn cứ và cách tính',
    scopeQuestion: 'Kết quả này có quyết định nhập ngũ không?',
    privacyQuestion: 'Dữ liệu của tôi được xử lý thế nào?',
    privacyDetails:
      'Công cụ không gửi số đo đến máy chủ, không lưu lịch sử và không dùng cookie hay phân tích hành vi. Xóa hoặc tải lại trang để bỏ dữ liệu. Bạn cần mạng để tải trang lần đầu.',
    formula:
      'BMI = cân nặng (kg) ÷ chiều cao (m)². Kết quả hiển thị thường có hai chữ số thập phân; gần mốc phân loại sẽ hiện thêm chữ số để tránh hiểu nhầm.',
    legalDetails:
      'Điểm b khoản 1 Điều 1 Thông tư 68/2025/TT-BQP sửa điểm c khoản 3 Điều 4 Thông tư 148/2018/TT-BQP. BMI nhỏ hơn 18,0 hoặc lớn hơn 29,9 thuộc trường hợp không gọi nhập ngũ vào Quân đội theo tiêu chí này.',
  },
  adult: {
    lang: 'en',
    title: 'Adult BMI Calculator',
    description:
      'Calculate adult BMI privately from height and weight, with CDC categories for adults aged 20 and older. No sliders, accounts or stored measurements.',
    lead: 'Two measurements. A clear BMI result.',
    intro:
      'For adults aged 20 and older. BMI is a screening measure, not a diagnosis. Do not use this tool during pregnancy.',
    formTitle: 'Your measurements',
    height: 'Height (cm)',
    weight: 'Weight (kg)',
    hint: 'Type your measurements directly. A decimal point or comma works.',
    calculate: 'Calculate BMI',
    clear: 'Clear',
    privacy: 'Your measurements stay in this browser.',
    resultTitle: 'Your result',
    empty: 'Enter your height and weight to calculate BMI.',
    resultNote: 'CDC adult categories use the BMI before display rounding.',
    scope:
      'BMI does not distinguish muscle, fat and bone. A health professional can interpret it alongside other health information. These adult categories do not apply to children or teens aged 19 or younger.',
    sourceName: 'CDC adult BMI categories',
    source: medicalSource,
    reviewed: 'Sources checked on 3 October 2026.',
    noScript: 'Enable JavaScript to calculate BMI locally in your browser.',
    error: 'Check the highlighted measurements.',
    edited: 'Your measurements changed. Calculate again for a new result.',
    done: 'BMI calculated from your measurements.',
    skip: 'Skip to the BMI calculator',
    navigation: 'Choose a tool',
    footer: 'A VINASIG tool.',
    sourceLink: 'View source',
    details: 'Categories and calculation',
    scopeQuestion: 'What can BMI tell me?',
    privacyQuestion: 'What happens to my data?',
    privacyDetails:
      'This tool does not send measurements to a server, save history, set cookies or track behavior. Clear or reload the page to remove measurements. An internet connection is needed for the initial page load.',
    formula:
      'BMI = weight in kilograms ÷ height in meters squared. Results usually show two decimal places; extra digits appear near a category boundary to avoid a misleading rounded result.',
    legalDetails: '',
  },
} as const;

export const adultLabels: Record<AdultCategory, string> = {
  underweight: 'Underweight',
  healthy: 'Healthy weight',
  overweight: 'Overweight',
  class1: 'Obesity, class 1',
  class2: 'Obesity, class 2',
  class3: 'Obesity, class 3',
};
export const militaryLabels: Record<MilitaryCategory, string> = {
  below: 'BMI dưới ngưỡng tuyển quân',
  within: 'BMI trong ngưỡng tuyển quân',
  above: 'BMI trên ngưỡng tuyển quân',
};

export function fieldError(
  profile: Profile,
  field: Field,
  error: InputError,
): string {
  const name =
    profile === 'military'
      ? field === 'height'
        ? 'chiều cao'
        : 'cân nặng'
      : field;
  if (error === 'required')
    return profile === 'military' ? `Nhập ${name}.` : `Enter your ${name}.`;
  if (error === 'decimal')
    return profile === 'military'
      ? 'Dùng số dương, tối đa 3 chữ số thập phân. Không dùng đơn vị hay dấu tách hàng nghìn.'
      : 'Use a positive number with up to 3 decimal places. Omit units and thousands separators.';
  const range = field === 'height' ? '50 - 300 cm' : '1 - 1000 kg';
  return profile === 'military'
    ? `Kiểm tra đơn vị và nhập ${name} trong khoảng ${range}.`
    : `Check the unit and enter a ${name} within ${range}.`;
}
