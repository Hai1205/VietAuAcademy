import { HelpCircle } from "lucide-react";
import { EnhancedDialog } from "../EnhancedDialog";
import FaqForm, { ExtendedFaqData } from "./FaqForm";

interface CreateFAQDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (field: keyof IFaq, value: string) => void;
  onFAQCreated: () => void;
  data: IFaq | null;
}

const CreateFAQDialog = ({
  isOpen,
  onOpenChange,
  onChange,
  onFAQCreated,
  data,
}: CreateFAQDialogProps) => {
  return (
    <EnhancedDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Tạo câu hỏi thường gặp"
      description="Thêm một câu hỏi thường gặp mới vào hệ thống"
      icon={HelpCircle}
      className="max-w-2xl"
    >
      <FaqForm
        data={data as ExtendedFaqData | null}
        onChange={(field, value) => onChange(field as keyof IFaq, value)}
        onSubmit={onFAQCreated}
        onCancel={() => onOpenChange(false)}
      />
    </EnhancedDialog>
  );
};

export default CreateFAQDialog;
