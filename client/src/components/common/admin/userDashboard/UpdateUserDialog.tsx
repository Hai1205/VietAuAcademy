"use client";

import { UserCog } from "lucide-react";
import { EnhancedDialog } from "../EnhancedDialog";
import UserForm, { ExtendedUserData } from "./UserForm";

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
  return (
    <EnhancedDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Chỉnh sửa quản trị viên"
      description="Cập nhật thông tin quản trị viên"
      icon={UserCog}
      className="max-w-lg min-h-[650px]"
    >
      <UserForm
        data={data as ExtendedUserData | null}
        onChange={(field, value) => onChange(field as keyof IUser, value)}
        onSubmit={onUserUpdated}
        onCancel={() => onOpenChange(false)}
        isCreate={false}
      />
    </EnhancedDialog>
  );
};

export default UpdateUserDialog;
