import { Fragment, useState, useRef, ChangeEvent, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Save } from "lucide-react";
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
import { JobStatus } from "./CreateJobDialog";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { EStatus } from "@/utils/types/enum";

interface UpdateJobDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (
    field: keyof IJob,
    value: string | number | boolean | File | null
  ) => void;
  data: IJob | null;
  onJobUpdated: () => void;
  isLoading: boolean;
}

const UpdateJobDialog = ({
  isOpen,
  onOpenChange,
  onChange,
  data,
  onJobUpdated,
  isLoading,
}: UpdateJobDialogProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Hiển thị hình ảnh hiện có khi dialog mở
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

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Chỉnh sửa công việc
                </Dialog.Title>

                <ScrollArea className="h-[42vh] pr-4 mt-4">
                  {data && (
                    <>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-title">Công việc</Label>

                          <Input
                            id="update-title"
                            value={data?.title || ""}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => onChange("title", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-country">Quốc gia</Label>

                          <Input
                            id="update-country"
                            value={data?.country || ""}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => onChange("country", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-image">Hình ảnh</Label>

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
                              className="flex items-center gap-2"
                            >
                              <ImageIcon className="h-4 w-4" />
                              {data?.imageUrl ? "Change Image" : "Upload Image"}
                            </Button>

                            {previewImage && (
                              <div className="relative mt-2 h-40 w-full overflow-hidden rounded-md border">
                                <Image
                                  src={previewImage}
                                  alt="Job Preview"
                                  fill
                                  sizes="(max-width: 768px) 100vw, 300px"
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-positions">Số lượng</Label>

                          <Input
                            id="update-positions"
                            type="number"
                            value={data?.positions || ""}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              onChange(
                                "positions",
                                parseInt(e.target.value) || 0
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-location">Địa điểm</Label>

                          <Input
                            id="update-location"
                            value={data?.location}
                            onChange={(e) =>
                              onChange("location", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-salary">Mức lương</Label>

                          <Input
                            id="update-salary"
                            value={data?.salary}
                            onChange={(e) => onChange("salary", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-application-deadline">
                            Hạn nộp đơn
                          </Label>

                          <Input
                            id="update-application-deadline"
                            value={data?.applicationDeadline}
                            onChange={(e) =>
                              onChange("applicationDeadline", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-estimatedDeparture">
                            Dự kiến khởi hành
                          </Label>

                          <Input
                            id="update-estimated-departure"
                            value={data?.estimatedDeparture}
                            onChange={(e) =>
                              onChange("estimatedDeparture", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-requirements">
                            Yêu cầu (cách nhau bằng dấu phẩy)
                          </Label>
                          <Textarea
                            id="update-requirements"
                            value={data?.requirements || ""}
                            onChange={(e) =>
                              onChange("requirements", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-benefits">
                            Lợi ích (cách nhau bằng dấu phẩy)
                          </Label>
                          <Textarea
                            id="update-benefits"
                            value={data?.benefits || ""}
                            onChange={(e) =>
                              onChange("benefits", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-description">Mô tả</Label>
                          <Textarea
                            id="update-description"
                            value={data?.description || ""}
                            onChange={(e) =>
                              onChange("description", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-company">Công ty</Label>

                          <Input
                            id="update-company"
                            value={data?.company}
                            onChange={(e) =>
                              onChange("company", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-workType">
                            Loại công việc
                          </Label>

                          <Input
                            id="update-workType"
                            value={data?.workType}
                            onChange={(e) =>
                              onChange("workType", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-featured">Nổi bật</Label>

                          <Select
                            value={data?.featured ? "true" : "false"}
                            onValueChange={(value: string) =>
                              onChange("featured", value === "true")
                            }
                          >
                            <SelectTrigger id="update-featured">
                              <SelectValue placeholder="Select featured status" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectItem value="true">Có</SelectItem>
                              <SelectItem value="false">Không</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-workingHours">
                            Giờ làm việc
                          </Label>

                          <Input
                            id="update-workingHours"
                            value={data?.workingHours}
                            onChange={(e) =>
                              onChange("workingHours", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-overtime">Giờ làm thêm</Label>

                          <Input
                            id="update-overtime"
                            value={data?.overtime}
                            onChange={(e) =>
                              onChange("overtime", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-accommodation">Chỗ ở</Label>

                          <Input
                            id="update-accommodation"
                            value={data?.accommodation}
                            onChange={(e) =>
                              onChange("accommodation", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-work-environment">
                            Môi trường làm việc
                          </Label>

                          <Input
                            id="update-work-environment"
                            value={data?.workEnvironment}
                            onChange={(e) =>
                              onChange("workEnvironment", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="update-training-period">
                            Thời gian đào tạo
                          </Label>

                          <Input
                            id="update-training-period"
                            value={data?.trainingPeriod}
                            onChange={(e) =>
                              onChange("trainingPeriod", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-2 mt-3">
                        <Label htmlFor="update-country">Trạng thái</Label>

                        <Select
                          value={data.status || EStatus.DELETED}
                          onValueChange={(value: string) =>
                            onChange("status", value)
                          }
                        >
                          <SelectTrigger id="update-status">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>

                          <SelectContent>
                            {JobStatus.map(
                              (item: { value: string; label: string }) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </ScrollArea>

                {/* Footer */}
                <div className="mt-4 flex justify-end gap-2 pt-4 border-t border-gray-800">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="bg-gray-200 border-gray-300 text-gray-700 hover:bg-red-200 hover:text-red-600 hover:border-red-200 dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-red-900 dark:hover:text-white"
                  >
                    Hủy
                  </Button>

                  <Button onClick={() => onJobUpdated()} disabled={isLoading}>
                    {isLoading ? (
                      <>Đang lưu...</>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Lưu
                      </>
                    )}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateJobDialog;
