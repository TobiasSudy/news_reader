import React, { useState } from 'react';

interface CategoryCardProps {
    onCategoryChange: (category: string) => void;
    onMaxChange: (max: number) => void;
}

const categories = [
    { key: 'nation', name: 'Nation' },
    { key: 'business', name: 'Wirtschaft' },
    { key: 'sports', name: 'Sport' },
    { key: 'technology', name: 'Technologie' }
];

const maxOptions = [1, 2, 5, 10];

const CategoryCard: React.FC<CategoryCardProps> = ({ onCategoryChange, onMaxChange }) => {
    const [selectedCategory, setSelectedCategory] = useState('nation');
    const [selectedMax, setSelectedMax] = useState(5);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        onCategoryChange(e.target.value);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const max = parseInt(e.target.value, 10);
        setSelectedMax(max);
        onMaxChange(max);
    };

    return (
        <div className="category-card">
            <label>
                Kategorie:&nbsp;
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    {categories.map(cat => (
                        <option key={cat.key} value={cat.key}>{cat.name}</option>
                    ))}
                </select>
            </label>
            <label style={{ marginLeft: 16 }}>
                Anzahl Artikel:&nbsp;
                <select value={selectedMax} onChange={handleMaxChange}>
                    {maxOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default CategoryCard;