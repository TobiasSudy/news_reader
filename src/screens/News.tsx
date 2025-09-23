import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import '../css/News.css';

interface Article {
    title: string;
    author: string;
    publishedAt: string;
    content: string;
    image: string;
    url: string;
}

interface NewsProps {
    selectedCategory: string;
    maxArticles?: number;
    onCategoryChange: (category: string) => void;
}

const News = ({ selectedCategory, maxArticles = 10, onCategoryChange }: NewsProps) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [showScrollTop, setShowScrollTop] = useState(false);
    const topRef = useRef<HTMLDivElement>(null);

    const categories = [
        { key: 'general', name: 'Allgemein' },
        { key: 'technology', name: 'Technologie' },
        { key: 'science', name: 'Wissenschaft' },
        { key: 'health', name: 'Gesundheit' },
        { key: 'business', name: 'Wirtschaft' },
        { key: 'sports', name: 'Sport' }
    ];

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
                    params: {
                        topic: selectedCategory,
                        lang: 'de',
                        max: maxArticles,
                        token: '90d89c221142ab8c548888618acaa1e8'
                    }
                });
                // Die API liefert ein Feld "articles"
                setArticles(response.data.articles || []);
            } catch (err) {
                setError('Fehler beim Laden der Nachrichten');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [selectedCategory, maxArticles]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (loading) {
        return (
            <div className="news-container">
                <div ref={topRef}></div>
                <div className="news-loading">
                    <div className="news-spinner"></div>
                    <span className="news-loading-text">Nachrichten werden geladen...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="news-container">
                <div ref={topRef}></div>
                <div className="news-error">
                    <div className="news-error-content">
                        <div className="news-error-icon">
                            <span>⚠️</span>
                        </div>
                        <div className="news-error-message">
                            <strong>Fehler:</strong>
                            <span> {error}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentCategory = categories.find(cat => cat.key === selectedCategory)?.name || 'Allgemein';

    return (
        <div className="news-container">
            <div ref={topRef}></div>
            <div className="news-header">
                <h1 className="news-title">Aktuelle Nachrichten</h1>

                <div className="news-category-section">
                    <h2 className="news-category-title">Kategorie: {currentCategory}</h2>
                    <div className="news-category-buttons">
                        {categories.map(cat => (
                            <button
                                key={cat.key}
                                onClick={() => onCategoryChange(cat.key)}
                                className={`news-category-button ${
                                    selectedCategory === cat.key ? 'news-category-button-active' : ''
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {articles.length === 0 ? (
                <div className="news-empty">
                    <div className="news-empty-icon">📰</div>
                    <p className="news-empty-text">Keine Artikel in dieser Kategorie verfügbar.</p>
                </div>
            ) : (
                <div className="news-grid">
                    {articles.map((article, index) => (
                        <NewsCard
                            key={index}
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
            {showScrollTop && (
                <button
                    className="scroll-to-top-btn"
                    onClick={scrollToTop}
                    aria-label="Nach oben scrollen"
                >
                    ↑
                </button>
            )}
        </div>
    );
};

export default News;

