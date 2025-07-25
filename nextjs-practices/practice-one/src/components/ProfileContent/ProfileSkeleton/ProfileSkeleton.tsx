import { Skeleton } from '@/components/common/ui/skeleton';

const ProfileSkeleton = () => (
  <div className="container mx-auto flex min-h-screen flex-col items-start pt-12 sm:px-0">
    <div className="mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-base">
      {/* Skeleton Header */}
      <div className="flex w-full flex-col items-center justify-between rounded-t-xl bg-[#0b163f] px-8 pb-6 pt-8 md:flex-row">
        <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-orange-400 shadow-lg">
          <Skeleton className="h-full w-full rounded-full" />
        </div>
        <div className="flex flex-col items-center md:items-start">
          <Skeleton className="mb-2 h-10 w-60 rounded" />
          <Skeleton className="h-5 w-48 rounded" />
        </div>
      </div>
      {/* Skeleton Info + Actions */}
      <div className="flex flex-col items-center bg-[#F8F9FB] px-8 pb-8">
        <div className="flex w-full justify-center">
          <article className="mt-10 min-w-[280px] flex-1 rounded-xl bg-white p-6 shadow-base">
            <Skeleton className="mb-4 h-6 w-48 rounded" />
            <div className="flex flex-col gap-2 md:justify-between">
              <div className="flex flex-col gap-1 md:flex-row md:justify-between">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-40 rounded" />
              </div>
              <div className="flex flex-col gap-1 md:flex-row md:justify-between">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-32 rounded" />
              </div>
              <div className="flex flex-col gap-1 md:flex-row md:justify-between">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-48 rounded" />
              </div>
            </div>
          </article>
        </div>
        <div className="mt-8 flex w-full justify-center gap-4 md:justify-end">
          <Skeleton className="h-12 w-36 rounded-md" />
        </div>
      </div>
    </div>
  </div>
);

export default ProfileSkeleton;
