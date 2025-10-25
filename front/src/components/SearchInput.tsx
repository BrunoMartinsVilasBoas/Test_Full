import React from 'react';

/**
 * Props for the SearchInput component
 */
interface SearchInputProps {
  /**
   * Callback function triggered when the search input value changes
   * @param searchValue - The current value of the search input
   */
  onSearch: (searchValue: string) => void;
  /**
   * Optional flag to disable the input while loading
   * @default false
   */
  loading?: boolean;
}

/**
 * SearchInput component - A controlled search input field
 *
 * @component
 * @param props - The component props
 * @returns A search input field that triggers a callback on value change
 *
 * @example
 * ```tsx
 * <SearchInput
 *   onSearch={(value) => console.log(value)}
 *   loading={false}
 * />
 * ```
 */
export const SearchInput: React.FC<SearchInputProps> = ({ onSearch, loading = false }) => {
  return (
    <div className="container_search">
      <input
        type="text"
        placeholder="Search for a user"
        onChange={(e) => onSearch(e.target.value)}
        disabled={loading}
      />
    </div>
  );
};
