import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "../css/SearchFunction.css";

interface SearchBarProps {
    onSearch: (text: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Artikel suchen..." }) => {
    const [searchText, setSearchText] = useState("");

    const handleSearch = (text: string) => {
        setSearchText(text);
        onSearch(text);
    };

    const handleClear = () => {
        setSearchText("");
        onSearch("");
    };

    return (
        <div className="searchbar-container">
            <FaSearch className="search-icon" />
            <input
                type="text"
                className="search-input"
                placeholder={placeholder}
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
            />
            {searchText.length > 0 && (
                <button className="clear-button" onClick={handleClear}>
                    <FaTimes />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
