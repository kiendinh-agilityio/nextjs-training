import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormData, FormErrors } from "../types";

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
}

interface UserFormProps {
  formData: FormData;
  formErrors: FormErrors;
  onChange: (field: keyof FormData, value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isEditing: boolean;
  isLoading: boolean;
}

export const UserForm = ({
  formData,
  formErrors,
  onChange,
  onSubmit,
  isEditing,
  isLoading,
}: UserFormProps) => {
  const createInputHandler = (field: keyof FormData) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(field, e.target.value);
    };
  };

  const createSelectHandler = (field: keyof FormData) => {
    return (value: string) => {
      onChange(field, value);
    };
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={createInputHandler("name")}
          required
          disabled={isLoading}
        />
        {formErrors.name && (
          <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={createInputHandler("email")}
          required
          disabled={isLoading}
        />
        {formErrors.email && (
          <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
        )}
      </div>
      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={createInputHandler("phoneNumber")}
          required
          disabled={isLoading}
        />
        {formErrors.phoneNumber && (
          <p className="text-sm text-red-500 mt-1">{formErrors.phoneNumber}</p>
        )}
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={createSelectHandler("status")}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        {formErrors.status && (
          <p className="text-sm text-red-500 mt-1">{formErrors.status}</p>
        )}
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : isEditing ? "Update" : "Create"}
      </Button>
    </form>
  );
};
