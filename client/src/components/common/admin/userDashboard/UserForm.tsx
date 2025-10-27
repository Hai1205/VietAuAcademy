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
import { Eye, EyeOff, Lock, Save } from "lucide-react";
import { userStatus } from "./constant";
import { EUserStatus } from "@/utils/types/enum";

export type ExtendedUserData = Omit<IUser, "status"> & {
  status: EUserStatus;
};

interface UserFormProps {
  data: ExtendedUserData | null;
  onChange: (field: keyof ExtendedUserData, value: string) => void;
  onSubmit: () => Promise<void> | void;
  onCancel: () => void;
  isCreate: boolean; // true for create, false for update
}

const UserForm: React.FC<UserFormProps> = ({
  data,
  onChange,
  onSubmit,
  onCancel,
  isCreate,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <ScrollArea className="h-[50vh] pr-4">
      <div className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="form-name" className="text-sm font-medium">
            Tên quản trị viên
          </Label>
          <Input
            id="form-name"
            value={data?.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
            className="h-10"
            placeholder="Nhập tên quản trị viên"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="form-email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="form-email"
            type="email"
            value={data?.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            className="h-10"
            placeholder="example@vietau.com"
          />
        </div>

        {/* Password - only for create */}
        {isCreate && (
          <div className="space-y-2">
            <Label htmlFor="form-password" className="text-sm font-medium">
              Mật khẩu
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="form-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={data?.password || ""}
                onChange={(e) => onChange("password", e.target.value)}
                className="pl-10"
                placeholder="Nhập mật khẩu"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="form-phone" className="text-sm font-medium">
            Số điện thoại
          </Label>
          <Input
            id="form-phone"
            value={data?.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            className="h-10"
            placeholder="Nhập số điện thoại"
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="form-status" className="text-sm font-medium">
            Trạng thái
          </Label>
          <Select
            value={data?.status || userStatus[0].value}
            onValueChange={(value) => onChange("status", value as EUserStatus)}
          >
            <SelectTrigger id="form-status" className="h-10">
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

export default UserForm;
