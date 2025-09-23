import '../css/NewsCard.css';

interface NewsCardProps {
    title: string;
    author: string;
    date: string;
    content: string;
    image: string;
    url: string;
}

const NewsCard = ({ title, author, date, content, image, url }: NewsCardProps) => {
    const truncateContent = (text: string, maxLength: number = 150) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className="news-card">
            <img
                src={image}
                alt={title}
                className="news-card-image"
                onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Kein+Bild+verfügbar';
                }}
            />
            <div className="news-card-content">
                <h2 className="news-card-title">{title}</h2>
                <div className="news-card-meta">
                    <span className="news-card-author">{author || 'Unbekannter Autor'}</span>
                    <span className="news-card-separator">•</span>
                    <span className="news-card-date">{new Date(date).toLocaleDateString('de-DE')}</span>
                </div>
                <p className="news-card-text">
                    {truncateContent(content)}
                </p>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="news-card-link"
                >
                    Artikel lesen →
                </a>
            </div>
        </div>
    );
};

export default NewsCard;