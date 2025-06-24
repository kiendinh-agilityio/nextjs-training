import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const CreateInvoice = () => (
  <Button variant="default">
    <Link href="/dashboard/invoices/create" className="flex items-center">
      <span className="hidden md:block">Create Invoice</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  </Button>
);

export const UpdateInvoice = ({ id }: { id: string }) => (
  <Link
    href={`/dashboard/invoices/${id}/edit`}
    className="rounded-md border p-2 hover:bg-gray-100"
  >
    <PencilIcon className="w-5" />
  </Link>
);

export const DeleteInvoice = ({ id }: { id: string }) => (
  <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
    <span className="sr-only">Delete</span>
    <TrashIcon className="w-5" />
  </button>
);
