import React, { useState, useRef, useEffect, useCallback } from 'react';
import lottie from 'lottie-web';
import playvideoAnim from '../assets/animations/playvideo.json';
import videoSrc from '../assets/video/video.mp4';
import '../survey_video.css';

const ArrowDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export default function SurveyVideoScreen({ onComplete, onCancel }) {
  const [showVideo, setShowVideo] = useState(false);
  const [showCancelBtn, setShowCancelBtn] = useState(false);
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState(false);

  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const lottieRef = useRef(null);

  useEffect(() => {
    if (!lottieRef.current) return;
    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: playvideoAnim,
    });
    return () => anim.destroy();
  }, []);

  const enterBrowserFullscreen = useCallback(() => {
    const el = overlayRef.current || document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }, []);

  const exitBrowserFullscreen = useCallback(() => {
    if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  }, []);

  useEffect(() => {
    const onFsChange = () => {
      setIsBrowserFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('webkitfullscreenchange', onFsChange);
    };
  }, []);

  useEffect(() => {
    enterBrowserFullscreen();
  }, [enterBrowserFullscreen]);

  const handlePlayVideo = () => {
    setShowVideo(true);
    enterBrowserFullscreen();
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 150);
  };

  const handleVideoEnded = () => {
    if (document.fullscreenElement) exitBrowserFullscreen();
    if (onComplete) onComplete();
  };

  const handleCancelSession = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (document.fullscreenElement) {
      exitBrowserFullscreen();
    }
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <>
      {}
      {!showVideo && (
        <div className="sv-intro-screen" onClick={enterBrowserFullscreen}>
          <h1 className="sv-heading">Perfect!</h1>
          <p className="sv-subtitle">
            You're now ready to view your video. Be sure to stay in the same
            position for the entire duration so we can accurately track your vision.
          </p>

          <button className="sv-lottie-btn" onClick={handlePlayVideo} aria-label="Play video">
            <div ref={lottieRef} className="sv-lottie-size" />
          </button>
        </div>
      )}

      {/* ── Fullscreen video player overlay ── */}
      {showVideo && (
        <div className="sv-video-overlay" ref={overlayRef}>
          <video
            ref={videoRef}
            className="sv-fullscreen-video"
            src={videoSrc}
            onEnded={handleVideoEnded}
            playsInline
            autoPlay
          />

          <div className="sv-cancel-container">
            <button 
              className={`sv-toggle-cancel-btn ${showCancelBtn ? 'active' : ''}`} 
              onClick={() => setShowCancelBtn(prev => !prev)}
              aria-label="Toggle exit menu"
            >
              <ArrowDownIcon />
            </button>
            
            {showCancelBtn && (
              <button className="sv-cancel-session-btn" onClick={handleCancelSession}>
                Cancel Session
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
