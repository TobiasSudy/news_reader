import { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import './News.css';

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
    onCategoryChange: (category: string) => void;
}

const News = ({ selectedCategory, onCategoryChange }: NewsProps) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    // Mock API data for demonstration
    const mockArticles: { [key: string]: Article[] } = {
        general: [
            {
                title: "Künstliche Intelligenz revolutioniert die Medizin",
                author: "Dr. Sarah Schmidt",
                publishedAt: "2024-10-01T10:30:00Z",
                content: "Neue Durchbrüche in der KI-gestützten Diagnose ermöglichen es Ärzten, Krankheiten früher und präziser zu erkennen. Forscher haben ein System entwickelt, das Hautkrebs mit einer Genauigkeit von 95% identifizieren kann. Diese Technologie könnte Millionen von Leben retten.",
                image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
                url: "https://example.com/ki-medizin"
            },
            {
                title: "Klimawandel: Neue Lösungsansätze für erneuerbare Energien",
                author: "Prof. Michael Weber",
                publishedAt: "2024-09-30T14:15:00Z",
                content: "Wissenschaftler präsentieren innovative Technologien zur Speicherung von Solarenergie. Die neuen Batteriesysteme könnten die Energiewende erheblich beschleunigen und die Abhängigkeit von fossilen Brennstoffen reduzieren.",
                image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=200&fit=crop",
                url: "https://example.com/erneuerbare-energie"
            }
        ],
        technology: [
            {
                title: "Quantencomputer erreicht neuen Meilenstein",
                author: "Tech Today",
                publishedAt: "2024-10-02T08:00:00Z",
                content: "Ein neuer Quantencomputer hat erstmals eine komplexe Berechnung in Sekunden durchgeführt, für die herkömmliche Computer Jahre brauchen würden. Diese Entwicklung könnte die Verschlüsselung und Medikamentenentwicklung revolutionieren.",
                image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop",
                url: "https://example.com/quantencomputer"
            },
            {
                title: "5G-Netz: Vollständige Abdeckung bis 2025",
                author: "Netzwerk News",
                publishedAt: "2024-10-01T12:00:00Z",
                content: "Telekommunikationsanbieter versprechen eine vollständige 5G-Abdeckung bis Ende 2025. Die neue Technologie wird IoT-Anwendungen und autonomes Fahren ermöglichen.",
                image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=200&fit=crop",
                url: "https://example.com/5g-netz"
            }
        ],
        science: [
            {
                title: "Durchbruch in der Fusionsenergie",
                author: "Science Daily",
                publishedAt: "2024-09-29T16:45:00Z",
                content: "Forscher haben einen wichtigen Meilenstein bei der kontrollierten Kernfusion erreicht. Das Experiment produzierte mehr Energie als es verbrauchte - ein historischer Moment für die saubere Energiegewinnung.",
                image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=200&fit=crop",
                url: "https://example.com/fusion"
            },
            {
                title: "Neue Exoplaneten entdeckt",
                author: "Astro Journal",
                publishedAt: "2024-09-28T09:30:00Z",
                content: "Astronomen haben drei erdähnliche Planeten in der habitablen Zone eines nahen Sterns entdeckt. Die Planeten könnten flüssiges Wasser und möglicherweise Leben beherbergen.",
                image: "https://images.unsplash.com/photo-1446776679541-25c4badc4cd8?w=400&h=200&fit=crop",
                url: "https://example.com/exoplaneten"
            }
        ]
    };

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
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 800));

                // In a real application, you would use axios like this:
                /*
                const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
                  params: {
                    category: selectedCategory,
                    lang: 'de',
                    token: 'YOUR_API_KEY'
                  }
                });
                setArticles(response.data.articles);
                */

                // For demo purposes, use mock data
                const categoryArticles = mockArticles[selectedCategory] || mockArticles.general;
                setArticles(categoryArticles);
            } catch (err) {
                setError('Fehler beim Laden der Nachrichten');
                console.error('Error fetching news:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [selectedCategory]);

    if (loading) {
        return (
            <div className="news-container">
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
                            author={article.author}
                            date={article.publishedAt}
                            content={article.content}
                            image={article.image}
                            url={article.url}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default News;