import React, { useState, useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import testVideo from '../assets/video/video.mp4';
import playAnimation from '../assets/animations/playvideo.json';
import '../survey_video.css';

export default function SurveyVideoScreen({ onComplete, onCancel }) {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);
  const lottieContainerRef = useRef(null);

  useEffect(() => {
    if (!lottieContainerRef.current || showVideo) return;
    const anim = lottie.loadAnimation({
      container: lottieContainerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: playAnimation
    });
    return () => anim.destroy();
  }, [showVideo]);

  const handlePlayVideo = () => {
    setShowVideo(true);

    // Request native browser fullscreen
    const elem = document.documentElement || document.body;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {});
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen().catch(() => {});
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen().catch(() => {});
    }

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 150);
  };

  const handleVideoEnded = () => {
    // Exit native browser fullscreen
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen().catch(() => {});
      }
    }

    if (onComplete) onComplete();
  };

  return (
    <div className="sv-intro-screen animate-fade-in">
      {!showVideo ? (
        <div className="sv-intro-content">
          <h1 className="sv-heading">Perfect!</h1>
          <p className="sv-subtitle">
            You're now ready to view your video. Be sure to stay in the same position for the entire duration so we can accurately track your vision.
          </p>
          <button type="button" className="sv-lottie-btn" onClick={handlePlayVideo} aria-label="Play video">
            <div ref={lottieContainerRef} className="sv-lottie-size" />
          </button>
        </div>
      ) : (
        <div className="sv-video-overlay">
          <video
            ref={videoRef}
            src={testVideo}
            className="sv-fullscreen-video"
            onEnded={handleVideoEnded}
            controls={false}
            playsInline
          />
        </div>
      )}
    </div>
  );
}
