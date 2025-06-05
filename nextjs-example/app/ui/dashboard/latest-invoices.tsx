import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices, fetchCustomers } from '@/app/lib/data';
import {
  LatestInvoiceRaw,
  CustomerField,
  LatestInvoice,
} from '@/app/lib/definitions';
import { formatCurrency } from '@/app/lib/utils';

const LatestInvoices = async () => {
  const latestInvoicesRaw: LatestInvoiceRaw[] = await fetchLatestInvoices();
  const customers: CustomerField[] = await fetchCustomers();

  // Combine latest invoices with customer data and format amount
  const latestInvoices: LatestInvoice[] = latestInvoicesRaw.map((invoice) => {
    const customer = customers.find((cust) => cust.id === invoice.customer_id);
    return {
      id: invoice.id,
      name: customer?.name || 'Unknown Customer',
      image_url: customer?.image_url || '/customers/default-customer.png',
      email: customer?.email || 'N/A',
      amount: formatCurrency(invoice.amount),
      customer_id: invoice.customer_id,
    };
  });

  return (
    <div className='flex w-full flex-col md:col-span-4'>
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className='flex grow flex-col justify-between rounded-xl bg-gray-50 p-4'>
        <div className='bg-white px-6'>
          {latestInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className='flex flex-row items-center justify-between py-3'
            >
              <div className='flex items-center'>
                <Image
                  src={invoice.image_url}
                  alt={`${invoice.name}'s profile picture`}
                  className='mr-4 rounded-full'
                  width={32}
                  height={32}
                />
                <div className='min-w-0'>
                  <p className='truncate text-sm font-semibold md:text-base'>
                    {invoice.name}
                  </p>
                  <p className='hidden text-sm text-gray-500 sm:block'>
                    {invoice.email}
                  </p>
                </div>
              </div>
              <p
                className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
              >
                {invoice.amount}
              </p>
            </div>
          ))}
        </div>
        <div className='flex items-center pb-2 pt-6'>
          <ArrowPathIcon className='h-5 w-5 text-gray-500' />
          <h3 className='ml-2 text-sm text-gray-500 '>Updated just now</h3>
        </div>
      </div>
    </div>
  );
};

export default LatestInvoices;
