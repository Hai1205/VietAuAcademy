"use client";

import { useCallback, useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import UpdateFAQDialog from "@/components/common/admin/faqDashboard/UpdateFAQDialog";
import CreateFAQDialog from "@/components/common/admin/faqDashboard/CreateFAQDialog";
import { FAQFilter } from "@/components/common/admin/faqDashboard/FAQFilter";
import { FAQTable } from "@/components/common/admin/faqDashboard/FAQTable";
import { TableSearch } from "@/components/common/admin/TableSearch";
import { useFAQStore } from "@/utils/stores/faqStore";
import { DashboardHeader } from "@/components/common/admin/DashboardHeader";
import { EStatus } from "@/utils/types/enum";
import { FAQCategory } from "@/components/common/admin/faqDashboard/constant";

// Initialize empty filters
const initialFilters = { status: [] as string[], contentType: [] as string[] };

export default function FAQDashboardPage() {
  const { faqsTable, getAllFAQs, updateFaq, createFaq, deleteFAQ } =
    useFAQStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateFAQOpen, setIsCreateFAQOpen] = useState(false);
  const [isUpdateFAQOpen, setIsUpdateFAQOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [allFAQs, setAllFAQs] = useState<IFaq[] | []>(faqsTable);
  const [filteredFAQs, setFilteredFAQs] = useState<IFaq[] | []>(faqsTable);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getAllFAQs();
      const data = res?.data?.faqs || [];
      setAllFAQs(data);
      setFilteredFAQs(data);
      setIsLoading(false);
    };

    fetchData();
  }, [getAllFAQs]);

  // Function to filter data based on query and activeFilters
  const filterData = useCallback(
    (query: string, filters: { status: string[]; contentType: string[] }) => {
      let results = [...allFAQs];

      // Filter by search query
      if (query.trim()) {
        const searchTerms = query.toLowerCase().trim();
        results = results.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchTerms) ||
            faq.answer.toLowerCase().includes(searchTerms) ||
            faq.category.toLowerCase().includes(searchTerms)
        );
      }

      // Filter by status
      if (filters.status.length > 0) {
        results = results.filter((faq) =>
          filters.status.includes(faq.status || "")
        );
      }

      // Filter by contentType (category)
      if (filters.contentType.length > 0) {
        results = results.filter((faq) =>
          filters.contentType.includes(faq.category || "")
        );
      }

      setFilteredFAQs(results);
    },
    [allFAQs]
  );

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // Filter data based on current searchQuery and activeFilters
      filterData(searchQuery, activeFilters);
    },
    [searchQuery, activeFilters, filterData]
  );

  // Toggle filter without auto-filtering
  const toggleFilter = (value: string, type: "status" | "contentType") => {
    setActiveFilters((prev) => {
      const updated = { ...prev };
      if (updated[type]?.includes(value)) {
        updated[type] = updated[type].filter((item) => item !== value);
      } else {
        updated[type] = [...(updated[type] || []), value];
      }
      return updated;
    });
  };

  const clearFilters = () => {
    setActiveFilters(initialFilters);
    setSearchQuery("");
    setFilteredFAQs(allFAQs); // Reset filtered data
    closeMenuMenuFilters();
  };

  const applyFilters = () => {
    // Filter data based on current activeFilters and searchQuery
    filterData(searchQuery, activeFilters);
    closeMenuMenuFilters();
  };

  const [openMenuFilters, setOpenMenuFilters] = useState(false);
  const closeMenuMenuFilters = () => setOpenMenuFilters(false);

  const [data, setData] = useState<IFaq | null>(null);

  const handleChange = (field: keyof IFaq, value: string) => {
    setData((prev) => {
      // If prev is null, create a new object with default values
      if (!prev) {
        const defaultData = {
          _id: "",
          question: "",
          answer: "",
          category: FAQCategory[0].value,
          status: EStatus.PUBLIC,
        };
        return { ...defaultData, [field]: value };
      }
      // If prev is not null, update the current value
      return { ...prev, [field]: value };
    });
  };

  const handleUpdate = async () => {
    if (data) {
      await updateFaq(
        data._id,
        data.question,
        data.answer,
        data.category,
        data.status
      );

      setIsUpdateFAQOpen(false);
    }
  };

  const handleCreate = async () => {
    if (data) {
      await createFaq(data.question, data.answer, data.category, data.status);

      // Refresh the faqs list after create
      const res = await getAllFAQs();
      const updatedData = res?.data?.faqs || [];
      setAllFAQs(updatedData);

      // Apply current filters
      filterData(searchQuery, activeFilters);

      setIsCreateFAQOpen(false);
      setData(null);
    }
  };

  const onDelete = async (faq: IFaq) => {
    await deleteFAQ(faq._id);
  };

  const onUpdate = async (faq: IFaq) => {
    setData(faq);
    setIsUpdateFAQOpen(true);
  };

  return (
    <div className="space-y-4">
      <DashboardHeader
        title="FAQ Dashboard"
        onCreateClick={() => setIsCreateFAQOpen(true)}
        createButtonText="Create FAQ"
      />

      <CreateFAQDialog
        isOpen={isCreateFAQOpen}
        onOpenChange={setIsCreateFAQOpen}
        onChange={handleChange}
        onFAQCreated={handleCreate}
        data={data}
      />

      <UpdateFAQDialog
        isOpen={isUpdateFAQOpen}
        onOpenChange={setIsUpdateFAQOpen}
        onChange={handleChange}
        data={data}
        onFAQUpdated={handleUpdate}
      />

      <div className="space-y-4">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle />

              <div className="flex items-center gap-2">
                <TableSearch
                  handleSearch={handleSearch}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  placeholder="Search faqs..."
                />

                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 gap-1"
                  onClick={async () => {
                    // Reset filters
                    setActiveFilters(initialFilters);
                    setSearchQuery("");

                    // Refresh data from API
                    const res = await getAllFAQs();
                    const data = res?.data?.faqs || [];
                    setAllFAQs(data);
                    setFilteredFAQs(data);
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>

                <FAQFilter
                  openMenuFilters={openMenuFilters}
                  setOpenMenuFilters={setOpenMenuFilters}
                  activeFilters={activeFilters}
                  toggleFilter={toggleFilter}
                  clearFilters={clearFilters}
                  applyFilters={applyFilters}
                  closeMenuMenuFilters={closeMenuMenuFilters}
                />
              </div>
            </div>
          </CardHeader>

          <FAQTable
            faqs={filteredFAQs}
            isLoading={isLoading}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </Card>
      </div>
    </div>
  );
}
