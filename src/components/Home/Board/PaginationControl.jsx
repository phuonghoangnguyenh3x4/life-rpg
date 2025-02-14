import React from "react";
import "../../../styles/Home/Board.css";

const PaginationControl = ({ paginationProps }) => {
  return (
    <>
      <div className="pagination-controls">
        <button onClick={paginationProps.onPrevPage} disabled={paginationProps.currentPage === 1}>
          Previous
        </button>
        <button onClick={paginationProps.onNextPage} disabled={paginationProps.currentPage === paginationProps.pages}>
          Next
        </button>
      </div>
    </>
  );
};

export default PaginationControl;
