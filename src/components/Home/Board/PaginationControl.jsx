import "../../../styles/Home/Board.css";
import PropTypes from "prop-types";

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

PaginationControl.propTypes = {
  paginationProps: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    onNextPage: PropTypes.func.isRequired,
    onPrevPage: PropTypes.func.isRequired,
    pages: PropTypes.number.isRequired
  }).isRequired
};

export default PaginationControl;
