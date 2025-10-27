import { Briefcase } from "lucide-react";
import { EnhancedDialog } from "../EnhancedDialog";
import JobForm, { ExtendedJobData } from "./JobForm";

interface UpdateJobDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (
    field: keyof IJob,
    value: string | string[] | number | boolean | File | null
  ) => void;
  data: IJob | null;
  onJobUpdated: () => void;
}

const UpdateJobDialog = ({
  isOpen,
  onOpenChange,
  onChange,
  data,
  onJobUpdated,
}: UpdateJobDialogProps) => {
  return (
    <EnhancedDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Chỉnh sửa công việc"
      description="Cập nhật thông tin công việc"
      icon={Briefcase}
      className="max-w-2xl"
    >
      <JobForm
        data={data as ExtendedJobData | null}
        onChange={(field, value) => {
          if (field === "positions" && typeof value === "string") {
            onChange(field, parseInt(value) || 0);
          } else {
            onChange(field as keyof IJob, value);
          }
        }}
        onSubmit={onJobUpdated}
        onCancel={() => onOpenChange(false)}
      />
    </EnhancedDialog>
  );
};

export default UpdateJobDialog;
