import { Skeleton } from "../ui/skeleton";

const GlobalMetricsLoading = () => {
  return (
    <div className="flex flex-col container gap-4 pt-36 mb-4 text-black dark:text-white">
      <h1 className="text-xl md:text-3xl font-semibold">
        Today's Global Metrics
      </h1>

      <Skeleton className="h-[24px]" />
    </div>
  );
};

export default GlobalMetricsLoading;
