import React, { useState} from 'react';
import NewsCard from '../components/NewsCard';
import '../css/Categories.css';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from '../contexts/LanguageSelector';
import useNewsApi from '../hooks/useNewsApi';

const categories = [
    { key: 'nation', name: 'category.nation' },
    { key: 'business', name: 'category.business' },
    { key: 'sports', name: 'category.sports' },
    { key: 'technology', name: 'category.technology' }
];
const maxOptions = [1, 2, 5, 10];
interface CategoriesProps {
    onCategorySelect?: (category: string) => void;
    onNavigate?: (tab: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect}) => {
    const { t, getApiLanguage } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState('nation');
    const [selectedMax, setSelectedMax] = useState(5);

    const { articles, loading, error } = useNewsApi({
        topic: selectedCategory,
        lang: getApiLanguage(),
        max: selectedMax
    });

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);

        // Call the prop function if provided
        if (onCategorySelect) {
            onCategorySelect(newCategory);
        }
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMax(parseInt(e.target.value, 10));
    };

    return (
        <div className="categories-container">
            <LanguageSelector />
            <div className="categories-header">
                <h1 className="categories-title">{t('categories.title')}</h1>
                <p className="categories-subtitle">{t('categories.subtitle')}</p>
            </div>
            <div className="categories-dropdowns">
                <label>
                    {t('categories.categoryLabel')}:&nbsp;
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        {categories.map(cat => (
                            <option key={cat.key} value={cat.key}>{t(cat.name)}</option>
                        ))}
                    </select>
                </label>
                <label>
                    {t('categories.maxLabel')}:&nbsp;
                    <select value={selectedMax} onChange={handleMaxChange}>
                        {maxOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="categories-news-list">
                {loading && <div>{t('categories.loading')}</div>}
                {error && <div>{error}</div>}
                {!loading && !error && articles.length === 0 && (
                    <div>{t('categories.noArticles')}</div>
                )}
                {!loading && !error && articles.length > 0 && (
                    <div className="categories-news-grid">
                        {articles.map((article, idx) => (
                            <NewsCard
                                key={idx}
                                title={article.title}
                                author={article.source?.name || article.author || ''}
                                date={article.publishedAt}
                                content={article.description || article.content || ''}
                                image={article.image}
                                url={article.url}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories;