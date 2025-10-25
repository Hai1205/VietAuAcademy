"use client";

import React, { useEffect, useState } from "react";
import FAQContent from "@/components/common/faq/FAQContent";
import { useFAQStore } from "@/utils/stores/faqStore";

const categories = [
  "Tất cả",
  "Hồ sơ du học",
  "Chi phí",
  "Visa",
  "Ngôn ngữ",
  "Định cư",
  "Dịch vụ",
];

export default function FAQPageContent() {
  const { getFAQsByStatus } = useFAQStore();
  const [faqs, setFaqs] = useState<IFAQ[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch only active FAQs by default
      const response = await getFAQsByStatus("active");
      const data = response.data?.FAQs;
      setFaqs(data || []);
    };

    fetchData();
  }, [getFAQsByStatus]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Hỏi & Đáp Du Học
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Tìm câu trả lời cho mọi thắc mắc về du học và xuất khẩu lao động
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <FAQContent initialFAQs={faqs} categories={categories} />
    </div>
  );
}
