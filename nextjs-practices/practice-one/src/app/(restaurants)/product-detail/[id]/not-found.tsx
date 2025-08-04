import Link from 'next/link';

// import icons
import { AlertTriangle } from 'lucide-react';

// import components
import { Heading } from '@/components/common/ui/heading';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-8">
      <AlertTriangle className="text-destructive mb-8 h-16 w-16" />
      <Heading size="md" className="mb-8 text-error">
        404 - Product Not Found
      </Heading>
      <p className="mb-8 max-w-[500px] text-center text-lg font-semiBold text-[#a0aec0]">
        We couldn’t find the product you are looking for. Please check the URL
        or return to the restaurant list.
      </p>
      <Link
        href="/restaurant"
        className="rounded-xl bg-gray-200 px-8 py-4 text-lg font-semiBold text-secondary transition hover:bg-gray-300"
      >
        Go back
      </Link>
    </div>
  );
}
