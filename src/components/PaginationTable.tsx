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
    wrapContent?: boolean;
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
          className={`px-3 py-2 text-sm rounded-md ${
            i === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          } transition-colors`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key} 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No advocates found
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td 
                      key={column.key} 
                      className={`px-6 py-4 text-sm text-gray-900 ${
                        column.wrapContent ? '' : 'whitespace-nowrap'
                      }`}
                    >
                      {column.render(item, index)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <div className="flex items-center justify-between bg-white px-6 py-3 border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{data.length}</span> of{' '}
            <span className="font-medium">{pagination.total}</span> advocates
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={!pagination.hasPreviousPage}
              className={`px-3 py-2 text-sm rounded-md ${
                pagination.hasPreviousPage
                  ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
              } transition-colors`}
            >
              Previous
            </button>
            
            <div className="flex space-x-1">
              {renderPageNumbers()}
            </div>
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className={`px-3 py-2 text-sm rounded-md ${
                pagination.hasNextPage
                  ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
              } transition-colors`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 