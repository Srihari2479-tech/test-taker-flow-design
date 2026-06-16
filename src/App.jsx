import React, { useState } from 'react';
import OnboardingForm from './components/OnboardingForm';
import InfoCard from './components/InfoCard';
import EnvironmentScreen from './components/EnvironmentScreen';
import PreSurveyScreen from './components/PreSurveyScreen';
import CalibrationScreen from './components/CalibrationScreen';
import IrisCheckScreen from './components/IrisCheckScreen';
import SurveyVideoScreen from './components/SurveyVideoScreen';
import PostSurveyScreen from './components/PostSurveyScreen';
import SuccessScreen from './components/SuccessScreen';

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(null);
  const [surveyData, setSurveyData] = useState(null);



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
    setStep(1);
  };

  return (
    <div className="page-container">
      {step === 1 && (
        <div className="onboarding-card">
          <OnboardingForm onSubmit={handleFormSubmit} />
          <div className="vertical-divider" />
          <InfoCard />
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
