import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { notFound } from "next/navigation";
import EditInvoiceForm from "@/app/ui/invoices/edit-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Invoice",
};

const EditInvoicePage = async ({ params }: { params: { id: string } }) => {
  const id = await Promise.resolve(params.id);

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Invoice</h1>
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  );
};

export default EditInvoicePage;
