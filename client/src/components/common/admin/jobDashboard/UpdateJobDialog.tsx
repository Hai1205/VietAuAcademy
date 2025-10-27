import { useState, useRef, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Save, Briefcase, X, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { EnhancedDialog } from "../EnhancedDialog";
import { Badge } from "@/components/ui/badge";
import { jobFeatured, jobStatus } from "./constant";

interface UpdateJobDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (
    field: keyof IJob,
    value: string | string[] | number | boolean | File | null
  ) => void;
  data: IJob | null;
  onJobUpdated: () => void;
}

const UpdateJobDialog = ({
  isOpen,
  onOpenChange,
  onChange,
  data,
  onJobUpdated,
}: UpdateJobDialogProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requirementInput, setRequirementInput] = useState<string>("");
  const [benefitInput, setBenefitInput] = useState<string>("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setRequirements(data.requirements || []);
      setBenefits(data.benefits || []);
    }
  }, [data]);

  useEffect(() => {
    if (data?.imageUrl) {
      setPreviewImage(data.imageUrl);
    } else {
      setPreviewImage(null);
    }
  }, [data?.imageUrl, isOpen]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      onChange("image", file);

      // Tạo URL để xem trước hình ảnh mới
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    await Promise.resolve(onJobUpdated());
    setIsLoading(false);
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
      title="Chỉnh sửa công việc"
      description="Cập nhật thông tin công việc"
      icon={Briefcase}
      footer={footer}
      className="max-w-2xl"
    >
      <ScrollArea className="h-[60vh] pr-4">
        {data && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="update-title" className="text-sm font-medium">
                Công việc
              </Label>
              <Input
                id="update-title"
                value={data?.title || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange("title", e.target.value)
                }
                className="h-10"
                placeholder="Nhập tên công việc"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="update-country" className="text-sm font-medium">
                Quốc gia
              </Label>
              <Input
                id="update-country"
                value={data?.country || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange("country", e.target.value)
                }
                className="h-10"
                placeholder="Nhập quốc gia"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="update-image" className="text-sm font-medium">
                Hình ảnh
              </Label>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  id="update-image"
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
                      alt="Job Preview"
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
                <Label
                  htmlFor="update-positions"
                  className="text-sm font-medium"
                >
                  Số lượng
                </Label>
                <Input
                  id="update-positions"
                  type="number"
                  value={data?.positions || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange("positions", parseInt(e.target.value) || 0)
                  }
                  className="h-10"
                  placeholder="Nhập số lượng"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="update-location"
                  className="text-sm font-medium"
                >
                  Địa điểm
                </Label>
                <Input
                  id="update-location"
                  value={data?.location}
                  onChange={(e) => onChange("location", e.target.value)}
                  className="h-10"
                  placeholder="Nhập địa điểm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="update-salary" className="text-sm font-medium">
                  Mức lương
                </Label>
                <Input
                  id="update-salary"
                  value={data?.salary}
                  onChange={(e) => onChange("salary", e.target.value)}
                  className="h-10"
                  placeholder="Nhập mức lương"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="update-application-deadline"
                  className="text-sm font-medium"
                >
                  Hạn nộp đơn
                </Label>
                <Input
                  id="update-application-deadline"
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
                  htmlFor="update-estimatedDeparture"
                  className="text-sm font-medium"
                >
                  Dự kiến khởi hành
                </Label>
                <Input
                  id="update-estimatedDeparture"
                  value={data?.estimatedDeparture}
                  onChange={(e) =>
                    onChange("estimatedDeparture", e.target.value)
                  }
                  className="h-10"
                  placeholder="Nhập ngày khởi hành"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="update-workType"
                  className="text-sm font-medium"
                >
                  Loại công việc
                </Label>
                <Input
                  id="update-workType"
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
                  htmlFor="update-workingHours"
                  className="text-sm font-medium"
                >
                  Giờ làm việc
                </Label>
                <Input
                  id="update-workingHours"
                  value={data?.workingHours}
                  onChange={(e) => onChange("workingHours", e.target.value)}
                  className="h-10"
                  placeholder="Nhập giờ làm việc"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="update-overtime"
                  className="text-sm font-medium"
                >
                  Giờ làm thêm
                </Label>
                <Input
                  id="update-overtime"
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
                  htmlFor="update-accommodation"
                  className="text-sm font-medium"
                >
                  Chỗ ở
                </Label>
                <Input
                  id="update-accommodation"
                  value={data?.accommodation}
                  onChange={(e) => onChange("accommodation", e.target.value)}
                  className="h-10"
                  placeholder="Nhập thông tin chỗ ở"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="update-training-period"
                  className="text-sm font-medium"
                >
                  Thời gian đào tạo
                </Label>
                <Input
                  id="update-training-period"
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
                htmlFor="update-work-environment"
                className="text-sm font-medium"
              >
                Môi trường làm việc
              </Label>
              <Input
                id="update-work-environment"
                value={data?.workEnvironment}
                onChange={(e) => onChange("workEnvironment", e.target.value)}
                className="h-10"
                placeholder="Nhập mô tả môi trường làm việc"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="update-description"
                className="text-sm font-medium"
              >
                Mô tả
              </Label>
              <Textarea
                id="update-description"
                value={data?.description || ""}
                onChange={(e) => onChange("description", e.target.value)}
                className="min-h-[100px]"
                placeholder="Nhập mô tả công việc"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="update-company" className="text-sm font-medium">
                Công ty
              </Label>
              <Input
                id="update-company"
                value={data?.company}
                onChange={(e) => onChange("company", e.target.value)}
                className="h-10"
                placeholder="Nhập tên công ty"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="create-featured"
                  className="text-sm font-medium"
                >
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
        )}
      </ScrollArea>
    </EnhancedDialog>
  );
};

export default UpdateJobDialog;
