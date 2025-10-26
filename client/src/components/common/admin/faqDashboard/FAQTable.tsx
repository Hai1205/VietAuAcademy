import { DataTable } from "@/components/common/admin/DataTable";

interface IFAQTableProps {
  faqs: IFAQ[];
  isLoading: boolean;
  onUpdate?: (faq: IFAQ) => void;
  onDelete?: (faq: IFAQ) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500";
    case "deleted":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getCategoryColor = (status: string) => {
  switch (status) {
    case "Hồ sơ du học":
      return "bg-green-500";
    case "Chi phí":
      return "bg-yellow-500";
    case "Visa":
      return "bg-green-500";
    case "Ngôn ngữ":
      return "bg-yellow-500";
    case "Định cư":
      return "bg-green-500";
    case "Dịch vụ":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

export const FAQTable = ({ faqs, isLoading, onUpdate, onDelete }: IFAQTableProps) => {
  const columns = [
    {
      header: "STT",
      accessor: (_: IFAQ, index: number) => index + 1,
    },
    {
      header: "Câu hỏi",
      accessor: (faq: IFAQ) => faq.question,
    },
    {
      header: "Câu trả lời",
      accessor: (faq: IFAQ) => faq.answer,
    },
    {
      header: "Danh mục",
      accessor: (faq: IFAQ) => (
        <div className="inline-flex items-center justify-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${getCategoryColor(
              faq?.category || ""
            )}`}
          />
          <span className="capitalize">{faq?.category}</span>
        </div>
      ),
    },
    {
      header: "Trạng thái",
      accessor: (faq: IFAQ) => (
        <div className="inline-flex items-center justify-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${getStatusColor(
              faq?.status || ""
            )}`}
          />
          <span className="capitalize">{faq.status}</span>
        </div>
      ),
    },
  ];

  const actions = [];

  if (onUpdate) {
    actions.push({
      label: "Chỉnh sửa",
      onClick: onUpdate,
    });
  }

  if (onDelete) {
    actions.push({
      label: "Xoá",
      onClick: onDelete,
    });
  }

  return (
    <DataTable
      data={faqs}
      isLoading={isLoading}
      columns={columns}
      actions={actions}
      emptyMessage="Không tìm thấy câu hỏi thường gặp nào"
    />
  );
};
