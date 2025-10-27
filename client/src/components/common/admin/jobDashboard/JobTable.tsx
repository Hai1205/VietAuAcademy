import { DataTable } from "@/components/common/admin/DataTable";

interface IJobTableProps {
  Jobs: IJob[];
  isLoading: boolean;
  onUpdate?: (job: IJob) => void;
  onDelete?: (job: IJob) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "public":
      return "bg-green-500";
    case "private":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export const JobTable = ({
  Jobs,
  isLoading,
  onUpdate,
  onDelete,
}: IJobTableProps) => {
  const columns = [
    {
      header: "STT",
      accessor: (_: IJob, index: number) => index + 1,
    },
    {
      header: "Công việc",
      accessor: (job: IJob) => job.title,
    },
    {
      header: "Quốc gia",
      accessor: (job: IJob) => job.country,
    },
    {
      header: "Công ty",
      accessor: (job: IJob) => job.company,
    },
    {
      header: "Số lượng",
      accessor: (job: IJob) => job.positions,
    },
    {
      header: "Mức lương",
      accessor: (job: IJob) => job.salary,
    },
    {
      header: "Loại công việc",
      accessor: (job: IJob) => job.workType,
    },
    {
      header: "Trạng thái",
      accessor: (job: IJob) => (
        <div className="flex items-center justify-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${getStatusColor(
              job?.status || ""
            )}`}
          />
          <span className="capitalize">{job.status}</span>
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
      data={Jobs}
      isLoading={isLoading}
      columns={columns}
      actions={actions}
      emptyMessage="Không tìm thấy công việc nào"
    />
  );
};
