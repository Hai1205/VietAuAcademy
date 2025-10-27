"use client";

import { BookOpen } from "lucide-react";
import { EnhancedDialog } from "../EnhancedDialog";
import ProgramForm from "./ProgramForm";

interface UpdateProgramDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (
    field: keyof IProgram,
    value: string | string[] | boolean | File | null
  ) => void;
  data: IProgram | null;
  onProgramUpdated: () => void;
}

const UpdateProgramDialog = ({
  isOpen,
  onOpenChange,
  onChange,
  data,
  onProgramUpdated,
}: UpdateProgramDialogProps) => {
  return (
    <EnhancedDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Chỉnh sửa chương trình"
      description="Cập nhật thông tin chương trình học"
      icon={BookOpen}
      className="max-w-2xl"
      footer={null}
    >
      <ProgramForm
        data={data}
        onChange={onChange}
        onSubmit={onProgramUpdated}
        onCancel={() => onOpenChange(false)}
      />
    </EnhancedDialog>
  );
};

export default UpdateProgramDialog;
