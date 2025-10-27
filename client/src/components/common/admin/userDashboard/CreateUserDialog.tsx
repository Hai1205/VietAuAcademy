"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, UserPlus } from "lucide-react";
import { EnhancedDialog } from "../EnhancedDialog";
import { userStatus } from "./constant";

interface CreateUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (field: keyof IUser, value: string | boolean) => void;
  data: IUser | null;
  onUserCreated: () => void;
}

const CreateUserDialog = ({
  isOpen,
  onOpenChange,
  onChange,
  data,
  onUserCreated,
}: CreateUserDialogProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreate = async () => {
    setIsLoading(true);
    await Promise.resolve(onUserCreated());
    setIsLoading(false);
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
      title="Tạo quản trị viên"
      description="Thêm một quản trị viên mới vào hệ thống"
      icon={UserPlus}
      footer={footer}
      className="max-w-md"
    >
      <ScrollArea className="h-[50vh] pr-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="create-name" className="text-sm font-medium">
              Tên Quản trị viên
            </Label>
            <Input
              id="create-name"
              value={data?.name || ""}
              onChange={(e) => onChange("name", e.target.value)}
              className="h-10"
              placeholder="Nhập tên quản trị viên"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="create-email"
              type="email"
              value={data?.email || ""}
              onChange={(e) => onChange("email", e.target.value)}
              className="h-10"
              placeholder="example@vietau.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-password" className="text-sm font-medium">
              Mật khẩu
            </Label>
            <Input
              id="create-password"
              type="password"
              value={data?.password || ""}
              onChange={(e) =>
                onChange("password" as keyof IUser, e.target.value)
              }
              className="h-10"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-phone" className="text-sm font-medium">
              Số điện thoại
            </Label>
            <Input
              id="create-phone"
              value={data?.phone || ""}
              onChange={(e) => onChange("phone", e.target.value)}
              className="h-10"
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-status" className="text-sm font-medium">
              Trạng thái
            </Label>
            <Select
              value={data?.status ? data.status : userStatus[0].value}
              onValueChange={(value) => onChange("status", value)}
            >
              <SelectTrigger id="create-status" className="h-10">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                {userStatus.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </ScrollArea>
    </EnhancedDialog>
  );
};

export default CreateUserDialog;
