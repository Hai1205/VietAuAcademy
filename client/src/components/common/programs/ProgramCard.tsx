"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProgramCardProps {
  program: IProgram;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 flex flex-col bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="relative">
        <Image
          src={program?.imageUrl}
          width={400}
          height={300}
          alt={program.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {program.featured && (
          <div className="absolute top-4 right-4 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
            Nổi bật
          </div>
        )}
      </div>

      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
          <MapPin className="w-4 h-4 text-secondary" />
          <span className="text-secondary">{program.country}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {program.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
          {program.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-3 flex-grow">
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            Thời gian: {program.duration}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <DollarSign className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            Học phí: {program.tuition}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {program.benefits.map((benefit, index) => (
            <span
              key={`${program._id}-benefit-${index}`}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 dark:bg-primary/20 text-primary"
            >
              <Award className="w-3 h-3 mr-1" />
              {benefit}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Link href={`/programs/${program._id}`} className="w-full">
          <Button className="w-full bg-secondary hover:bg-secondary/90">
            Xem chi tiết
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
