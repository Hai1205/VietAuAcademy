"use client";

import { BookOpen } from "lucide-react";
import { EnhancedDialog } from "../EnhancedDialog";
import ProgramForm from "./ProgramForm";

interface CreateProgramDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (
    field: keyof IProgram,
    value: string | string[] | boolean | File | null
  ) => void;
  data: IProgram | null;
  onProgramCreated: () => void;
}

const CreateProgramDialog = ({
  isOpen,
  onOpenChange,
  onChange,
  data,
  onProgramCreated,
}: CreateProgramDialogProps) => {
  return (
    <EnhancedDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Tạo chương trình"
      description="Thêm một chương trình học mới vào hệ thống"
      icon={BookOpen}
      className="max-w-2xl"
      footer={null}
    >
      <ProgramForm
        data={data}
        onChange={onChange}
        onSubmit={onProgramCreated}
        onCancel={() => onOpenChange(false)}
      />
    </EnhancedDialog>
  );
};

export default CreateProgramDialog;
