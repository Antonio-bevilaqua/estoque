import { useId } from "react";
import Paginator, { PaginationType } from "../../paginator";
import useAutoTable from "../hook/useAutoTable";

interface AutoTablePaginationProps
  extends Pick<
    PaginationType,
    "size" | "color" | "totalButtons" | "withFirst" | "withLast"
  > {
  className?: string;
  itemClassName?: string;
  linkClassName?: string;
  nextClassName?: string;
  activeClassName?: string;
  previousClassName?: string;
}
export default function AutoTablePagination<TData>({
  className = "",
  itemClassName = "",
  linkClassName = "",
  previousClassName = "",
  nextClassName = "",
  activeClassName = "",
  totalButtons = 5,
  withFirst = true,
  withLast = true,
  ...props
}: AutoTablePaginationProps) {
  const { page, lastPage, setPage } = useAutoTable<TData>();
  const id = useId();

  return (
    <Paginator
      page={page}
      onPageChange={(page: number) => setPage(page)}
      lastPage={lastPage}
      className={className}
      itemClassName={itemClassName}
      linkClassName={linkClassName}
      previousClassName={previousClassName}
      nextClassName={nextClassName}
      activeClassName={activeClassName}
      withFirst={withFirst}
      withLast={withLast}
      totalButtons={totalButtons}
      {...props}
    />
  );
}
