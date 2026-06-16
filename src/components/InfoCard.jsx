import React from 'react';

const EyeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const ShieldLockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <rect x="9" y="11" width="6" height="4" rx="1"></rect>
    <path d="M10 11v-1.5a2 2 0 0 1 4 0V11"></path>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="9 11 12 14 16 9"></polyline>
  </svg>
);

const SurveyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <line x1="10" y1="9" x2="8" y2="9"></line>
  </svg>
);

const infoItems = [
  {
    icon: <EyeIcon />,
    title: 'Camera Access for Analysis',
    description: 'While watching the video we will have access to your camera to track eye gaze and facial expression.'
  },
  {
    icon: <ShieldLockIcon />,
    title: 'Your Privacy Matters',
    description: 'Once the video has ended, we no longer have access to your camera.'
  },
  {
    icon: <CheckCircleIcon />,
    title: 'Guided Setup',
    description: 'You will be guided through a brief setup to ensure the best experience.'
  },
  {
    icon: <SurveyIcon />,
    title: 'Quick Survey',
    description: 'A short survey may follow the video to help us improve.'
  }
];

export default function InfoCard() {
  return (
    <div className="onboarding-right">
      <div className="info-items-list">
        {infoItems.map((item, idx) => (
          <div key={idx} className="info-item">
            <div className="info-icon-container">
              {item.icon}
            </div>
            <div className="info-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
