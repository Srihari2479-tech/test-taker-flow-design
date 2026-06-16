import React from 'react';
import maivenLogo from '../assets/maiven_logo.png';
import '../Environment_Screen.css';

const SunIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const UserIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <polyline points="9 11 11 13 15 9"></polyline>
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default function EnvironmentScreen({ onContinue }) {
  return (
    <div className="environment-card">
      <header className="environment-header">
        <img src={maivenLogo} alt="maiven" className="logo-img" />
        <div className="steps-container">
          <div className="step-item">
            <span className="step-num active">1</span>
            <span className="step-text active">Environment</span>
          </div>
          <div className="step-connector"></div>
          <div className="step-item">
            <span className="step-num">2</span>
            <span className="step-text">Audio</span>
          </div>
          <div className="step-connector"></div>
          <div className="step-item">
            <span className="step-num">3</span>
            <span className="step-text">Video</span>
          </div>
        </div>
      </header>

      <main className="environment-body">
        <div className="environment-title-section">
          <h1>Time to get started.</h1>
          <p className="subtitle">Let's make sure your environment is ready for the best experience.</p>
        </div>

        <div className="instruction-cards-grid">
          <div className="info-box-card">
            <div className="info-box-icon-wrapper sun-bg">
              <SunIcon />
            </div>
            <div className="info-box-content">
              <div className="info-box-header">
                <span className="info-box-badge badge-blue">1</span>
                <h3>Light it up</h3>
              </div>
              <p>Make sure your room is bright enough for the camera to see your face clearly. Avoid strong backlighting.</p>
            </div>
          </div>

          <div className="info-box-card">
            <div className="info-box-icon-wrapper user-bg">
              <UserIcon />
            </div>
            <div className="info-box-content">
              <div className="info-box-header">
                <span className="info-box-badge badge-purple">2</span>
                <h3>Get in position</h3>
              </div>
              <p>Sit upright, face the camera directly, and keep your face centered throughout the test.</p>
            </div>
          </div>
        </div>

        <button 
          className="submit-btn environment-continue-btn"
          onClick={onContinue}
        >
          <span>Continue</span>
          <ArrowRightIcon />
        </button>

        <div className="privacy-banner">
          <div className="privacy-banner-left">
            <div className="privacy-banner-icon">
              <ShieldCheckIcon />
            </div>
            <div className="privacy-banner-content">
              <h4>Your privacy matters</h4>
              <p>We only access your camera during the test and never store or share your video.</p>
            </div>
          </div>
          <div className="privacy-banner-right">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="decor-shield-svg">
              <defs>
                <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8d6bfd" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#58a5ff" stopOpacity="0.8"/>
                </linearGradient>
              </defs>
              <path d="M30 4C30 4 45 9 45 22V36C45 45 30 52 30 52C30 52 15 45 15 36V22C15 9 30 4 30 4Z" fill="url(#shield-grad)" stroke="#ffffff" strokeWidth="1.5"/>
              <rect x="23" y="26" width="14" height="11" rx="2" fill="#ffffff" />
              <path d="M26 26V22C26 19.7909 27.7909 18 30 18C32.2091 18 34 19.7909 34 22V26" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <circle cx="30" cy="31" r="1.5" fill="#8d6bfd" />
              <path d="M10 20L11 22L13 23L11 24L10 26L9 24L7 23L9 22L10 20Z" fill="#a78bfa" opacity="0.7"/>
              <path d="M48 15L49 17L51 18L49 19L48 21L47 19L45 18L47 17L48 15Z" fill="#a78bfa" opacity="0.7"/>
              <path d="M50 38L51 40L53 41L51 42L50 44L49 42L47 41L49 40L50 38Z" fill="#a78bfa" opacity="0.7"/>
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}
