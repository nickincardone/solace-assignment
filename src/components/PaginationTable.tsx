import { PaginationMetadata } from "../app/apiTypes";

interface PaginationTableProps<T> {
  data: T[];
  pagination: PaginationMetadata | null;
  currentPage: number;
  onPageChange: (page: number) => void;
  columns: Array<{
    key: string;
    header: string;
    render: (item: T, index: number) => React.ReactNode;
  }>;
}

export default function PaginationTable<T>({
  data,
  pagination,
  currentPage,
  onPageChange,
  columns,
}: PaginationTableProps<T>) {
  const renderPageNumbers = () => {
    if (!pagination) return null;

    const pageNumbers = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render(item, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {pagination && (
        <div>
          <div>
            Showing {data.length} of {pagination.total} items
          </div>
          <div>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={!pagination.hasPreviousPage}
            >
              Previous
            </button>
            
            {renderPageNumbers()}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!pagination.hasNextPage}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 