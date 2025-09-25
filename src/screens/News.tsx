import { useState, useEffect, useRef } from 'react';
import NewsCard from '../components/NewsCard';
import '../css/News.css';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from '../contexts/LanguageSelector';
import useNewsApi from '../hooks/useNewsApi';
import SearchBar from '../components/SearchFunction';

interface NewsProps {
    selectedCategory: string;
    maxArticles?: number;
    onCategoryChange: (category: string) => void;
}

const categories = [
    { key: 'general', name: 'Allgemein' },
    { key: 'business', name: 'Wirtschaft' },
    { key: 'technology', name: 'Technologie' },
    { key: 'science', name: 'Wissenschaft' },
    { key: 'sports', name: 'Sport' },
    { key: 'health', name: 'Gesundheit' }
];

const News = ({ selectedCategory, maxArticles = 10, onCategoryChange }: NewsProps) => {
    const { t, getApiLanguage } = useLanguage();
    const [showScrollTop, setShowScrollTop] = useState(false);
    const topRef = useRef<HTMLDivElement>(null);

    const { articles, loading } = useNewsApi({
        topic: selectedCategory,
        lang: getApiLanguage(),
        max: maxArticles
    });

    const [searchQuery, setSearchQuery] = useState("");

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <LanguageSelector />
                <div className="news-loading">
                    <div className="news-spinner"></div>
                    <span className="news-loading-text">{t('news.loading')}</span>
                </div>
            </div>
        );
    }

    const currentCategory = categories.find(cat => cat.key === selectedCategory)?.name || 'Allgemein';

    return (
        <div className="news-container">
            <div ref={topRef}></div>
            <LanguageSelector />
            <div className="news-header">
                <h1 className="news-title">{t('news.title')}</h1>
                <SearchBar
                    onSearch={setSearchQuery}
                    placeholder={"Artikel suchen..."}
                />
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

            {filteredArticles.length === 0 ? (
                <div className="news-empty">
                    <div className="news-empty-icon">📰</div>
                    <p className="news-empty-text">
                        {searchQuery ? t('news.noSearchResults') : t('news.noArticles')}
                    </p>
                </div>
            ) : (
                <div className="news-grid">
                    {filteredArticles.map((article, index) => (
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
                    aria-label={t('news.scrollToTop')}
                >
                    ↑
                </button>
            )}
        </div>
    );
};

export default News;
