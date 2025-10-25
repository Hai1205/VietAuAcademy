import { DataTable } from "@/components/common/admin/DataTable";

interface IJobTableProps {
  Jobs: IJob[];
  isLoading: boolean;
  onEdit?: (job: IJob) => void;
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

export const JobTable = ({ Jobs, isLoading, onEdit }: IJobTableProps) => {
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

  return (
    <DataTable
      data={Jobs}
      isLoading={isLoading}
      columns={columns}
      actions={
        onEdit
          ? [
              {
                label: "Edit",
                onClick: onEdit,
              },
            ]
          : []
      }
      emptyMessage="Không tìm thấy công việc nào"
    />
  );
};
