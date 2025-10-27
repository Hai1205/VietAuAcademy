"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";
import { FAQCategory, FAQStatus } from "./constant";
import { EStatus } from "@/utils/types/enum";

export type ExtendedFaqData = Omit<IFaq, "status"> & {
  status: EStatus;
};

interface FaqFormProps {
  data: ExtendedFaqData | null;
  onChange: (field: keyof ExtendedFaqData, value: string) => void;
  onSubmit: () => Promise<void> | void;
  onCancel: () => void;
}

const FaqForm: React.FC<FaqFormProps> = ({
  data,
  onChange,
  onSubmit,
  onCancel,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /** Submit handler */
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await Promise.resolve(onSubmit());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollArea className="h-[40vh] pr-4">
      <div className="space-y-4">
        {/* Question */}
        <div className="space-y-2">
          <Label htmlFor="form-question" className="text-sm font-medium">
            Câu hỏi
          </Label>
          <Input
            id="form-question"
            value={data?.question || ""}
            onChange={(e) => onChange("question", e.target.value)}
            className="h-10"
            placeholder="Nhập câu hỏi"
          />
        </div>

        {/* Answer */}
        <div className="space-y-2">
          <Label htmlFor="form-answer" className="text-sm font-medium">
            Câu trả lời
          </Label>
          <Textarea
            id="form-answer"
            value={data?.answer || ""}
            onChange={(e) => onChange("answer", e.target.value)}
            className="min-h-[120px]"
            placeholder="Nhập câu trả lời"
          />
        </div>

        {/* Category + Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="form-category" className="text-sm font-medium">
              Danh mục
            </Label>
            <Select
              value={data?.category}
              onValueChange={(value) => onChange("category", value)}
            >
              <SelectTrigger id="form-category" className="h-10">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {FAQCategory.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="form-status" className="text-sm font-medium">
              Trạng thái
            </Label>
            <Select
              value={data?.status || EStatus.PUBLIC}
              onValueChange={(value) => onChange("status", value as EStatus)}
            >
              <SelectTrigger id="form-status" className="h-10">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                {FAQStatus.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-red-900/30 dark:hover:text-red-400"
          >
            Hủy
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Đang lưu...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Lưu
              </span>
            )}
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};

export default FaqForm;
