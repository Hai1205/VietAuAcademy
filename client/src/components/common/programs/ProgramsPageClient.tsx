"use client";

import React, { useState, useEffect } from "react";
import { Suspense } from "react";
import ProgramCard from "@/components/common/programs/ProgramCard";
import ProgramFilters from "@/components/common/programs/ProgramFilters";
import { useProgramStore } from "@/utils/stores/programStore";

const countries = [
  { value: "", label: "Tất cả quốc gia" },
  { value: "Hàn Quốc", label: "Hàn Quốc" },
  { value: "Nhật Bản", label: "Nhật Bản" },
  { value: "Đài Loan", label: "Đài Loan" },
  { value: "Đức", label: "Đức" },
  { value: "Úc", label: "Úc" },
  { value: "Mỹ", label: "Mỹ" },
];

const tuitionRanges = [
  { value: "", label: "Tất cả mức học phí" },
  { value: "0-10000", label: "Dưới 10,000 USD" },
  { value: "10000-20000", label: "10,000 - 20,000 USD" },
  { value: "20000-30000", label: "20,000 - 30,000 USD" },
  { value: "30000+", label: "Trên 30,000 USD" },
];

export default function ProgramsPageClient({
  initialCountry = "",
}: {
  initialCountry?: string;
}) {
  const { getPublicPrograms } = useProgramStore();
  const [programs, setPrograms] = useState<IProgram[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPublicPrograms();
      const data = response.data?.programs;
      setPrograms(data || []);
    };

    fetchData();
  }, [getPublicPrograms]);

  return (
    <>
      {/* Featured Programs Preview - SSR for SEO */}
      <section className="py-8 bg-white dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Chương trình nổi bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs
              .filter((p) => p.featured)
              .slice(0, 3)
              .map((program) => (
                <ProgramCard key={program._id} program={program} />
              ))}
          </div>
        </div>
      </section>

      {/* Client-side Interactive Filters and Programs List */}
      <Suspense
        fallback={
          <div className="py-12">
            <div className="container mx-auto px-4">
              <div className="animate-pulse space-y-4">
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-80 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      >
        <ProgramFilters
          initialPrograms={programs}
          countries={countries}
          tuitionRanges={tuitionRanges}
          initialCountry={initialCountry}
        />
      </Suspense>
    </>
  );
}
