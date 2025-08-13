import React from "react";
import * as S from "./Pagination.styles";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | "...")[] = [];

    const left = Math.max(currentPage - 1, 2);
    const right = Math.min(currentPage + 1, totalPages - 1);

    pages.push(1);

    if (left > 2) pages.push("...");

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <S.Container>
      {getPages().map((p, idx) =>
        p === "..." ? (
          <S.Ellipsis key={`ellipsis-${idx}`}>...</S.Ellipsis>
        ) : (
          <S.PageButton
            key={p}
            active={p === currentPage}
            onClick={() => onPageChange(Number(p))}
          >
            {p}
          </S.PageButton>
        ),
      )}
    </S.Container>
  );
};

export default Pagination;
