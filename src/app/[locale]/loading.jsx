import { Skeleton } from "@nextui-org/react";

const Loading = () => {
  return (
    <main>
      <div className="space-y-3">
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/6 rounded-lg">
          <div className="h-3 w-2/6 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="w-3/12 rounded-lg">
          <div className="h-3 w-3/12 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-1/5 rounded-lg">
          <div className="h-3 w-1/5 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="w-2/12 rounded-lg">
          <div className="h-3 w-2/12 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
    </main>
  );
};

export default Loading;
