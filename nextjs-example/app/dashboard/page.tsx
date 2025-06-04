import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCustomers,
  fetchCardData,
} from "@/app/lib/data";
import {
  LatestInvoiceRaw,
  CustomerField,
  LatestInvoice,
} from "@/app/lib/definitions";
import { formatCurrency } from "@/app/lib/utils";

const Page = async () => {
  const revenue = await fetchRevenue();
  const latestInvoicesRaw: LatestInvoiceRaw[] = await fetchLatestInvoices();
  const customers: CustomerField[] = await fetchCustomers();

  // Combine latest invoices with customer data and format amount
  const latestInvoices: LatestInvoice[] = latestInvoicesRaw.map((invoice) => {
    const customer = customers.find((cust) => cust.id === invoice.customer_id);
    return {
      id: invoice.id,
      name: customer?.name || "Unknown Customer",
      image_url: customer?.image_url || "/customers/default-customer.png",
      email: customer?.email || "N/A",
      amount: formatCurrency(invoice.amount),
      customer_id: invoice.customer_id,
    };
  });

  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
};

export default Page;
