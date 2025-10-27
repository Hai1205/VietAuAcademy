import { Briefcase } from "lucide-react";
import { useCallback } from "react";
import { EnhancedDialog } from "../EnhancedDialog";
import JobForm, { ExtendedJobData } from "./JobForm";

interface CreateJobDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (
    field: keyof IJob,
    value: string | string[] | number | boolean | File | null
  ) => void;
  onJobCreated: () => void;
  data: IJob | null;
}

const CreateJobDialog = ({
  isOpen,
  onOpenChange,
  onChange,
  onJobCreated,
  data,
}: CreateJobDialogProps) => {
  const handleFormChange = useCallback(
    (
      field: keyof ExtendedJobData,
      value: string | string[] | boolean | File | null | number
    ) => {
      if (field === "positions" && typeof value === "string") {
        onChange(field, parseInt(value) || 0);
      } else {
        onChange(field as keyof IJob, value);
      }
    },
    [onChange]
  );

  return (
    <EnhancedDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Tạo công việc"
      description="Thêm một công việc mới vào hệ thống"
      icon={Briefcase}
      className="max-w-2xl"
    >
      <JobForm
        data={data as ExtendedJobData | null}
        onChange={handleFormChange}
        onSubmit={onJobCreated}
        onCancel={() => onOpenChange(false)}
      />
    </EnhancedDialog>
  );
};

export default CreateJobDialog;
