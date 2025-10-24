import React from 'react';

interface SearchInputProps {
  onSearch: (searchValue: string) => void;
  loading?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch, loading = false }) => {
  return (
    <section className="container_search">
      <input
        type="text"
        placeholder="Search for a user"
        onChange={(e) => onSearch(e.target.value)}
        disabled={loading}
      />
    </section>
  );
};
