import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "../types";

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
}

export const UsersTable = ({
  users,
  onEdit,
  onDelete,
  isLoading,
}: UsersTableProps) => {
  const handleEdit = (user: User) => {
    onEdit(user);
  };

  const handleDelete = (id: number) => {
    onDelete(id);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phoneNumber}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  user.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user.status}
              </span>
            </TableCell>
            <TableCell>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit.bind(null, user)}
                  disabled={isLoading}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete.bind(null, user.id)}
                  disabled={isLoading}
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
