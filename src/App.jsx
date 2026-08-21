import React, { useState } from 'react';
import LanguageSelector from './components/LanguageSelector';
import OnboardingForm from './components/OnboardingForm';
import InfoCard from './components/InfoCard';
import EnvironmentScreen from './components/EnvironmentScreen';
import PreSurveyScreen from './components/PreSurveyScreen';
import CalibrationScreen from './components/CalibrationScreen';
import IrisCheckScreen from './components/IrisCheckScreen';
import SurveyVideoScreen from './components/SurveyVideoScreen';
import PostSurveyScreen from './components/PostSurveyScreen';
import SuccessScreen from './components/SuccessScreen';
import maivenLogo from './assets/maiven_logo.png';

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(null);
  const [surveyData, setSurveyData] = useState(null);
  const [language, setLanguage] = useState(() => localStorage.getItem('app_language') || 'en');

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('app_language', newLang);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    setStep(2);
  };

  const handleEnvironmentContinue = () => {
    setStep(3);
  };

  const handleSurveySubmit = (data) => {
    setSurveyData(data);
    setStep(4);
  };

  const handleCalibrationComplete = () => {
    setStep(5);
  };

  const handleIrisCheckComplete = () => {
    setStep(6);
  };

  const handleVideoComplete = () => {
    setStep(7);
  };

  const handlePostSurveySubmit = (data) => {
    setStep(8);
  };

  const handleRestart = () => {
    setFormData(null);
    setSurveyData(null);
    setLanguage('en');
    localStorage.setItem('app_language', 'en');
    setStep(1);
  };

  return (
    <div className="page-container">
      {/* Show LanguageSelector only on Step 1 (Welcome Screen). Once user clicks 'Begin', it is hidden */}
      {step === 1 && (
        <LanguageSelector 
          currentLanguage={language} 
          onLanguageChange={handleLanguageChange} 
        />
      )}

      {step === 1 && (
        <div className="onboarding-card">
          <OnboardingForm onSubmit={handleFormSubmit} />
          <div className="vertical-divider" />
          <InfoCard />
          <div className="card-bottom-logo-wrapper">
            <span className="card-bottom-powered-by">Powered by</span>
            <img src={maivenLogo} alt="maiven" className="card-bottom-logo-img" />
          </div>
        </div>
      )}

      {step === 2 && (
        <EnvironmentScreen onContinue={handleEnvironmentContinue} />
      )}

      {step === 3 && (
        <PreSurveyScreen onSubmit={handleSurveySubmit} />
      )}

      {step === 4 && (
        <CalibrationScreen onComplete={handleCalibrationComplete} />
      )}

      {step === 5 && (
        <IrisCheckScreen onComplete={handleIrisCheckComplete} />
      )}

      {step === 6 && (
        <SurveyVideoScreen 
          onComplete={handleVideoComplete} 
          onCancel={() => setStep(1)} 
        />
      )}

      {step === 7 && (
        <PostSurveyScreen onSubmit={handlePostSurveySubmit} />
      )}

      {step === 8 && (
        <SuccessScreen onRestart={handleRestart} />
      )}
    </div>
  );
}
