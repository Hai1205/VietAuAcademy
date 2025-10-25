import React from "react";
import { COMPANY, DESCRIPTION } from "@/utils/services/constants";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { ADDRESS, EMAIL, PHONE } from "@/utils/services/constants";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-white transition-colors shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src={"/images/logo1.png"}
                alt={`Japan flag`}
                width={40}
                height={30}
                className="object-contain"
              />
              <div>
                <h3 className="text-xl font-bold text-secondary">{COMPANY}</h3>
                <p className="text-sm text-primary-500">{DESCRIPTION}</p>
              </div>
            </div>
            <p className="text-primary-500 mb-4">
              Kết nối giáo dục & nâng tầm cuộc sống. Chúng tôi mang đến cơ hội
              du học chất lượng cao tại các nước phát triển.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary">
              Liên kết nhanh
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/programs"
                  className="text-primary-500 hover:text-primary-700 transition-colors"
                >
                  Chương trình du học
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-primary-500 hover:text-primary-700 transition-colors"
                >
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-primary-500 hover:text-primary-700 transition-colors"
                >
                  Liên hệ tư vấn
                </Link>
              </li>
            </ul>
          </div>

          {/* Study Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary">
              Chương trình
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/programs?country=Hàn Quốc"
                  className="text-primary-500 hover:text-primary-700 transition-colors"
                >
                  Du học Hàn Quốc
                </Link>
              </li>
              <li>
                <Link
                  href="/programs?country=Nhật Bản"
                  className="text-primary-500 hover:text-primary-700 transition-colors"
                >
                  Du học Nhật Bản
                </Link>
              </li>
              <li>
                <Link
                  href="/programs?country=Đài Loan"
                  className="text-primary-500 hover:text-primary-700 transition-colors"
                >
                  Du học Đài Loan
                </Link>
              </li>
              <li>
                <Link
                  href="/programs?country=Đức"
                  className="text-primary-500 hover:text-primary-700 transition-colors"
                >
                  Du học Đức
                </Link>
              </li>
              <li>
                <Link
                  href="/programs?country=Úc"
                  className="text-primary-500 hover:text-primary-700 transition-colors"
                >
                  Du học Úc
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary">
              Thông tin liên hệ
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-secondary" />
                <span className="text-primary-500 hover:text-primary-700">
                  {PHONE}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-secondary" />
                <span className="text-primary-500 hover:text-primary-700">
                  {EMAIL}
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-secondary mt-1" />
                <span className="text-primary-500 hover:text-primary-700">
                  {ADDRESS}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-500 hover:text-primary-700 text-sm">
              © 2025 {DESCRIPTION} {COMPANY}. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-primary-500 hover:text-primary-700 text-sm transition-colors"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="/terms"
                className="text-primary-500 hover:text-primary-700 text-sm transition-colors"
              >
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
