import React from "react";

export default function SearchBar(props) {
  const {
    handleSearchInput,
    handleSearchClear,
    inputValue,
    placeHolderText
  } = props;
  return (
    <div
      data-search
      role="search"
      className="bx--search bx--search--light bx--search--xl"
    >
      <label
        id="search-input-label-1"
        className="bx--label"
        htmlFor="search__input-1"
      >
        Search
      </label>
      <input
        className="bx--search-input"
        type="text"
        id="search__input-1"
        placeholder={placeHolderText}
        value={inputValue}
        onChange={handleSearchInput}
      />
      <svg
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        style={{ willChange: "transform" }}
        xmlns="http://www.w3.org/2000/svg"
        className="bx--search-magnifier"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M15,14.3L10.7,10c1.9-2.3,1.6-5.8-0.7-7.7S4.2,0.7,2.3,3S0.7,8.8,3,10.7c2,1.7,5,1.7,7,0l4.3,4.3L15,14.3z M2,6.5 C2,4,4,2,6.5,2S11,4,11,6.5S9,11,6.5,11S2,9,2,6.5z"></path>
      </svg>
      <button
        className="bx--search-close"
        title="Clear search input"
        aria-label="Clear search input"
        onClick={handleSearchClear}
      >
        <svg
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          style={{ willChange: "transform" }}
          xmlns="http://www.w3.org/2000/svg"
          className="bx--search-clear"
          width="20"
          height="20"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path>
        </svg>
      </button>
    </div>
  );
}
