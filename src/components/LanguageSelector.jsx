import React, { useState, useRef, useEffect } from 'react';
import './LanguageSelector.css';

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
];

export const triggerGoogleTranslate = (langCode) => {
  const domain = window.location.hostname;
  document.cookie = `googtrans=/en/${langCode}; path=/;`;
  document.cookie = `googtrans=/en/${langCode}; domain=${domain}; path=/;`;

  const combo = document.querySelector('.goog-te-combo');
  if (combo) {
    combo.value = langCode;
    combo.dispatchEvent(new Event('change'));
  } else {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const lateCombo = document.querySelector('.goog-te-combo');
      if (lateCombo) {
        lateCombo.value = langCode;
        lateCombo.dispatchEvent(new Event('change'));
        clearInterval(interval);
      }
      if (attempts >= 25) {
        clearInterval(interval);
      }
    }, 150);
  }
};

export default function LanguageSelector({ currentLanguage = 'en', onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedLang = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];

  useEffect(() => {
    // Apply saved language on mount
    if (currentLanguage && currentLanguage !== 'en') {
      triggerGoogleTranslate(currentLanguage);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (langCode) => {
    setIsOpen(false);
    triggerGoogleTranslate(langCode);
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
  };

  return (
    <div className="language-selector-wrapper notranslate" ref={dropdownRef}>
      <button 
        type="button" 
        className={`language-selector-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
        <span className="lang-icon">
          <GlobeIcon />
        </span>
        <span className="lang-current-label">
          <span className="lang-native-text">{selectedLang.nativeName}</span>
        </span>
        <span className={`lang-chevron ${isOpen ? 'open' : ''}`}>
          <ChevronDownIcon />
        </span>
      </button>

      {isOpen && (
        <div className="language-dropdown-menu notranslate">
          <div className="language-dropdown-header">
            <span>Select Language</span>
          </div>
          <div className="language-dropdown-list">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === selectedLang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  className={`language-option-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(lang.code)}
                >
                  <div className="lang-option-text">
                    <span className="lang-option-native">{lang.nativeName}</span>
                    <span className="lang-option-english">({lang.name})</span>
                  </div>
                  {isSelected && (
                    <span className="lang-check-icon">
                      <CheckIcon />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
