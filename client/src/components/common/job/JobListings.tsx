import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, DollarSign, Calendar, Clock } from "lucide-react";
import { stringToList } from "@/lib/utils";

interface JobListingsProps {
  filteredJobs: IJob[];
}

// Helper function to convert string or array to array
const getBenefitsArray = (
  benefits: string | string[] | undefined
): string[] => {
  if (!benefits) return [];
  if (Array.isArray(benefits)) return benefits;
  return stringToList(benefits);
};

export default function JobListings({ filteredJobs }: JobListingsProps) {
  return (
    <div className="container mx-auto px-4 mb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div className="relative h-48">
              <Image
                src={job.imageUrl ?? "/images/default-job.png"}
                alt={job.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                {job.country}
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">
                {job.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {job.company}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                  <MapPin className="w-4 h-4 text-primary mr-2" />
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                  <DollarSign className="w-4 h-4 text-primary mr-2" />
                  <span>{job.salary}</span>
                </div>

                <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                  <Calendar className="w-4 h-4 text-primary mr-2" />
                  <span>Hạn: {job.applicationDeadline}</span>
                </div>

                {job.workType && (
                  <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                    <Clock className="w-4 h-4 text-primary mr-2" />
                    <span>{job.workType}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mb-4">
                {getBenefitsArray(job?.benefits).map((benefit, index) => (
                  <span
                    key={index}
                    className="inline-block bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary text-xs px-2 py-1 rounded-full"
                  >
                    {benefit}
                  </span>
                ))}
              </div>

              <Link
                href={`/jobs/${job._id}`}
                className="block w-full bg-primary hover:bg-primary/90 text-white text-center py-3 rounded-lg font-medium transition-colors duration-300"
              >
                Ứng Tuyển Ngay
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Không tìm thấy việc làm phù hợp
          </p>
          <p className="text-gray-400 dark:text-gray-500">
            Hãy thử thay đổi bộ lọc tìm kiếm
          </p>
        </div>
      )}
    </div>
  );
}
