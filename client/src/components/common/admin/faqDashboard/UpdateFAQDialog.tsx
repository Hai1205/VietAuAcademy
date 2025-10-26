import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, HelpCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EStatus } from "@/utils/types/enum";
import { FAQCategory, FAQStatus } from "./constant";
import { Textarea } from "@/components/ui/textarea";
import { EnhancedDialog } from "../EnhancedDialog";

interface UpdateFAQDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (field: keyof IFAQ, value: string) => void;
  data: IFAQ | null;
  onFAQUpdated: () => void;
}

const UpdateFAQDialog = ({
  isOpen,
  onOpenChange,
  onChange,
  data,
  onFAQUpdated,
}: UpdateFAQDialogProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await Promise.resolve(onFAQUpdated());
    } finally {
      setIsLoading(false);
    }
  };

  const footer = (
    <>
      <Button
        variant="outline"
        onClick={() => onOpenChange(false)}
        className="border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-red-900/30 dark:hover:text-red-400"
      >
        Hủy
      </Button>
      <Button
        onClick={handleUpdate}
        disabled={isLoading}
        className="bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
            Đang lưu...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Lưu
          </span>
        )}
      </Button>
    </>
  );

  return (
    <EnhancedDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Cập nhật câu hỏi thường gặp"
      description="Chỉnh sửa thông tin câu hỏi thường gặp"
      icon={HelpCircle}
      footer={footer}
      className="max-w-2xl"
    >
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="update-question" className="text-sm font-medium">
            Câu hỏi
          </Label>
          <Input
            id="update-question"
            value={data?.question || ""}
            onChange={(e) => onChange("question", e.target.value)}
            className="h-10"
            placeholder="Nhập câu hỏi"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="update-answer" className="text-sm font-medium">
            Câu trả lời
          </Label>
          <Textarea
            id="update-answer"
            value={data?.answer || ""}
            onChange={(e) => onChange("answer", e.target.value)}
            className="min-h-[120px]"
            placeholder="Nhập câu trả lời"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="update-category" className="text-sm font-medium">
              Danh mục
            </Label>
            <Select
              value={data?.category || FAQCategory[0].value}
              onValueChange={(value: string) => onChange("category", value)}
            >
              <SelectTrigger id="update-category" className="h-10">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {FAQCategory.map((item: { value: string; label: string }) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-status" className="text-sm font-medium">
              Trạng thái
            </Label>
            <Select
              value={data?.status || EStatus.ACTIVE}
              onValueChange={(value: string) => onChange("status", value)}
            >
              <SelectTrigger id="update-status" className="h-10">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                {FAQStatus.map((item: { value: string; label: string }) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </EnhancedDialog>
  );
};

export default UpdateFAQDialog;
