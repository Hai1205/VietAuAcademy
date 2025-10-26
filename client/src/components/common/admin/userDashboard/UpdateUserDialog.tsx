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
import { Save, UserCog } from "lucide-react";
import { EUserStatus } from "@/utils/types/enum";
import { EnhancedDialog } from "../EnhancedDialog";

interface UpdateUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (field: keyof IUser, value: string | boolean) => void;
  data: IUser | null;
  onUserUpdated: () => void;
}

const UpdateUserDialog = ({
  isOpen,
  onOpenChange,
  onChange,
  data,
  onUserUpdated,
}: UpdateUserDialogProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await Promise.resolve(onUserUpdated());
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
      title="Chỉnh sửa quản trị viên"
      description="Cập nhật thông tin quản trị viên"
      icon={UserCog}
      footer={footer}
      className="max-w-md"
    >
      <ScrollArea className="h-[50vh] pr-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="update-name" className="text-sm font-medium">
              Tên quản trị viên
            </Label>
            <Input
              id="update-name"
              value={data?.name || ""}
              onChange={(e) => onChange("name", e.target.value)}
              className="h-10"
              placeholder="Nhập tên quản trị viên"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="update-email"
              type="email"
              value={data?.email || ""}
              onChange={(e) => onChange("email", e.target.value)}
              className="h-10"
              placeholder="example@vietau.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-phone" className="text-sm font-medium">
              Số điện thoại
            </Label>
            <Input
              id="update-phone"
              value={data?.phone || ""}
              onChange={(e) => onChange("phone", e.target.value)}
              className="h-10"
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-status" className="text-sm font-medium">
              Trạng thái
            </Label>
            <Select
              value={data?.status || EUserStatus.PENDING}
              onValueChange={(value) =>
                onChange("status", value as EUserStatus)
              }
            >
              <SelectTrigger id="update-status" className="h-10">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="banned">Ngừng hoạt động</SelectItem>
                <SelectItem value={EUserStatus.PENDING}>Đang chờ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ScrollArea>
    </EnhancedDialog>
  );
};

export default UpdateUserDialog;
