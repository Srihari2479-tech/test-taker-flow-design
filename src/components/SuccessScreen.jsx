import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import maivenLogo from '../assets/maiven_logo.png';
import successAnimation from '../assets/animations/success.json';
import '../success_screen.css';

export default function SuccessScreen({ onRestart }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: successAnimation
    });
    return () => anim.destroy();
  }, []);

  return (
    <div className="success-screen-wrapper">
      <div className="success-card-container">
        <div className="success-animation-container">
          <div ref={containerRef} style={{ width: 140, height: 140 }} />
        </div>
        <h1 className="success-title">Session completed successfully.</h1>
        <p className="success-subtitle">
          We are no longer using the camera.<br />
          Thank you for your time.
        </p>
        <div className="success-footer">
          <span className="success-footer-text">Powered by</span>
          <img src={maivenLogo} alt="maiven" className="success-footer-logo" />
        </div>
      </div>
    </div>
  );
}
