import { useState } from 'react';

/**
 * Search bar component for entering city name
 * Styled with gradient neon theme
 */
export const SearchBar = ({ onSearch, isLoading }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
      setSearchInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-3">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for a city..."
          className="flex-1 px-5 py-3 bg-gray-800/50 border-2 border-cyan-500/50 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 disabled:opacity-50 text-white placeholder-gray-400 font-semibold transition backdrop-blur-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transition transform hover:scale-105 shadow-lg shadow-cyan-500/50 whitespace-nowrap"
        >
          {isLoading ? '⏳ Searching...' : '🔎 Search'}
        </button>
      </div>
    </form>
  );
};
