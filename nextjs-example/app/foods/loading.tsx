import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => (
  <div className="container mx-auto py-8">
    <Skeleton className="h-8 w-48 mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-1">
        <Skeleton className="h-[600px] w-full" />
      </div>
    </div>
  </div>
);

export default Loading;
