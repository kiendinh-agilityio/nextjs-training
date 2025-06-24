"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UsersTable } from "@/app/users/components/UsersTable";
import { UserForm } from "@/app/users/components/UserForm";
import { DialogConfirm } from "@/app/users/components/DialogConfirm";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/app/users/actions/actions";
import { validateForm, hasErrors, getErrorMessage } from "@/app/users/utils";
import { User, FormData, FormErrors, LoadingState } from "@/app/users/types";
import { toast } from "sonner";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "",
    status: "active",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    action: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    userId: number | null;
  }>({
    isOpen: false,
    userId: null,
  });

  const fetchUsers = async () => {
    setLoading({ isLoading: true, action: "fetch" });
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading({ isLoading: false, action: null });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setFormErrors(errors);

    if (hasErrors(errors)) {
      return;
    }

    setLoading({
      isLoading: true,
      action: editingUser ? "update" : "create",
    });

    try {
      if (editingUser) {
        await updateUser({ ...formData, id: editingUser.id });
        toast.success("User updated successfully");
      } else {
        await createUser(formData);
        toast.success("User created successfully");
      }

      setIsOpen(false);
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        status: "active",
      });
      setFormErrors({});
      fetchUsers();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading({ isLoading: false, action: null });
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      status: user.status,
    });
    setFormErrors({});
    setIsOpen(true);
  };

  const handleDelete = async (id: number) => {
    setDeleteDialog({
      isOpen: true,
      userId: id,
    });
  };

  const confirmDelete = async () => {
    if (deleteDialog.userId) {
      setLoading({ isLoading: true, action: "delete" });
      try {
        await deleteUser(deleteDialog.userId);
        toast.success("User deleted successfully");
        setDeleteDialog({
          isOpen: false,
          userId: null,
        });
        fetchUsers();
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading({ isLoading: false, action: null });
      }
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({
      isOpen: false,
      userId: null,
    });
  };

  const handleOpenAddUserDialog = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      status: "active",
    });
    setFormErrors({});
  };

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleOpenAddUserDialog}
              disabled={loading.isLoading}
            >
              Add New User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Edit User" : "Add New User"}
              </DialogTitle>
            </DialogHeader>
            <UserForm
              formData={formData}
              formErrors={formErrors}
              onChange={handleFormChange}
              onSubmit={handleSubmit}
              isEditing={!!editingUser}
              isLoading={loading.isLoading}
            />
          </DialogContent>
        </Dialog>
      </div>

      <UsersTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={loading.isLoading}
      />

      <DialogConfirm
        isOpen={deleteDialog.isOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={confirmDelete}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        isLoading={loading.isLoading}
      />
    </div>
  );
};

export default UsersPage;
