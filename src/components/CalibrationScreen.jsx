import React, { useState, useRef, useEffect } from 'react';
import maivenLogo from '../assets/maiven_logo.png';
import '../calibration_screen.css';

const CameraOffIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

const EyeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default function CalibrationScreen({ onComplete }) {
  const [stage, setStage] = useState('camera');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (stage === 'camera') {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => {});
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [stage]);

  const handleCalibrateCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    setStage('gaze');
  };

  const handleStartCalibration = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
    onComplete();
  };

  return (
    <div className="calibration-card">
      <header className="calibration-header">
        <img src={maivenLogo} alt="maiven" className="logo-img" />
      </header>

      {stage === 'camera' && (
        <>
          <div className="calibration-title-section">
            <h1>You look great!</h1>
            <p className="calibration-subtitle">Set up camera.</p>
          </div>

          <div className="calibration-panel">
            <div className="camera-panel-inner">
              <div className="camera-preview-box">
                <video ref={videoRef} autoPlay muted playsInline />
                <div className="camera-off-overlay">
                  <CameraOffIcon />
                </div>
              </div>
              <ul className="camera-instructions-list">
                <li>Click "allow" in the browser pop up to grant access.</li>
                <li>Camera access is used to analyze viewer reactions.</li>
              </ul>
            </div>
            <div className="calibration-panel-actions">
              <button className="calibrate-btn" onClick={handleCalibrateCamera}>
                Calibrate Camera
              </button>
            </div>
          </div>
        </>
      )}

      {stage === 'gaze' && (
        <>
          <div className="calibration-title-section">
            <h1>Let's see eye to eye!</h1>
            <p className="calibration-subtitle">Calibrate gaze tracking.</p>
          </div>

          <div className="calibration-panel">
            <div className="gaze-panel-inner">
              <div className="eye-icon-circle">
                <div className="eye-scan-wrapper">
                  <span className="scan-corner tl"></span>
                  <span className="scan-corner tr"></span>
                  <span className="scan-corner bl"></span>
                  <span className="scan-corner br"></span>
                  <EyeIcon />
                </div>
              </div>
              <p className="gaze-instruction">Click the circles as they appear on the screen.</p>
            </div>
            <div className="calibration-panel-actions">
              <button className="calibrate-btn" onClick={handleStartCalibration}>
                <span>Start Calibration</span>
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </>
      )}

      <div className="calibration-stepper">
        <div className="cal-step-item">
          <div className="cal-step-circle active">1</div>
          <span className="cal-step-label">Environment</span>
        </div>
        <div className="cal-step-line active"></div>
        <div className="cal-step-item">
          <div className="cal-step-circle active">2</div>
          <span className="cal-step-label">Audio</span>
        </div>
        <div className="cal-step-line active"></div>
        <div className="cal-step-item">
          <div className="cal-step-circle active">3</div>
          <span className="cal-step-label">Video</span>
        </div>
      </div>
    </div>
  );
}
