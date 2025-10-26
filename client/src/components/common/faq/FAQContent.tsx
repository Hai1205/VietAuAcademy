"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

interface FAQContentProps {
  initialFAQs: IFaq[];
  categories: string[];
}

export default function FAQContent({
  initialFAQs,
  categories,
}: FAQContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const filteredFAQs = initialFAQs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tất cả" || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <>
      {/* Search Section */}
      <section className="py-8 bg-white dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-lg focus:ring-2 focus:ring-primary/50 focus:outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Category Filter */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Danh Mục <span className="text-primary">Câu Hỏi</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                      selectedCategory === category
                        ? "bg-primary text-white shadow-lg"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary border border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center mb-8">
              <p className="text-gray-600 dark:text-gray-300">
                Tìm thấy{" "}
                <span className="font-bold text-primary">
                  {filteredFAQs.length}
                </span>{" "}
                câu hỏi
              </p>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq._id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleFAQ(faq._id)}
                    className="w-full px-6 py-6 text-left focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-2xl"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {faq.question}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium mr-3">
                            {faq.category}
                          </span>
                          <span>{faq.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {openFAQ === faq._id ? (
                          <ChevronUp className="w-5 h-5 text-primary" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>

                  {openFAQ === faq._id && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Không tìm thấy câu hỏi nào
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Hãy thử thay đổi từ khóa tìm kiếm hoặc danh mục
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
