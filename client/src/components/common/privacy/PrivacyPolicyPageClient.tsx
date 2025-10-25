"use client";

import React from "react";
import { COMPANY, EMAIL, PHONE } from "@/utils/services/constants";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPolicyPageClient() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Chính Sách Bảo Mật
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Cam kết bảo vệ thông tin cá nhân và quyền riêng tư của khách hàng
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 lg:p-10 max-w-4xl mx-auto">
          <div className="prose dark:prose-invert max-w-none">
            <div className="mb-10">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="flex items-center text-primary mb-6"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại trang chủ
                </Button>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Cập nhật lần cuối: Ngày 24 tháng 9 năm 2025
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. Giới thiệu
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {`Công ty TNHH Giáo Dục Quốc Tế ${COMPANY} (sau đây gọi là "${COMPANY}", "chúng tôi", hoặc "của chúng tôi") cam kết bảo vệ quyền riêng tư của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, chia sẻ và bảo vệ thông tin cá nhân của bạn khi bạn truy cập trang web của chúng tôi, đăng ký các dịch vụ hoặc tương tác với chúng tôi.`}
                sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng,
                chia sẻ và bảo vệ thông tin cá nhân của bạn khi bạn truy cập
                trang web của chúng tôi, đăng ký các dịch vụ hoặc tương tác với
                chúng tôi.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý với các điều
                khoản trong chính sách bảo mật này. Nếu bạn không đồng ý với
                chính sách này, vui lòng không sử dụng dịch vụ của chúng tôi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. Thông tin chúng tôi thu thập
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Chúng tôi có thể thu thập các loại thông tin sau:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Thông tin cá nhân:</strong> Họ tên, địa chỉ email, số
                  điện thoại, địa chỉ, thông tin học vấn và nghề nghiệp.
                </li>
                <li>
                  <strong>Hồ sơ học tập:</strong> Bảng điểm, chứng chỉ, bằng cấp
                  và các thông tin liên quan đến quá trình học tập.
                </li>
                <li>
                  <strong>Thông tin tài liệu:</strong> Hộ chiếu, CMND/CCCD, giấy
                  khai sinh và các giấy tờ cần thiết khác cho quá trình làm hồ
                  sơ du học.
                </li>
                <li>
                  <strong>Dữ liệu kỹ thuật:</strong> Địa chỉ IP, loại trình
                  duyệt, thiết bị, thời gian truy cập và các dữ liệu tương tự
                  khi bạn truy cập trang web của chúng tôi.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. Mục đích sử dụng thông tin
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Chúng tôi sử dụng thông tin của bạn cho các mục đích sau:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  Cung cấp dịch vụ tư vấn du học phù hợp với nhu cầu của bạn
                </li>
                <li>Hỗ trợ trong quá trình làm hồ sơ xin học bổng và visa</li>
                <li>Liên hệ và gửi thông báo về tình trạng hồ sơ của bạn</li>
                <li>Cải thiện dịch vụ và trải nghiệm người dùng</li>
                <li>
                  Gửi thông tin về các chương trình học, học bổng và sự kiện mới
                </li>
                <li>Tuân thủ các yêu cầu pháp lý và quy định</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. Chia sẻ thông tin
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Chúng tôi có thể chia sẻ thông tin của bạn trong các trường hợp
                sau:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Với các trường học và đối tác:</strong> Để xử lý đơn
                  đăng ký và hỗ trợ quá trình tuyển sinh.
                </li>
                <li>
                  <strong>Với các cơ quan chính phủ:</strong> Để xử lý visa và
                  tuân thủ các yêu cầu pháp lý của nước sở tại và nước đến.
                </li>
                <li>
                  <strong>Với nhà cung cấp dịch vụ:</strong> Chúng tôi làm việc
                  với các nhà cung cấp dịch vụ để hỗ trợ hoạt động kinh doanh
                  của mình (như dịch vụ email marketing, phân tích dữ liệu).
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                Chúng tôi sẽ không bán, cho thuê hoặc trao đổi thông tin cá nhân
                của bạn với bất kỳ bên thứ ba nào cho mục đích tiếp thị mà không
                có sự đồng ý rõ ràng từ bạn.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                5. Bảo mật dữ liệu
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Chúng tôi thực hiện các biện pháp bảo mật phù hợp để bảo vệ
                thông tin cá nhân của bạn khỏi việc truy cập trái phép, tiết lộ,
                thay đổi và phá hủy. Các biện pháp này bao gồm:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Mã hóa dữ liệu nhạy cảm</li>
                <li>Sử dụng kết nối HTTPS an toàn</li>
                <li>Hạn chế quyền truy cập vào thông tin cá nhân</li>
                <li>Đào tạo nhân viên về các quy trình bảo mật</li>
                <li>Thường xuyên rà soát và cập nhật các biện pháp bảo mật</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                6. Quyền của bạn
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Bạn có các quyền sau đây liên quan đến dữ liệu cá nhân của mình:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Quyền truy cập và nhận bản sao dữ liệu cá nhân của bạn</li>
                <li>
                  Quyền yêu cầu sửa đổi hoặc cập nhật dữ liệu không chính xác
                </li>
                <li>
                  Quyền yêu cầu xóa dữ liệu cá nhân (trong một số trường hợp)
                </li>
                <li>Quyền phản đối hoặc hạn chế việc xử lý dữ liệu của bạn</li>
                <li>Quyền rút lại sự đồng ý</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi theo
                thông tin trong mục &ldquo;Liên hệ&rdquo; bên dưới.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                7. Lưu trữ dữ liệu
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Chúng tôi lưu trữ dữ liệu cá nhân của bạn trong thời gian cần
                thiết để thực hiện các mục đích được nêu trong chính sách này,
                trừ khi pháp luật yêu cầu hoặc cho phép thời gian lưu trữ lâu
                hơn. Sau khi không còn cần thiết, chúng tôi sẽ xóa dữ liệu của
                bạn một cách an toàn.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                8. Cookies và công nghệ tương tự
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Trang web của chúng tôi sử dụng cookies và các công nghệ tương
                tự để nâng cao trải nghiệm người dùng, phân tích xu hướng và
                quản lý trang web. Bạn có thể kiểm soát việc sử dụng cookies
                thông qua cài đặt trình duyệt của mình.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                9. Thay đổi về chính sách bảo mật
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian
                để phản ánh những thay đổi trong hoạt động của chúng tôi hoặc do
                yêu cầu pháp lý. Phiên bản mới nhất sẽ luôn được đăng trên trang
                web của chúng tôi với ngày cập nhật.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Chúng tôi khuyến khích bạn định kỳ xem lại chính sách này để
                biết cách chúng tôi bảo vệ thông tin của bạn.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                10. Liên hệ
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Nếu bạn có bất kỳ câu hỏi hoặc quan ngại nào về chính sách bảo
                mật này hoặc việc xử lý dữ liệu cá nhân của bạn, vui lòng liên
                hệ với chúng tôi theo:
              </p>
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="mb-2 text-gray-800 dark:text-gray-200">
                  <strong>Công ty TNHH Giáo Dục Quốc Tế {COMPANY}</strong>
                </p>
                <p className="mb-2 text-gray-700 dark:text-gray-300">
                  Địa chỉ: Tầng 1, Trường đại học Sài Gòn, 273 An Dương Vương,
                  Q.5, TP.HCM
                </p>
                <p className="mb-2 text-gray-700 dark:text-gray-300">
                  Email: {EMAIL}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Hotline: {PHONE}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
