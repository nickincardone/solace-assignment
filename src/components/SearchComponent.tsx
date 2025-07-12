interface SearchComponentProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  placeholder?: string;
  label?: string;
}

export default function SearchComponent({
  searchTerm,
  onSearchChange,
  onReset,
  placeholder = "Search...",
  label = "Search",
}: SearchComponentProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
          <div className="flex space-x-3">
            <input 
              id="search"
              type="text"
              placeholder={placeholder}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={onSearchChange}
              value={searchTerm}
            />
            <button 
              onClick={onReset}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 