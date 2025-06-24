import Form from "@/app/ui/invoices/create-form";
import { CustomerField } from "@/app/lib/definitions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Invoice",
};

const customers: CustomerField[] = [];

const CreateInvoicePage = () => (
  <div className="max-w-2xl mx-auto p-6">
    <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>
    <Form customers={customers} />
  </div>
);

export default CreateInvoicePage;
