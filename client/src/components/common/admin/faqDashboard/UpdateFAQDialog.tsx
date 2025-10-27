import { HelpCircle } from "lucide-react";
import { EnhancedDialog } from "../EnhancedDialog";
import FaqForm, { ExtendedFaqData } from "./FaqForm";

interface UpdateFAQDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (field: keyof IFaq, value: string) => void;
  data: IFaq | null;
  onFAQUpdated: () => void;
}

const UpdateFAQDialog = ({
  isOpen,
  onOpenChange,
  onChange,
  data,
  onFAQUpdated,
}: UpdateFAQDialogProps) => {
  return (
    <EnhancedDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Cập nhật câu hỏi thường gặp"
      description="Chỉnh sửa thông tin câu hỏi thường gặp"
      icon={HelpCircle}
      className="max-w-2xl"
    >
      <FaqForm
        data={data as ExtendedFaqData | null}
        onChange={(field, value) => onChange(field as keyof IFaq, value)}
        onSubmit={onFAQUpdated}
        onCancel={() => onOpenChange(false)}
      />
    </EnhancedDialog>
  );
};

export default UpdateFAQDialog;
