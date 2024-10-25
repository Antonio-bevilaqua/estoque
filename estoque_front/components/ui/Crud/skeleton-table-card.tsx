"use client";
import AutoTableSkeleton from "../AutoTable/auto-table-skeleton";
import CardSnippet from "../card-snippet";
import { Skeleton } from "../skeleton";

export type SkeletonTableCardProps = {
  colNumber?: number;
  rowNumber?: number;
};

export default function SkeletonTableCard({
  colNumber = 5,
  rowNumber = 10,
}: SkeletonTableCardProps) {
  return (
    <CardSnippet
      title={<Skeleton className="w-full h-[20px]" />}
      header={
        <div className="grid ml-4">
          <div className="flex flex-col gap-3 md:gap-4 md:flex-row justify-between md:items-end">
            <Skeleton className="w-[200px] h-[40px]" />

            <Skeleton className="w-[150px] h-[40px]" />
          </div>
        </div>
      }
    >
      <AutoTableSkeleton colNumber={colNumber} pageSize={rowNumber} />
    </CardSnippet>
  );
}
