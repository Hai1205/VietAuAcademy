"use client";

import { useCallback, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { RefreshCw } from "lucide-react";
import { EUserStatus } from "@/utils/types/enum";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/utils/stores/userStore";
import { DashboardHeader } from "@/components/common/admin/DashboardHeader";
import CreateUserDialog from "@/components/common/admin/userDashboard/CreateUserDialog";
import UpdateUserDialog from "@/components/common/admin/userDashboard/UpdateUserDialog";
import { TableSearch } from "@/components/common/admin/TableSearch";
import { UserFilter } from "@/components/common/admin/userDashboard/UserFilter";
import { UserTable } from "@/components/common/admin/userDashboard/UserTable";
import { useAuthStore } from "@/utils/stores/authStore";

// Initialize empty filters
const initialFilters = { status: [] as string[] };

function UserDashboardPage() {
  const { usersTable, getAllUsers, createUser, updateUser, deleteUser } = useUserStore();
  const { resetPassword } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);
  // const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  const [activeFilters, setActiveFilters] = useState<{
    status: string[];
  }>(initialFilters);
  const [allUsers, setAllUsers] = useState<IUser[] | []>(usersTable);
  const [filteredUsers, setFilteredUsers] = useState<IUser[] | []>(usersTable);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getAllUsers();
      const data = res?.data?.users || [];
      setAllUsers(data);
      setFilteredUsers(data);
      setIsLoading(false);
    };

    // Skip window check to avoid hydration error
    fetchData();
  }, [getAllUsers]);

  // Function to filter data based on query and activeFilters
  const filterData = useCallback(
    (query: string, filters: { status: string[] }) => {
      let results = [...allUsers];

      // Filter by search query
      if (query.trim()) {
        const searchTerms = query.toLowerCase().trim();
        results = results.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerms) ||
            user.email.toLowerCase().includes(searchTerms) ||
            user.phone.toLowerCase().includes(searchTerms)
        );
      }

      // Filter by status
      if (filters.status.length > 0) {
        results = results.filter((user) =>
          filters.status.includes(user.status || "")
        );
      }

      setFilteredUsers(results);
    },
    [allUsers]
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
    setFilteredUsers(allUsers); // Reset filtered data
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

  // Use a key to reset the dialog data completely between opens
  const [dialogKey, setDialogKey] = useState(0);
  // Use extended type for user data to include password field
  // Ensure correct typing to avoid hydration error
  type ExtendedUserData = Omit<IUser, "status"> & {
    status: EUserStatus;
    password?: string;
  };

  // Use useState with consistent initialization for client and server
  const [data, setData] = useState<ExtendedUserData | null>(null);

  const handleChange = (
    field: keyof ExtendedUserData,
    value: string | string[] | boolean
  ) => {
    setData((prev) => {
      // If prev is null, create a new object with default values
      if (!prev) {
        const defaultData = {
          _id: "",
          email: "",
          password: "",
          name: "",
          phone: "",
          role: "user",
          status: EUserStatus.PENDING,
        };
        return { ...defaultData, [field]: value } as ExtendedUserData;
      }
      // If prev is not null, update the current value
      return { ...prev, [field]: value };
    });
  };

  const handleUpdate = async () => {
    if (data) {
      await updateUser(
        data._id,
        data.email,
        data.password || "",
        data.name,
        data.phone,
        data.status
      );

      setIsUpdateUserOpen(false);
    }
  };

  const handleCreate = async () => {
    if (data) {
      await createUser(
        data.email,
        data.password || "",
        data.name,
        data.phone,
        data.status
      );

      setIsCreateUserOpen(false);
    }
  };

  const onDelete = async (user: IUser) => {
    await deleteUser(user._id);
  };

  const onUpdate = async (user: IUser) => {
    setData(user);
    setIsUpdateUserOpen(true);
  };

  const onResetPassword = async (user: IUser) => {
    if (!user) {
      return;
    }
    
    await resetPassword(user?.email);
  };

  return (
    <div className="space-y-4">
      <DashboardHeader
        title="User Dashboard"
        onCreateClick={() => {
          // Initialize an empty object instead of null when creating new
          const defaultUser: ExtendedUserData = {
            _id: "",
            email: "",
            password: "",
            name: "",
            phone: "",
            status: EUserStatus.PENDING,
          };
          setData(defaultUser);
          setIsCreateUserOpen(true);
        }}
        createButtonText="Create User"
      />

      {/* Use consistent key to avoid hydration issues */}
      <CreateUserDialog
        key={`create-${dialogKey}-${isCreateUserOpen ? "open" : "closed"}`}
        isOpen={isCreateUserOpen}
        onOpenChange={(open) => {
          setIsCreateUserOpen(open);
          if (!open) {
            // Reset data to null when closing dialog
            setData(null);
            setDialogKey((prev) => prev + 1);
          }
        }}
        onChange={handleChange}
        onUserCreated={handleCreate}
        data={data}
      />

      <UpdateUserDialog
        key={`update-${dialogKey}-${isUpdateUserOpen ? "open" : "closed"}`}
        isOpen={isUpdateUserOpen}
        onOpenChange={(open) => {
          setIsUpdateUserOpen(open);
          if (!open) {
            setData(null);
            setDialogKey((prev) => prev + 1);
          }
        }}
        onChange={handleChange}
        data={data}
        onUserUpdated={handleUpdate}
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
                  placeholder="Search Users..."
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
                    const res = await getAllUsers();
                    const data = res?.data?.users || [];
                    setAllUsers(data);
                    setFilteredUsers(data);
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>

                <UserFilter
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

          <UserTable
            Users={filteredUsers}
            isLoading={isLoading}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onResetPassword={onResetPassword}
          />
        </Card>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(UserDashboardPage), {
  ssr: false,
});
