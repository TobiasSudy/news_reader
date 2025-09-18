import '../css/NewsCard.css';

type NewsCardProps = {
    title: string;
    author: string;
    date: string;
    content: string;
    image: string;
};

const NewsCard = ({ title, author, date, content, image } : NewsCardProps) => {
    return (
        <div className="news-card">
            <img
                src={image}
                alt={title}
                className="news-card-image"
            />
            <div className="news-card-content">
                <h2 className="news-card-title">{title}</h2>
                <div className="news-card-meta">
                    {author} &middot; {new Date(date).toLocaleDateString()}
                </div>
                <div className="news-card-text">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default NewsCard;