import { Suspense } from "react";

import LikeButton from "@/app/ui/like-button";
import ViewCount from "@/app/ui/view-count";
import CommentForm from "@/app/ui/comment-form";

interface Customer {
  id: string;
  name: string;
  email: string;
}

// Component with default caching (cache: 'force-cache')
const DefaultCachedCustomers = async () => {
  const response = await fetch("http://localhost:3000/api/customers", {
    cache: "force-cache",
  });
  const customers: Customer[] = await response.json();

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Default Cached (force-cache)</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id} className="mb-2">
            {customer.name} - {customer.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component with no caching (cache: 'no-store')
const NoCacheCustomers = async () => {
  const response = await fetch("http://localhost:3000/api/customers", {
    cache: "no-store",
  });
  const customers: Customer[] = await response.json();

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">No Cache (no-store)</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id} className="mb-2">
            {customer.name} - {customer.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component with revalidation (next.revalidate)
const RevalidatedCustomers = async () => {
  const response = await fetch("http://localhost:3000/api/customers", {
    next: { revalidate: 10 }, // Revalidate every 10 seconds
  });
  const customers: Customer[] = await response.json();

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Revalidated (10s)</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id} className="mb-2">
            {customer.name} - {customer.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Page = () => (
  <>
    <p>Customers Page</p>
    <LikeButton initialLikes={0} />
    <ViewCount initialViews={0} />
    <CommentForm />

    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Next.js Caching Examples</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Suspense fallback={<div>Loading default cached...</div>}>
          <DefaultCachedCustomers />
        </Suspense>
        <Suspense fallback={<div>Loading no cache...</div>}>
          <NoCacheCustomers />
        </Suspense>
        <Suspense fallback={<div>Loading revalidated...</div>}>
          <RevalidatedCustomers />
        </Suspense>
      </div>
    </div>
  </>
);
