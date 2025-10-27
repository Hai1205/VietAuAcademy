import { SharedFilter } from "@/components/common/admin/SharedFilter";

interface FAQFilterProps {
  openMenuFilters: boolean;
  setOpenMenuFilters: (open: boolean) => void;
  activeFilters: { status: string[]; contentType: string[] };
  toggleFilter: (value: string, type: "status" | "contentType") => void;
  clearFilters: () => void;
  applyFilters: () => void;
  closeMenuMenuFilters: () => void;
}

export const FAQFilter = ({
  openMenuFilters,
  setOpenMenuFilters,
  activeFilters,
  toggleFilter,
  clearFilters,
  applyFilters,
  closeMenuMenuFilters,
}: FAQFilterProps) => {
  const filterOptions = {
    status: [
      { label: "Công khai", value: "public" },
      { label: "Riêng tư", value: "private" },
    ],
    contentType: [
      { label: "Hồ sơ du học", value: "Hồ sơ du học" },
      { label: "Chi phí", value: "Chi phí" },
      { label: "Visa", value: "Visa" },
      { label: "Ngôn ngữ", value: "Ngôn ngữ" },
      { label: "Định cư", value: "Định cư" },
      { label: "Dịch vụ", value: "Dịch vụ" },
    ],
  };

  return (
    <SharedFilter
      openMenuFilters={openMenuFilters}
      setOpenMenuFilters={setOpenMenuFilters}
      activeFilters={activeFilters}
      toggleFilter={toggleFilter}
      clearFilters={clearFilters}
      applyFilters={applyFilters}
      closeMenuMenuFilters={closeMenuMenuFilters}
      filterOptions={filterOptions}
    />
  );
};
