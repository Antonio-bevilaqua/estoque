import React, { useId } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginationArray } from "@/lib/utils";
import { ButtonProps } from "./button";

export interface PaginationType extends Pick<ButtonProps, "size" | "color"> {
  page: number;
  onPageChange: (page: number) => any;
  lastPage: number;
  withFirst?: boolean;
  withLast?: boolean;
  totalButtons?: number;
  className?: string;
  itemClassName?: string;
  linkClassName?: string;
  nextClassName?: string;
  activeClassName?: string;
  previousClassName?: string;
  firstClassName?: string;
  lastClassName?: string;
}

export default function Paginator({
  page,
  onPageChange,
  lastPage,
  totalButtons = 5,
  withFirst = false,
  withLast = false,
  className = "",
  itemClassName = "",
  linkClassName = "",
  previousClassName = "",
  nextClassName = "",
  activeClassName = "",
  ...props
}: PaginationType) {
  const id = useId();
  const pageLinks = getPaginationArray(page, lastPage, totalButtons);
  return (
    <Pagination className={className}>
      <PaginationContent>
        {withFirst && (
          <PaginationItem className={itemClassName}>
            <PaginationFirst
              disabled={page === 1}
              onClick={() => onPageChange(1)}
              {...props}
              className={
                page === 1
                  ? previousClassName
                  : `${previousClassName} cursor-pointer`
              }
            />
          </PaginationItem>
        )}
        <PaginationItem className={itemClassName}>
          <PaginationPrevious
            disabled={page === 1}
            onClick={() => onPageChange(page === 1 ? 1 : page - 1)}
            {...props}
            className={
              page === 1
                ? previousClassName
                : `${previousClassName} cursor-pointer`
            }
          />
        </PaginationItem>
        {pageLinks[0] > 1 && (
          <PaginationItem className={itemClassName}>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pageLinks.map((pageNumber: number, index: number) => (
          <PaginationItem key={`${id}_page_${index}`}>
            <PaginationLink
              onClick={() => onPageChange(pageNumber)}
              disabled={pageNumber === page}
              isActive={pageNumber === page}
              {...props}
              className={
                pageNumber === page
                  ? activeClassName
                  : `${linkClassName} cursor-pointer`
              }
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        {pageLinks[pageLinks.length - 1] < lastPage && (
          <PaginationItem className={itemClassName}>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem className={itemClassName}>
          <PaginationNext
            disabled={page === lastPage}
            onClick={() =>
              onPageChange(page === lastPage ? lastPage : page + 1)
            }
            {...props}
            className={
              page === lastPage
                ? nextClassName
                : `${nextClassName} cursor-pointer`
            }
          />
        </PaginationItem>
        {withLast && (
          <PaginationItem className={itemClassName}>
            <PaginationLast
              disabled={page === lastPage}
              onClick={() => onPageChange(lastPage)}
              {...props}
              className={
                page === lastPage
                  ? nextClassName
                  : `${nextClassName} cursor-pointer`
              }
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
