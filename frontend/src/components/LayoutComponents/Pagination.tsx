interface PaginationProps {
  page: number;          // current page (0-based)
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-4 text-text">

      <button
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        className="px-2 py-1 border rounded-full disabled:opacity-40"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-2 py-1 rounded-full ${
            i === page ? "bg-accent text-white" : ""
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={page === totalPages - 1}
        onClick={() => onPageChange(page + 1)}
        className="px-2 py-1 rounded-full border disabled:opacity-40"
      >
        Next
      </button>

    </div>
  );
};

