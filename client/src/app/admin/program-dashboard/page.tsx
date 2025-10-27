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

type ExtendedProgramData = Omit<IProgram, "status"> & {
  status: EStatus;
  image?: File | null;
};

const initialFilters = { status: [] as string[] };

export default function ProgramDashboardPage() {
  const {
    programsTable,
    getAllPrograms,
    createProgram,
    updateProgram,
    deleteProgram,
  } = useProgramStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreateProgramOpen, setIsCreateProgramOpen] = useState(false);
  const [isUpdateProgramOpen, setIsUpdateProgramOpen] = useState(false);

  const [activeFilters, setActiveFilters] = useState<{ status: string[] }>(
    initialFilters
  );
  const [filteredPrograms, setFilteredPrograms] =
    useState<IProgram[]>(programsTable);

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
    featured: false,
    status: EStatus.PUBLIC,
    image: null,
  };

  const [data, setData] = useState<ExtendedProgramData>(defaultProgram);

  // initial load
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getAllPrograms();
      setIsLoading(false);
    };
    fetchData();
  }, [getAllPrograms]);

  // filter logic
  const filterData = useCallback(
    (query: string, filters: { status: string[] }) => {
      let results = [...programsTable];
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        results = results.filter(
          (program) =>
            program.title.toLowerCase().includes(q) ||
            program.description.toLowerCase().includes(q) ||
            program.country.toLowerCase().includes(q)
        );
      }
      if (filters.status.length > 0) {
        results = results.filter((program) =>
          filters.status.includes(program.status || "")
        );
      }
      setFilteredPrograms(results);
    },
    [programsTable]
  );

  // filter when programsTable changes
  useEffect(() => {
    filterData(searchQuery, activeFilters);
  }, [programsTable, searchQuery, activeFilters, filterData]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      filterData(searchQuery, activeFilters);
    },
    [searchQuery, activeFilters, filterData]
  );

  const toggleFilter = (value: string, type: "status" = "status") => {
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
    setFilteredPrograms(programsTable);
    setOpenMenuFilters(false);
  };

  const applyFilters = () => {
    filterData(searchQuery, activeFilters);
    setOpenMenuFilters(false);
  };

  const [openMenuFilters, setOpenMenuFilters] = useState(false);

  const closeMenuMenuFilters = () => setOpenMenuFilters(false);

  // central onChange handler for form fields
  const handleChange = (
    field: keyof ExtendedProgramData,
    value: string | string[] | boolean | File | null
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // create
  const handleCreate = async () => {
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

    setIsCreateProgramOpen(false);
  };

  // update
  const handleUpdate = async () => {
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

    setIsUpdateProgramOpen(false);
  };

  const onDelete = async (program: IProgram) => {
    await deleteProgram(program._id);
  };

  const onUpdate = (program: IProgram) => {
    // ensure ExtendedProgramData shape
    setData({
      ...program,
      status: program.status as unknown as EStatus,
      image: null,
    });
    setIsUpdateProgramOpen(true);
  };

  const onRefresh = async () => {
    setActiveFilters(initialFilters);
    setSearchQuery("");
    setIsLoading(true);
    await getAllPrograms();
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <DashboardHeader
        title="Program Dashboard"
        onCreateClick={() => {
          setData(defaultProgram);
          setIsCreateProgramOpen(true);
        }}
        createButtonText="Create Program"
      />

      <CreateProgramDialog
        isOpen={isCreateProgramOpen}
        onOpenChange={setIsCreateProgramOpen}
        onChange={(field, value) =>
          handleChange(field as keyof ExtendedProgramData, value)
        }
        data={data}
        onProgramCreated={handleCreate}
      />

      <UpdateProgramDialog
        isOpen={isUpdateProgramOpen}
        onOpenChange={setIsUpdateProgramOpen}
        onChange={(field, value) =>
          handleChange(field as keyof ExtendedProgramData, value)
        }
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
                  onClick={onRefresh}
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
