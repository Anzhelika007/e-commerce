export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onClick?: (page: number) => void;
}

// Pagination Buttons
function Pagination({ totalPages, currentPage, onClick }: PaginationProps) {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }).map((_, i: number) => (
        <button
          type="button"
          key={`${i + 1}`}
          value={i}
          onClick={() => onClick && onClick(i)}
          className={`pagination-btn ${i === currentPage ? 'pagination-btn-active' : ''}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
