import type { FaqItem } from '@/types'

// TODO: xác nhận từng câu trả lời với chủ tiệm (chính sách đặt trước, huỷ lịch, thanh toán).
export const faqs: FaqItem[] = [
  {
    id: 'dat-truoc',
    question: 'Tôi nên đặt lịch trước bao lâu?',
    answer:
      'Bạn có thể đặt lịch trước tối thiểu 30 phút so với giờ muốn đến. Khung giờ cuối tuần và buổi tối thường đông nên đặt sớm hơn sẽ dễ chọn giờ và thợ.',
  },
  {
    id: 'huy-lich',
    question: 'Tôi cần đổi hoặc huỷ lịch thì làm thế nào?',
    answer:
      'Bạn chỉ cần nhắn hoặc gọi cho tiệm qua số điện thoại, Zalo ghi ở phần Liên hệ, càng sớm càng tốt để tiệm sắp xếp lại giờ cho khách khác.',
  },
  {
    id: 'thanh-toan',
    question: 'Tiệm nhận những hình thức thanh toán nào?',
    answer:
      'Bạn thanh toán trực tiếp tại tiệm sau khi hoàn thành dịch vụ, bằng tiền mặt hoặc chuyển khoản.',
  },
  {
    id: 'khach-vang-lai',
    question: 'Tiệm có nhận khách vãng lai không cần đặt lịch không?',
    answer:
      'Có. Khách ghé trực tiếp vẫn được phục vụ tuỳ theo lượng khách lúc đó. Đặt lịch trước giúp bạn không phải chờ.',
  },
  {
    id: 'gio-mo-cua',
    question: 'Tiệm mở cửa lúc mấy giờ?',
    answer: 'Tiệm mở cửa từ 8:30 đến 19:30 mỗi ngày.',
  },
  {
    id: 'bao-lau',
    question: 'Một lần cắt tóc mất bao lâu?',
    answer:
      'Cắt tóc thường mất khoảng 30 phút. Thời lượng từng dịch vụ được hiển thị ở mục Dịch vụ và tự cộng dồn khi bạn chọn nhiều dịch vụ trong form đặt lịch.',
  },
]
