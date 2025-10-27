import { Image as ImageIcon, Save, Briefcase, X, Plus } from "lucide-react";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { EnhancedDialog } from "../EnhancedDialog";
import { Badge } from "@/components/ui/badge";
import { jobFeatured, jobStatus } from "./constant";

interface CreateJobDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (
    field: keyof IJob,
    value: string | string[] | number | boolean | File | null
  ) => void;
  onJobCreated: () => void;
  data: IJob | null;
}

const CreateJobDialog = ({
  isOpen,
  onOpenChange,
  onChange,
  onJobCreated,
  data,
}: CreateJobDialogProps) => {
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

      // Tạo URL để xem trước hình ảnh
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    await Promise.resolve(onJobCreated());
    setIsLoading(false);
  };

  // Reset local inputs when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setRequirementInput("");
      setBenefitInput("");
      setRequirements([]);
      setBenefits([]);

      // reset preview image to original data image (if any) or null
      // avoid using `any` — access imageUrl defensively
      const imageUrl =
        data && (data as unknown as { imageUrl?: string }).imageUrl;
      if (imageUrl) {
        setPreviewImage(imageUrl);
      } else {
        setPreviewImage(null);
      }

      if (!data) {
        try {
          onChange("requirements", []);
          onChange("benefits", []);
          onChange("image", null);
        } catch {
          // silent - parent may not accept these resets
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

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
            Đang tạo...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Tạo
          </span>
        )}
      </Button>
    </>
  );

  return (
    <EnhancedDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Tạo công việc"
      description="Thêm một công việc mới vào hệ thống"
      icon={Briefcase}
      footer={footer}
      className="max-w-2xl"
    >
      <ScrollArea className="h-[60vh] pr-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="create-title" className="text-sm font-medium">
              Công việc
            </Label>
            <Input
              id="create-title"
              value={data?.title}
              onChange={(e) => onChange("title", e.target.value)}
              className="h-10"
              placeholder="Nhập tên công việc"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-country" className="text-sm font-medium">
              Quốc gia
            </Label>
            <Input
              id="create-country"
              value={data?.country}
              onChange={(e) => onChange("country", e.target.value)}
              className="h-10"
              placeholder="Nhập quốc gia"
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
                Đăng tải hình ảnh lên
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
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="create-positions" className="text-sm font-medium">
                Số lượng
              </Label>
              <Input
                id="create-positions"
                value={data?.positions}
                onChange={(e) => onChange("positions", e.target.value)}
                className="h-10"
                placeholder="Nhập số lượng"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="create-location" className="text-sm font-medium">
                Địa điểm
              </Label>
              <Input
                id="create-location"
                value={data?.location}
                onChange={(e) => onChange("location", e.target.value)}
                className="h-10"
                placeholder="Nhập địa điểm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="create-salary" className="text-sm font-medium">
                Mức lương
              </Label>
              <Input
                id="create-salary"
                value={data?.salary}
                onChange={(e) => onChange("salary", e.target.value)}
                className="h-10"
                placeholder="Nhập mức lương"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="create-application-deadline"
                className="text-sm font-medium"
              >
                Hạn nộp đơn
              </Label>
              <Input
                id="create-application-deadline"
                value={data?.applicationDeadline}
                onChange={(e) =>
                  onChange("applicationDeadline", e.target.value)
                }
                className="h-10"
                placeholder="Nhập hạn nộp đơn"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="create-estimated-departure"
                className="text-sm font-medium"
              >
                Dự kiến khởi hành
              </Label>
              <Input
                id="create-estimated-departure"
                value={data?.estimatedDeparture}
                onChange={(e) => onChange("estimatedDeparture", e.target.value)}
                className="h-10"
                placeholder="Nhập ngày khởi hành"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="create-workType" className="text-sm font-medium">
                Loại công việc
              </Label>
              <Input
                id="create-workType"
                value={data?.workType}
                onChange={(e) => onChange("workType", e.target.value)}
                className="h-10"
                placeholder="Nhập loại công việc"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="create-workingHours"
                className="text-sm font-medium"
              >
                Giờ làm việc
              </Label>
              <Input
                id="create-workingHours"
                value={data?.workingHours}
                onChange={(e) => onChange("workingHours", e.target.value)}
                className="h-10"
                placeholder="Nhập giờ làm việc"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="create-overtime" className="text-sm font-medium">
                Giờ làm thêm
              </Label>
              <Input
                id="create-overtime"
                value={data?.overtime}
                onChange={(e) => onChange("overtime", e.target.value)}
                className="h-10"
                placeholder="Nhập giờ làm thêm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="create-accommodation"
                className="text-sm font-medium"
              >
                Chỗ ở
              </Label>
              <Input
                id="create-accommodation"
                value={data?.accommodation}
                onChange={(e) => onChange("accommodation", e.target.value)}
                className="h-10"
                placeholder="Nhập thông tin chỗ ở"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="create-training-period"
                className="text-sm font-medium"
              >
                Thời gian đào tạo
              </Label>
              <Input
                id="create-training-period"
                value={data?.trainingPeriod}
                onChange={(e) => onChange("trainingPeriod", e.target.value)}
                className="h-10"
                placeholder="Nhập thời gian đào tạo"
              />
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

          <div className="space-y-2">
            <Label
              htmlFor="create-work-environment"
              className="text-sm font-medium"
            >
              Môi trường làm việc
            </Label>
            <Input
              id="create-work-environment"
              value={data?.workEnvironment}
              onChange={(e) => onChange("workEnvironment", e.target.value)}
              className="h-10"
              placeholder="Nhập mô tả môi trường làm việc"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-company" className="text-sm font-medium">
              Công ty
            </Label>
            <Input
              id="create-company"
              value={data?.company}
              onChange={(e) => onChange("company", e.target.value)}
              className="h-10"
              placeholder="Nhập tên công ty"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-description" className="text-sm font-medium">
              Mô tả
            </Label>
            <Textarea
              id="create-description"
              value={data?.description}
              onChange={(e) => onChange("description", e.target.value)}
              className="min-h-[100px]"
              placeholder="Nhập mô tả công việc"
            />
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
                  {jobFeatured.map((item) => (
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
                value={data?.status ? data.status : jobStatus[0].value}
                onValueChange={(value) => onChange("status", value)}
              >
                <SelectTrigger id="create-status" className="h-10">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {jobStatus.map((item) => (
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

export default CreateJobDialog;
