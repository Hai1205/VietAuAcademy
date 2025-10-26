"use client";

import React, { useEffect, useRef, useState } from "react";
import { useJobStore } from "@/utils/stores/jobStore";
import FeaturedJobs from "@/components/common/job/FeaturedJobs";
import SearchFilter from "@/components/common/job/SearchFilter";
import JobListings from "@/components/common/job/JobListings";
import ContactInfoSection from "@/components/common/about/ContactInfoSection";
import { useInView } from "framer-motion";

export default function JobsPageClient() {
  const { getPublicJobs } = useJobStore();

  const [jobs, setJobs] = useState<IJob[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("Tất cả");
  const [selectedWorkType, setSelectedWorkType] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");

  const contactInfoRef = useRef<HTMLDivElement>(null);
  const contactInfoInView = useInView(contactInfoRef, { amount: 0.3 });
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPublicJobs();
      const data = response.data?.jobs;
      setJobs(data || []);
    };

    fetchData();
  }, [getPublicJobs]);

  const filteredJobs = jobs.filter((job) => {
    const matchesCountry =
      selectedCountry === "Tất cả" || job.country === selectedCountry;
    const matchesWorkType =
      selectedWorkType === "Tất cả" || job.workType === selectedWorkType;
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job?.company?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCountry && matchesWorkType && matchesSearch;
  });

  const featuredJobs = jobs.filter((job) => job.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Featured Jobs Section */}
      <FeaturedJobs featuredJobs={featuredJobs} />

      {/* Search and Filter Section */}
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedWorkType={selectedWorkType}
        setSelectedWorkType={setSelectedWorkType}
        filteredJobsCount={filteredJobs.length}
      />

      {/* Job Listings */}
      <JobListings filteredJobs={filteredJobs} />

      {/* Contact Section */}
      <ContactInfoSection
        contactInfoRef={contactInfoRef}
        contactInfoInView={contactInfoInView}
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />
    </div>
  );
}
