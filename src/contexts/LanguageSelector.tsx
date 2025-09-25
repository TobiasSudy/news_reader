import React from 'react';
import { useLanguage } from './LanguageContext.tsx';
import '../css/LanguageSelector.css';

const LanguageSelector: React.FC = () => {
    const { language, setLanguage, t } = useLanguage();

    return (
        <div className="language-selector">
            <span className="language-label">{t('nav.language')}:</span>
            <div className="language-buttons">
                <button
                    onClick={() => setLanguage('de')}
                    className={`language-button ${language === 'de' ? 'active' : ''}`}
                    aria-label="Deutsch"
                >
                    🇩🇪 DE
                </button>
                <button
                    onClick={() => setLanguage('en')}
                    className={`language-button ${language === 'en' ? 'active' : ''}`}
                    aria-label="English"
                >
                    🇺🇸 EN
                </button>
            </div>
        </div>
    );
};

export default LanguageSelector;