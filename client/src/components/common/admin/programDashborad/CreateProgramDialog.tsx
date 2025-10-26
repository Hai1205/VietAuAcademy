"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
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
import { Save, Image as ImageIcon, Plus, X, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { EnhancedDialog } from "../EnhancedDialog";
import { programFeatured, programStatus } from "./constant";

interface CreateProgramDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (
    field: keyof IProgram,
    value: string | string[] | boolean | File | null
  ) => void;
  data: IProgram | null;
  onProgramCreated: () => void;
  isLoading?: boolean;
}

const CreateProgramDialog = ({
  isOpen,
  onOpenChange,
  onChange,
  data,
  onProgramCreated,
}: CreateProgramDialogProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requirementInput, setRequirementInput] = useState<string>("");
  const [benefitInput, setBenefitInput] = useState<string>("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      onChange("image", file);

      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (data?.imageUrl) {
      setPreviewImage(data?.imageUrl);
    } else {
      setPreviewImage(null);
    }

    // parse comma separated requirements/benefits into arrays
    const parseField = (field: string | string[] | undefined) => {
      if (!field) return [] as string[];
      if (Array.isArray(field)) return field as string[];
      // try parse JSON array
      try {
        const parsed = JSON.parse(field as string);
        if (Array.isArray(parsed))
          return parsed.map((s) => String(s).trim()).filter(Boolean);
      } catch {
        // fallback to comma-split
      }
      return (field as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    };

    const reqs = parseField(data?.requirements);
    const bens = parseField(data?.benefits);
    setRequirements(reqs);
    setBenefits(bens);
  }, [data?.imageUrl, data?.requirements, data?.benefits]);

  const handleCreate = async () => {
    setIsLoading(true);
    onProgramCreated();
    setIsLoading(false);
  };

  // Requirements handlers
  const addRequirement = () => {
    const v = requirementInput.trim();
    if (!v) return;
    const next = [...requirements, v];
    setRequirements(next);
    onChange("requirements", next);
    setRequirementInput("");
  };

  const removeRequirement = (index: number) => {
    const next = requirements.filter((_, i) => i !== index);
    setRequirements(next);
    onChange("requirements", next);
  };

  const handleReqKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addRequirement();
    }
  };

  // Benefits handlers
  const addBenefit = () => {
    const v = benefitInput.trim();
    if (!v) return;
    const next = [...benefits, v];
    setBenefits(next);
    onChange("benefits", next);
    setBenefitInput("");
  };

  const removeBenefit = (index: number) => {
    const next = benefits.filter((_, i) => i !== index);
    setBenefits(next);
    onChange("benefits", next);
  };

  const handleBenKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addBenefit();
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
        onClick={handleCreate}
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
      title="Tạo chương trình"
      description="Thêm một chương trình học mới vào hệ thống"
      icon={BookOpen}
      footer={footer}
      className="max-w-2xl"
    >
      <ScrollArea className="h-[60vh] pr-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="create-title" className="text-sm font-medium">
              Chương trình
            </Label>
            <Input
              id="create-title"
              value={data?.title || ""}
              onChange={(e) => onChange("title", e.target.value)}
              className="h-10"
              placeholder="Nhập tên chương trình"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-description" className="text-sm font-medium">
              Mô tả
            </Label>
            <Textarea
              id="create-description"
              value={data?.description || ""}
              onChange={(e) => onChange("description", e.target.value)}
              className="min-h-[80px]"
              placeholder="Nhập mô tả chương trình"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="create-country" className="text-sm font-medium">
                Quốc gia
              </Label>
              <Input
                id="create-country"
                value={data?.country || ""}
                onChange={(e) => onChange("country", e.target.value)}
                className="h-10"
                placeholder="Nhập quốc gia"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="create-duration" className="text-sm font-medium">
                Thời gian
              </Label>
              <Input
                id="create-duration"
                value={data?.duration || ""}
                onChange={(e) => onChange("duration", e.target.value)}
                className="h-10"
                placeholder="Nhập thời gian học"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-tuition" className="text-sm font-medium">
              Học phí
            </Label>
            <Input
              id="create-tuition"
              value={data?.tuition || ""}
              onChange={(e) => onChange("tuition", e.target.value)}
              className="h-10"
              placeholder="Nhập học phí"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="create-opportunities"
              className="text-sm font-medium"
            >
              Cơ hội
            </Label>
            <Textarea
              id="create-opportunities"
              value={data?.opportunities || ""}
              onChange={(e) => onChange("opportunities", e.target.value)}
              className="min-h-[80px]"
              placeholder="Nhập cơ hội sau khi hoàn thành"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-about" className="text-sm font-medium">
              Giới thiệu
            </Label>
            <Textarea
              id="create-about"
              value={data?.about || ""}
              onChange={(e) => onChange("about", e.target.value)}
              className="min-h-[80px]"
              placeholder="Nhập giới thiệu về chương trình"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-image" className="text-sm font-medium">
              Hình ảnh
            </Label>
            <div className="flex flex-col gap-2">
              <input
                type="file"
                id="create-image"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleButtonClick}
                className="flex items-center gap-2 h-10"
              >
                <ImageIcon className="h-4 w-4" />
                {data?.imageUrl ? "Thay đổi hình ảnh" : "Tải lên hình ảnh"}
              </Button>
              {previewImage && (
                <div className="relative mt-2 h-40 w-full overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                  <Image
                    src={previewImage}
                    alt="Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    style={{ objectFit: "cover" }}
                    className="rounded-md"
                    priority
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="create-requirements"
              className="text-sm font-medium"
            >
              Yêu cầu
            </Label>
            <div className="flex gap-2">
              <Input
                id="create-requirements"
                value={requirementInput}
                onChange={(e) => setRequirementInput(e.target.value)}
                onKeyDown={handleReqKey}
                placeholder="Nhập yêu cầu và nhấn Enter hoặc nhấn Thêm"
                className="h-10"
              />
              <Button
                onClick={addRequirement}
                size="sm"
                className="bg-primary text-primary-foreground shadow-md hover:shadow-lg transform hover:-translate-y-[1px] transition-all"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {requirements.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {requirements.map((req, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="gap-2 px-3 py-1.5 text-sm"
                  >
                    {req}
                    <button
                      onClick={() => removeRequirement(index)}
                      className="ml-2 hover:text-destructive"
                      aria-label={`Remove requirement ${req}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground text-sm mt-2">
                Chưa có yêu cầu nào được thêm.
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-benefits" className="text-sm font-medium">
              Lợi ích
            </Label>
            <div className="flex gap-2">
              <Input
                id="create-benefits"
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                onKeyDown={handleBenKey}
                placeholder="Nhập lợi ích và nhấn Enter hoặc nhấn Thêm"
                className="h-10"
              />
              <Button
                onClick={addBenefit}
                size="sm"
                className="bg-primary text-primary-foreground shadow-md hover:shadow-lg transform hover:-translate-y-[1px] transition-all"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {benefits.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {benefits.map((ben, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="gap-2 px-3 py-1.5 text-sm"
                  >
                    {ben}
                    <button
                      onClick={() => removeBenefit(index)}
                      className="ml-2 hover:text-destructive"
                      aria-label={`Remove benefit ${ben}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground text-sm mt-2">
                Chưa có lợi ích nào được thêm.
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="create-featured" className="text-sm font-medium">
                Nổi bật
              </Label>
              <Select
                value={data?.featured ? "true" : "false"}
                onValueChange={(value) =>
                  onChange("featured", value === "true")
                }
              >
                <SelectTrigger id="create-featured" className="h-10">
                  <SelectValue placeholder="Chọn trạng thái nổi bật" />
                </SelectTrigger>
                <SelectContent>
                  {programFeatured.map((item) => (
                    <SelectItem key={item.label} value={`${item.value}`}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="create-status" className="text-sm font-medium">
                Trạng thái
              </Label>
              <Select
                value={data?.status ? data.status : programStatus[0].value}
                onValueChange={(value) => onChange("status", value)}
              >
                <SelectTrigger id="create-status" className="h-10">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {programStatus.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </ScrollArea>
    </EnhancedDialog>
  );
};

export default CreateProgramDialog;
