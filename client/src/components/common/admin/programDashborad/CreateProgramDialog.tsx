"use client";

import { Fragment, useState, useRef, ChangeEvent, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
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
import { Save, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { EStatus } from "@/utils/types/enum";

interface CreateProgramDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (
    field: keyof IProgram,
    value: string | boolean | File | null
  ) => void;
  data: IProgram | null;
  onProgramCreated: () => void;
  isLoading: boolean;
}

const CreateProgramDialog = ({
  isOpen,
  onOpenChange,
  onChange,
  data,
  onProgramCreated,
  isLoading,
}: CreateProgramDialogProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  }, [data?.imageUrl]);

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
                  Tạo chương trình
                </Dialog.Title>

                <ScrollArea className="h-[42vh] pr-4 mt-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="create-title">Chương trình</Label>

                      <Input
                        id="create-title"
                        value={data?.title || ""}
                        onChange={(e) => onChange("title", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="create-description">Mô tả</Label>

                      <Textarea
                        id="create-description"
                        value={data?.description || ""}
                        onChange={(e) =>
                          onChange("description", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="create-country">Quốc gia</Label>

                      <Input
                        id="create-country"
                        value={data?.country || ""}
                        onChange={(e) => onChange("country", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="create-duration">Thời gian</Label>

                      <Input
                        id="create-duration"
                        value={data?.duration || ""}
                        onChange={(e) => onChange("duration", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="create-tuition">Học phí</Label>

                      <Input
                        id="create-tuition"
                        value={data?.tuition || ""}
                        onChange={(e) => onChange("tuition", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="create-opportunities">Cơ hội</Label>

                      <Textarea
                        id="create-opportunities"
                        value={data?.opportunities || ""}
                        onChange={(e) =>
                          onChange("opportunities", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="create-about">Giới thiệu</Label>

                      <Textarea
                        id="create-about"
                        value={data?.about || ""}
                        onChange={(e) => onChange("about", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="create-image">Hình ảnh</Label>

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
                          className="flex items-center gap-2"
                        >
                          <ImageIcon className="h-4 w-4" />
                          {data?.imageUrl ? "Change Image" : "Upload Image"}
                        </Button>

                        {previewImage && (
                          <div className="relative mt-2 h-40 w-full overflow-hidden rounded-md border">
                            <Image
                              src={previewImage}
                              alt="Preview"
                              fill
                              sizes="(max-width: 768px) 100vw, 300px"
                              style={{ objectFit: "cover" }}
                              priority
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="create-requirements">
                        Yêu cầu (cách nhau bằng dấu phẩy)
                      </Label>

                      <Input
                        id="update-requirements"
                        value={data?.requirements}
                        onChange={(e) =>
                          onChange("requirements", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="create-benefits">
                        Lợi ích (cách nhau bằng dấu phẩy)
                      </Label>

                      <Input
                        id="update-benefits"
                        value={data?.benefits}
                        onChange={(e) => onChange("benefits", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2 mt-3">
                    <Label htmlFor="create-featured">Nổi bật</Label>

                    <Select
                      value={data?.featured ? "true" : "false"}
                      onValueChange={(value) =>
                        onChange("featured", value === "true")
                      }
                    >
                      <SelectTrigger id="create-featured">
                        <SelectValue placeholder="Select featured status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Có</SelectItem>
                        <SelectItem value="false">Không</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2 mt-3">
                    <Label htmlFor="create-status">Status</Label>
                    <Select
                      value={data?.status || EStatus.DELETED}
                      onValueChange={(value) =>
                        onChange("status", value as EStatus)
                      }
                    >
                      <SelectTrigger id="create-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={EStatus.ACTIVE}>
                          Hoạt động
                        </SelectItem>
                        <SelectItem value={EStatus.DELETED}>
                          Không hoạt động
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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

                  <Button onClick={onProgramCreated} disabled={isLoading}>
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

export default CreateProgramDialog;
