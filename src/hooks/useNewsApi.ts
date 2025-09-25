import { useState, useEffect } from 'react';
import axios from 'axios';

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

interface UseNewsApiProps {
    topic: string;
    lang: string;
    max: number;
}

const useNewsApi = ({ topic, lang, max }: UseNewsApiProps) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
                    params: {
                        topic,
                        lang,
                        max,
                        token: '90d89c221142ab8c548888618acaa1e8'
                    }
                });
                setArticles(response.data.articles || []);
            } catch (err) {
                setError('Failed to fetch news');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [topic, lang, max]);

    return { articles, loading, error };
};

export default useNewsApi;

