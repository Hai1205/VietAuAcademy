"use client";

import { useCallback, useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { EStatus } from "@/utils/types/enum";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useProgramStore } from "@/utils/stores/programStore";
import CreateProgramDialog from "@/components/common/admin/programDashborad/CreateProgramDialog";
import UpdateProgramDialog from "@/components/common/admin/programDashborad/UpdateProgramDialog";
import { TableSearch } from "@/components/common/admin/TableSearch";
import { ProgramFilter } from "@/components/common/admin/programDashborad/ProgramFilter";
import { ProgramTable } from "@/components/common/admin/programDashborad/ProgramTable";
import { DashboardHeader } from "@/components/common/admin/DashboardHeader";

// Initialize empty filters
const initialFilters = { status: [] as string[] };

export default function ProgramDashboardPage() {
  const {
    getAllPrograms,
    createProgram,
    updateProgram,
    deleteProgram,
  } = useProgramStore();

  const [searchQuery, setSearchQuery] = useState("");
const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreateProgramOpen, setIsCreateProgramOpen] = useState(false);
  const [isUpdateProgramOpen, setIsUpdateProgramOpen] = useState(false);

  const [activeFilters, setActiveFilters] = useState<{
    status: string[];
  }>(initialFilters);
  const [allPrograms, setAllPrograms] = useState<IProgram[] | []>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<IProgram[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getAllPrograms();
      const data = res?.data?.programs || [];
      setAllPrograms(data);
      setFilteredPrograms(data);
      setIsLoading(false);
    };

    fetchData();
  }, [getAllPrograms]);

  // Function to filter data based on query and activeFilters
  const filterData = useCallback(
    (query: string, filters: { status: string[] }) => {
      let results = [...allPrograms];

      // Filter by search query
      if (query.trim()) {
        const searchTerms = query.toLowerCase().trim();
        results = results.filter(
          (program) =>
            program.title.toLowerCase().includes(searchTerms) ||
            program.description.toLowerCase().includes(searchTerms) ||
            program.country.toLowerCase().includes(searchTerms)
        );
      }

      // Filter by status
      if (filters.status.length > 0) {
        results = results.filter((program) =>
          filters.status.includes(program.status || "")
        );
      }

      setFilteredPrograms(results);
    },
    [allPrograms]
  );

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Filter data based on current searchQuery and activeFilters
      // Only filter when Search button is clicked
      filterData(searchQuery, activeFilters);
    },
    [searchQuery, activeFilters, filterData]
  );

  // Toggle filter without auto-filtering
  const toggleFilter = (value: string, type: "status") => {
    setActiveFilters((prev) => {
      const updated = { ...prev };
      if (updated[type]?.includes(value)) {
        updated[type] = updated[type].filter((item) => item !== value);
      } else {
        updated[type] = [...(updated[type] || []), value];
      }
      return updated;
    });
    // Removed auto-filtering when filter changes
  };

  // Removed useEffect that auto-filtered when activeFilters changed
  // to only filter when Apply button is clicked

  const clearFilters = () => {
    setActiveFilters(initialFilters);
    setSearchQuery("");
    setFilteredPrograms(allPrograms); // Reset filtered data
    closeMenuMenuFilters();
  };

  const applyFilters = () => {
    // Filter data based on current activeFilters and searchQuery
    // Only filter when Apply button is clicked
    filterData(searchQuery, activeFilters);
    closeMenuMenuFilters();
  };

  const [openMenuFilters, setOpenMenuFilters] = useState(false);
  const closeMenuMenuFilters = () => setOpenMenuFilters(false);

  type ExtendedProgramData = Omit<IProgram, "status"> & {
    status: EStatus;
    image?: File | null;
  };
  const defaultData: ExtendedProgramData = {
    _id: "",
    title: "",
    description: "",
    country: "",
    duration: "",
    tuition: "",
    opportunities: "",
    about: "",
    requirements: [],
    benefits: [],
    imageUrl: "",
    featured: false,
    status: EStatus.PUBLIC,
  };

  // Use useState with consistent initialization for client and server
  const [data, setData] = useState<ExtendedProgramData | null>(null);

  const handleChange = (
    field: keyof ExtendedProgramData,
    value: string | string[] | boolean | File | null
  ) => {
    setData((prev) => {
      // If prev is null, create a new object with default values
      if (!prev) {
        return { ...defaultData, [field]: value };
      }
      // If prev is not null, update the current value
      return { ...prev, [field]: value };
    });
  };

  const handleUpdate = async () => {
    if (data) {
      await updateProgram(
        data._id,
        data.title,
        data.description,
        data.country,
        data.duration,
        data.tuition,
        data.opportunities,
        data.about,
        data.image as File,
        data.requirements,
        data.benefits,
        data.featured,
        data.status
      );

      // Refresh the data after update
      const res = await getAllPrograms();
      const updatedData = res?.data?.programs || [];

      // Update both original and filtered data
      setAllPrograms(updatedData);

      // Re-apply current filters
      filterData(searchQuery, activeFilters);

      setIsUpdateProgramOpen(false);
    }
  };

  const handleCreate = async () => {
    if (data) {
      // Use image file if available
      const imageFile = data.image instanceof File ? data.image : null;

      await createProgram(
        data.title,
        data.description,
        data.country,
        data.duration,
        data.tuition,
        data.opportunities,
        data.about,
        imageFile,
        data.requirements,
        data.benefits,
        data.featured,
        data.status
      );

      // Refresh the data after creation
      const res = await getAllPrograms();
      const updatedData = res?.data?.programs || [];

      // Update both original and filtered data
      setAllPrograms(updatedData);

      // Re-apply current filters
      filterData(searchQuery, activeFilters);

      setIsCreateProgramOpen(false);
    }
  };

  const onDelete = async (program: IProgram) => {
    await deleteProgram(program._id);
  };

  const onUpdate = async (program: IProgram) => {
    setData(program);
    setIsUpdateProgramOpen(true);
  };

  return (
    <div className="space-y-4">
      <DashboardHeader
        title="Program Dashboard"
        onCreateClick={() => {
          // Initialize an empty object instead of null when creating new
          const defaultProgram: ExtendedProgramData = {
            _id: "",
            title: "",
            description: "",
            country: "",
            duration: "",
            tuition: "",
            opportunities: "",
            about: "",
            requirements: [],
            benefits: [],
            imageUrl: "",
            featured: true,
            status: EStatus.PUBLIC,
          };
          setData(defaultProgram);
          setIsCreateProgramOpen(true);
        }}
        createButtonText="Create Program"
      />

      {/* Use consistent key to avoid hydration issues */}
      <CreateProgramDialog
        isOpen={isCreateProgramOpen}
        onOpenChange={setIsCreateProgramOpen}
        onChange={handleChange}
        onProgramCreated={handleCreate}
        data={data}
        isLoading={isLoading}
      />

      <UpdateProgramDialog
        isOpen={isUpdateProgramOpen}
        onOpenChange={setIsUpdateProgramOpen}
        onChange={handleChange}
        data={data}
        onProgramUpdated={handleUpdate}
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
                  placeholder="Search Programs..."
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
                    const res = await getAllPrograms();
                    const data = res?.data?.programs || [];
                    setAllPrograms(data);
                    setFilteredPrograms(data);
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>

                <ProgramFilter
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

          <ProgramTable
            Programs={filteredPrograms}
            isLoading={isLoading}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </Card>
      </div>
    </div>
  );
}
