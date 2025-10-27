"use client";

import { UserPlus } from "lucide-react";
import { EnhancedDialog } from "../EnhancedDialog";
import UserForm, { ExtendedUserData } from "./UserForm";

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
  return (
    <EnhancedDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Tạo quản trị viên"
      description="Thêm một quản trị viên mới vào hệ thống"
      icon={UserPlus}
      className="max-w-lg min-h-[650px]"
    >
      <UserForm
        data={data as ExtendedUserData | null}
        onChange={(field, value) => onChange(field as keyof IUser, value)}
        onSubmit={onUserCreated}
        onCancel={() => onOpenChange(false)}
        isCreate={true}
      />
    </EnhancedDialog>
  );
};

export default CreateUserDialog;
