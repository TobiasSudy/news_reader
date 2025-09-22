import './Categories.css';

interface CategoriesProps {
    onCategorySelect: (category: string) => void;
    onNavigate: (tab: string) => void;
}

const Categories = ({ onCategorySelect, onNavigate }: CategoriesProps) => {
    const categories = [
        {
            key: 'general',
            name: 'Allgemein',
            description: 'Aktuelle Nachrichten aus aller Welt',
            icon: '🌍',
            color: 'categories-card-blue',
            articles: '1.2k Artikel'
        },
        {
            key: 'technology',
            name: 'Technologie',
            description: 'Neueste Entwicklungen in Tech und Innovation',
            icon: '💻',
            color: 'categories-card-purple',
            articles: '856 Artikel'
        },
        {
            key: 'science',
            name: 'Wissenschaft',
            description: 'Forschung und wissenschaftliche Entdeckungen',
            icon: '🔬',
            color: 'categories-card-green',
            articles: '642 Artikel'
        },
        {
            key: 'health',
            name: 'Gesundheit',
            description: 'Medizin und Gesundheitsnachrichten',
            icon: '🏥',
            color: 'categories-card-red',
            articles: '423 Artikel'
        },
        {
            key: 'business',
            name: 'Wirtschaft',
            description: 'Unternehmen und Finanzmärkte',
            icon: '💼',
            color: 'categories-card-yellow',
            articles: '789 Artikel'
        },
        {
            key: 'sports',
            name: 'Sport',
            description: 'Sportnachrichten und Ergebnisse',
            icon: '⚽',
            color: 'categories-card-orange',
            articles: '1.1k Artikel'
        }
    ];

    const handleCategoryClick = (categoryKey: string) => {
        onCategorySelect(categoryKey);
        onNavigate('news');
    };

    return (
        <div className="categories-container">
            <div className="categories-header">
                <h1 className="categories-title">Kategorien</h1>
                <p className="categories-subtitle">Wählen Sie eine Kategorie, um die neuesten Nachrichten zu entdecken.</p>
            </div>

            <div className="categories-grid">
                {categories.map(category => (
                    <div
                        key={category.key}
                        onClick={() => handleCategoryClick(category.key)}
                        className="categories-card"
                    >
                        <div className={`categories-card-header ${category.color}`}>
                            <div className="categories-card-icon">{category.icon}</div>
                            <h3 className="categories-card-name">{category.name}</h3>
                            <div className="categories-card-count">{category.articles}</div>
                        </div>
                        <div className="categories-card-content">
                            <p className="categories-card-description">{category.description}</p>
                            <button className="categories-card-button">
                                Nachrichten anzeigen →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;