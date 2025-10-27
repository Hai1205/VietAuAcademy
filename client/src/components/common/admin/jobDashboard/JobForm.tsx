"use client";

import { useEffect, useRef, useState, ChangeEvent, useMemo } from "react";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Save,
  Image as ImageIcon,
  Plus,
  X,
  ChevronDown,
  Check,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  jobFeatured,
  jobStatus,
  countries,
  workTypes,
  overtimeOptions,
  accommodationOptions,
} from "./constant";
import { EStatus } from "@/utils/types/enum";
import { State } from "country-state-city";

export type ExtendedJobData = Omit<IJob, "status"> & {
  status: EStatus;
  image?: File | null;
};

interface JobFormProps {
  data: ExtendedJobData | null;
  onChange: (
    field: keyof ExtendedJobData,
    value: string | string[] | boolean | File | null | number
  ) => void;
  onSubmit: () => Promise<void> | void;
  onCancel: () => void;
}

const JobForm: React.FC<JobFormProps> = ({
  data,
  onChange,
  onSubmit,
  onCancel,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [locationOpen, setLocationOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [provinces, setProvinces] = useState<string[]>([]);

  const [requirementInput, setRequirementInput] = useState<string>("");
  const [benefitInput, setBenefitInput] = useState<string>("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);

  // Dùng ref để theo dõi imageUrl cũ
  const lastImageUrlRef = useRef<string | null>(null);

  /** Parse field string hoặc array -> string[] */
  const parseField = (field: string | string[] | undefined): string[] => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    try {
      const parsed = JSON.parse(field);
      if (Array.isArray(parsed))
        return parsed.map((s) => String(s).trim()).filter(Boolean);
    } catch {}
    return field
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  };

  // Map tên quốc gia tiếng Việt sang ISO code
  const countryNameToISOCode = useMemo(
    (): Record<string, string> => ({
      "Hàn Quốc": "KR",
      "Nhật Bản": "JP",
      "Đài Loan": "TW",
      Úc: "AU",
      Mỹ: "US",
      Đức: "DE",
    }),
    []
  );

  useEffect(() => {
    if (!data?.country) return;

    try {
      const isoCode = countryNameToISOCode[data.country];

      if (!isoCode) {
        console.warn(`Không tìm thấy ISO code cho quốc gia: ${data.country}`);
        setProvinces([]);
        return;
      }

      // Lấy danh sách tỉnh/thành từ country-state-city
      const states = State.getStatesOfCountry(isoCode);

      const stateNames = states
        .map((state) => state.name)
        .sort((a, b) => a.localeCompare(b, "en"));

      setProvinces(stateNames);

      // Set location mặc định là phần tử đầu tiên khi country thay đổi
      if (stateNames.length > 0) {
        onChange("location", stateNames[0]);
      }
    } catch (err) {
      console.error("❌ Lỗi tải tỉnh/thành:", err);
      setProvinces([]);
    }
  }, [countryNameToISOCode, data?.country, onChange]);

  /** Chỉ cập nhật requirements/benefits khi data thay đổi, không reset preview */
  useEffect(() => {
    setRequirements(parseField(data?.requirements));
    setBenefits(parseField(data?.benefits));
  }, [data?.requirements, data?.benefits]);

  /** Chỉ cập nhật preview khi imageUrl thực sự đổi */
  useEffect(() => {
    if (data?.imageUrl && data.imageUrl !== lastImageUrlRef.current) {
      setPreviewImage(data.imageUrl);
      lastImageUrlRef.current = data.imageUrl;
    }
  }, [data?.imageUrl]);

  /** Xử lý chọn file */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      onChange("image", file);
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      lastImageUrlRef.current = url; // update ref để tránh reset
    }
  };

  const handleFileButton = () => fileInputRef.current?.click();

  /** Add/Remove requirement */
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

  /** Add/Remove benefit */
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
    <ScrollArea className="h-[60vh] pr-4">
      <div className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="form-title" className="text-sm font-medium">
            Công việc
          </Label>
          <Input
            id="form-title"
            value={data?.title || ""}
            onChange={(e) => onChange("title", e.target.value)}
            className="h-10"
            placeholder="Nhập tên công việc"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="form-description" className="text-sm font-medium">
            Mô tả công việc
          </Label>
          <Textarea
            id="form-description"
            value={data?.description || ""}
            onChange={(e) => onChange("description", e.target.value)}
            className="min-h-[80px]"
            placeholder="Nhập mô tả công việc"
          />
        </div>

        {/* Country + Positions */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="form-country" className="text-sm font-medium">
              Quốc gia
            </Label>
            <Select
              value={data?.country || "Hàn Quốc"}
              onValueChange={(value) => onChange("country", value)}
            >
              <SelectTrigger id="form-country" className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countries.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="form-positions" className="text-sm font-medium">
              Số vị trí ứng tuyển
            </Label>
            <Input
              id="form-positions"
              type="number"
              value={data?.positions?.toString() || ""}
              onChange={(e) =>
                onChange("positions", parseInt(e?.target?.value || "0"))
              }
              className="h-10"
              placeholder="Nhập số vị trí"
            />
          </div>
        </div>

        {/* Location + Salary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="form-location" className="text-sm font-medium">
              Địa điểm
            </Label>
            <Popover open={locationOpen} onOpenChange={setLocationOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={locationOpen}
                  className="w-full justify-between h-10 font-normal"
                >
                  <span
                    className={
                      data?.location
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    {data?.location || "Chọn tỉnh/thành"}
                  </span>
                  <ChevronDown
                    className={`ml-2 h-4 w-4 shrink-0 transition-transform duration-200 ${
                      locationOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-0 shadow-xl border-2"
                align="start"
              >
                <Command className="rounded-lg">
                  <CommandInput
                    placeholder="Tìm kiếm tỉnh/thành..."
                    className="h-11 border-b"
                  />
                  <CommandList className="max-h-[300px]">
                    <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                      Không tìm thấy kết quả phù hợp.
                    </CommandEmpty>
                    <CommandGroup className="p-2">
                      {provinces.map((province) => (
                        <CommandItem
                          key={province}
                          value={province}
                          onSelect={(currentValue: string) => {
                            onChange(
                              "location",
                              currentValue === data?.location
                                ? ""
                                : currentValue
                            );
                            setLocationOpen(false);
                          }}
                          className="flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-md aria-selected:bg-accent aria-selected:text-accent-foreground hover:bg-accent/50"
                        >
                          <Check
                            className={`h-4 w-4 shrink-0 transition-opacity ${
                              data?.location === province
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                          <span className="flex-1">{province}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="form-salary" className="text-sm font-medium">
              Lương / tháng
            </Label>
            <Input
              id="form-salary"
              value={data?.salary || ""}
              onChange={(e) => onChange("salary", e.target.value)}
              className="h-10"
              placeholder="Nhập lương"
            />
          </div>
        </div>

        {/* Application Deadline + Estimated Departure */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="form-applicationDeadline"
              className="text-sm font-medium"
            >
              Hạn nộp hồ sơ
            </Label>
            <Input
              id="form-applicationDeadline"
              type="date"
              value={data?.applicationDeadline || ""}
              onChange={(e) => onChange("applicationDeadline", e.target.value)}
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="form-estimatedDeparture"
              className="text-sm font-medium"
            >
              Dự kiến khởi hành
            </Label>
            <Input
              id="form-estimatedDeparture"
              type="date"
              value={data?.estimatedDeparture || ""}
              onChange={(e) => onChange("estimatedDeparture", e.target.value)}
              className="h-10"
            />
          </div>
        </div>

        {/* Company + Work Type */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="form-company" className="text-sm font-medium">
              Công ty
            </Label>
            <Input
              id="form-company"
              value={data?.company || ""}
              onChange={(e) => onChange("company", e.target.value)}
              className="h-10"
              placeholder="Nhập tên công ty"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="form-workType" className="text-sm font-medium">
              Loại công việc
            </Label>
            <Select
              value={data?.workType || "Full-time"}
              onValueChange={(value) => onChange("workType", value)}
            >
              <SelectTrigger id="form-workType" className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {workTypes.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Working Hours + Overtime */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="form-workingHours" className="text-sm font-medium">
              Giờ làm việc
            </Label>
            <Input
              id="form-workingHours"
              value={data?.workingHours || ""}
              onChange={(e) => onChange("workingHours", e.target.value)}
              className="h-10"
              placeholder="Nhập giờ làm việc"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="form-overtime" className="text-sm font-medium">
              Làm thêm giờ
            </Label>
            <Select
              value={data?.overtime || "no"}
              onValueChange={(value) => onChange("overtime", value)}
            >
              <SelectTrigger id="form-overtime" className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {overtimeOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Accommodation + Work Environment */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="form-accommodation" className="text-sm font-medium">
              Hỗ trợ chỗ ở
            </Label>
            <Select
              value={data?.accommodation || "no"}
              onValueChange={(value) => onChange("accommodation", value)}
            >
              <SelectTrigger id="form-accommodation" className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {accommodationOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="form-workEnvironment"
              className="text-sm font-medium"
            >
              Môi trường làm việc
            </Label>
            <Input
              id="form-workEnvironment"
              value={data?.workEnvironment || ""}
              onChange={(e) => onChange("workEnvironment", e.target.value)}
              className="h-10"
              placeholder="Nhập môi trường làm việc"
            />
          </div>
        </div>

        {/* Training Period */}
        <div className="space-y-2">
          <Label htmlFor="form-trainingPeriod" className="text-sm font-medium">
            Thời gian đào tạo
          </Label>
          <Input
            id="form-trainingPeriod"
            value={data?.trainingPeriod || ""}
            onChange={(e) => onChange("trainingPeriod", e.target.value)}
            className="h-10"
            placeholder="Nhập thời gian đào tạo"
          />
        </div>

        {/* Image upload */}
        <div className="space-y-2">
          <Label htmlFor="form-image" className="text-sm font-medium">
            Hình ảnh
          </Label>
          <div className="flex flex-col gap-2">
            <input
              type="file"
              id="form-image"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleFileButton}
              className="flex items-center gap-2 h-10"
            >
              <ImageIcon className="h-4 w-4" />
              {data?.imageUrl || previewImage
                ? "Thay đổi hình ảnh"
                : "Tải lên hình ảnh"}
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

        {/* Requirements */}
        <div className="space-y-2">
          <Label htmlFor="form-requirements" className="text-sm font-medium">
            Yêu cầu ứng tuyển
          </Label>
          <div className="flex gap-2">
            <Input
              id="form-requirements"
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

        {/* Benefits */}
        <div className="space-y-2">
          <Label htmlFor="form-benefits" className="text-sm font-medium">
            Lợi ích khi tham gia
          </Label>
          <div className="flex gap-2">
            <Input
              id="form-benefits"
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

        {/* Featured + Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="form-featured" className="text-sm font-medium">
              Nổi bật
            </Label>
            <Select
              value={data?.featured ? "true" : "false"}
              onValueChange={(value) => onChange("featured", value === "true")}
            >
              <SelectTrigger id="form-featured" className="h-10">
                <SelectValue />
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
            <Label htmlFor="form-status" className="text-sm font-medium">
              Trạng thái
            </Label>
            <Select
              value={data?.status || EStatus.PUBLIC}
              onValueChange={(value) => onChange("status", value as EStatus)}
            >
              <SelectTrigger id="form-status" className="h-10">
                <SelectValue />
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

export default JobForm;
