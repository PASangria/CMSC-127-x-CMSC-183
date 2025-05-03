import React from 'react';
import './css/ui.css';

export default function SearchBar({ onSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("query");
    if (onSearch) {
      onSearch(query);
    } else {
      alert(`You searched for '${query}'`);
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        name="query"
        placeholder="Search..."
        className="search-input"
      />
      <button type="submit" className="search-btn">Search</button>
    </form>
  );
}
