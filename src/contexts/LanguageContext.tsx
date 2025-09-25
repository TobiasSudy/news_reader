import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Language = 'de' | 'en';

interface Translations {
    [key: string]: {
        de: string;
        en: string;
    };
}

const translations: Translations = {
    // Navigation & General
    'nav.news': { de: 'Nachrichten', en: 'News' },
    'nav.categories': { de: 'Kategorien', en: 'Categories' },
    'nav.language': { de: 'Sprache', en: 'Language' },

    // News Component
    'news.title': { de: 'Aktuelle Nachrichten', en: 'Current News' },
    'news.category': { de: 'Kategorie', en: 'Category' },
    'news.loading': { de: 'Nachrichten werden geladen...', en: 'Loading news...' },
    'news.error': { de: 'Fehler', en: 'Error' },
    'news.errorMessage': { de: 'Fehler beim Laden der Nachrichten', en: 'Error loading news' },
    'news.noArticles': { de: 'Keine Artikel in dieser Kategorie verfügbar.', en: 'No articles available in this category.' },
    'news.scrollToTop': { de: 'Nach oben scrollen', en: 'Scroll to top' },

    // Categories Component
    'categories.title': { de: 'Kategorien', en: 'Categories' },
    'categories.subtitle': { de: 'Wählen Sie eine Kategorie und die Anzahl der Artikel.', en: 'Select a category and number of articles.' },
    'categories.categoryLabel': { de: 'Kategorie', en: 'Category' },
    'categories.maxLabel': { de: 'Anzahl Artikel', en: 'Number of Articles' },
    'categories.loading': { de: 'Lade Nachrichten...', en: 'Loading news...' },
    'categories.noArticles': { de: 'Keine Artikel gefunden.', en: 'No articles found.' },

    // Category Names
    'category.general': { de: 'Allgemein', en: 'General' },
    'category.technology': { de: 'Technologie', en: 'Technology' },
    'category.science': { de: 'Wissenschaft', en: 'Science' },
    'category.health': { de: 'Gesundheit', en: 'Health' },
    'category.business': { de: 'Wirtschaft', en: 'Business' },
    'category.sports': { de: 'Sport', en: 'Sports' },
    'category.nation': { de: 'Nation', en: 'Nation' },

    // NewsCard
    'newscard.readMore': { de: 'Weiterlesen', en: 'Read More' },
    'newscard.author': { de: 'Von', en: 'By' },
    'newscard.date': { de: 'am', en: 'on' },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    getApiLanguage: () => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        // Load from localStorage or default to 'de'
        const saved = localStorage.getItem('language');
        return (saved === 'de' || saved === 'en') ? saved : 'de';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key: string): string => {
        const translation = translations[key];
        if (!translation) {
            console.warn(`Translation key "${key}" not found`);
            return key;
        }
        return translation[language];
    };

    const getApiLanguage = (): string => {
        // Convert our language codes to API language codes
        return language === 'de' ? 'de' : 'en';
    };

    const value: LanguageContextType = {
        language,
        setLanguage,
        t,
        getApiLanguage,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};