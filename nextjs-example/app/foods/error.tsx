"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const ErrorBoundary = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-4">
        {error.message || "An error occurred while loading the page."}
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
};

export default ErrorBoundary;
