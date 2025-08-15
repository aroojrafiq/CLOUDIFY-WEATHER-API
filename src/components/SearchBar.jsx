import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import React from "react";
export default function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (loading) return;
    onSearch(city);
  };

  return (
    <div className="flex items-center gap-2 w-full max-w-xl mx-auto">
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search city…"
        className="flex-1 px-4 py-3 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 placeholder-white/70 outline-none focus:ring-2 focus:ring-white/40"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="px-4 py-3 rounded-xl bg-blue-500/90 hover:bg-blue-500 transition text-white shadow disabled:opacity-60 disabled:cursor-not-allowed"
        title="Search"
      >
        <FaSearch />
      </button>
    </div>
  );
}
