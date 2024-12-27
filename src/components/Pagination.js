import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages === 0) return null;

  const pages = [];
  const maxVisiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (currentPage > 1) {
    pages.push(
      <button
        key="prev"
        className="btn btn-light me-2"
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        className={`btn ${
          i === currentPage ? "btn-primary" : "btn-light"
        } mx-1`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  if (currentPage < totalPages) {
    pages.push(
      <button
        key="next"
        className="btn btn-light ms-2"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    );
  }

  return <div className="d-flex justify-content-center mt-3">{pages}</div>;
};

export default Pagination;
