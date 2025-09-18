import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./SearchBar.css";

interface SearchBarProps {
    onSearch: (text: string) => void;
    onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
    const [searchText, setSearchText] = useState("");

    const handleSearch = (text: string) => {
        setSearchText(text);
        onSearch(text);
    };

    const handleClear = () => {
        setSearchText("");
        onClear();
    };

    return (
        <div className="searchbar-container">
            <FaSearch className="search-icon" />
            <input
                type="text"
                className="search-input"
                placeholder="Suchen nach Name, E-Mail, Tel, Bemerkung..."
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
