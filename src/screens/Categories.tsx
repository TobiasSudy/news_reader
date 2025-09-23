import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import '../css/Categories.css';

const categories = [
    { key: 'nation', name: 'Nation' },
    { key: 'business', name: 'Wirtschaft' },
    { key: 'sports', name: 'Sport' },
    { key: 'technology', name: 'Technologie' }
];
const maxOptions = [1, 2, 5, 10];

interface Article {
    title: string;
    author: string;
    publishedAt: string;
    content: string;
    image: string;
    url: string;
    description?: string;
    source?: { name: string };
}

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState('nation');
    const [selectedMax, setSelectedMax] = useState(5);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
                    params: {
                        topic: selectedCategory,
                        lang: 'de',
                        max: selectedMax,
                        token: '90d89c221142ab8c548888618acaa1e8'
                    }
                });
                setArticles(response.data.articles || []);
            } catch (err) {
                setError('Fehler beim Laden der Nachrichten');
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [selectedCategory, selectedMax]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMax(parseInt(e.target.value, 10));
    };

    return (
        <div className="categories-container">
            <div className="categories-header">
                <h1 className="categories-title">Kategorien</h1>
                <p className="categories-subtitle">Wählen Sie eine Kategorie und die Anzahl der Artikel.</p>
            </div>
            <div className="categories-dropdowns">
                <label>
                    Kategorie:&nbsp;
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        {categories.map(cat => (
                            <option key={cat.key} value={cat.key}>{cat.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Anzahl Artikel:&nbsp;
                    <select value={selectedMax} onChange={handleMaxChange}>
                        {maxOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="categories-news-list">
                {loading && <div>Lade Nachrichten...</div>}
                {error && <div>{error}</div>}
                {!loading && !error && articles.length === 0 && (
                    <div>Keine Artikel gefunden.</div>
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