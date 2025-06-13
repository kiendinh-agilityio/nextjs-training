import { UpdateInvoice, DeleteInvoice } from "@/app/ui/invoices/buttons";
import InvoiceStatus from "@/app/ui/invoices/status";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchFilteredInvoices } from "@/app/lib/data";
import { InvoicesTable as InvoicesTableType } from "@/app/lib/definitions";
import { customers } from "@/app/lib/placeholder-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const InvoicesTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const rawInvoices = await fetchFilteredInvoices(query, currentPage);

  const invoices: InvoicesTableType[] = rawInvoices.map((invoice) => {
    const customer = customers.find((c) => c.id === invoice.customer_id);
    return {
      ...invoice,
      id: invoice.id,
      name: customer?.name || "",
      email: customer?.email || "",
      image_url: customer?.image_url || "",
      status: invoice.status as "pending" | "paid",
    };
  });

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice: InvoicesTableType) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Avatar className="mr-2 h-7 w-7">
                        <AvatarImage
                          src={invoice.image_url}
                          alt={`${invoice.name}'s profile picture`}
                        />
                        <AvatarFallback>
                          {invoice.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices?.map((invoice: InvoicesTableType) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-7 w-7">
                          <AvatarImage
                            src={invoice.image_url}
                            alt={`${invoice.name}'s profile picture`}
                          />
                          <AvatarFallback>
                            {invoice.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <p>{invoice.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>{invoice.email}</TableCell>
                    <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell>{formatDateToLocal(invoice.date)}</TableCell>
                    <TableCell>
                      <InvoiceStatus status={invoice.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-3">
                        <UpdateInvoice id={invoice.id} />
                        <DeleteInvoice id={invoice.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesTable;
