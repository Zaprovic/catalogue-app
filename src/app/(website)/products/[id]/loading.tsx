import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
      <Skeleton className="size-[400px]" />
      <Skeleton className="size-[400px]" />
    </div>
  );
};

export default Loading;
