import React, { useState, useEffect, useRef } from 'react';
import '../iris_check_screen.css';

const motivationTexts = {
  12: "Focus on the first point to begin...",
  11: "Great start, keep following the numbers.",
  10: "Perfect alignment, stay steady!",
  9: "You're doing fantastic.",
  8: "Tracking eyes... looks good.",
  7: "Maintain focus on the center of the circle.",
  6: "Keep going, halfway through!",
  5: "Excellent eye tracking quality.",
  4: "Calibrating peripheral gaze...",
  3: "Just a few more clicks...",
  2: "Almost done, one more to go!",
  1: "Click to complete calibration!"
};

export default function IrisCheckScreen({ onComplete }) {
  const [currentNumber, setCurrentNumber] = useState(12);
  const [dotPosition, setDotPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  
  const generateRandomPosition = () => {
    const minX = 10;
    const maxX = 90;
    const minY = 15;
    const maxY = 80;
    
    const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    
    return { x, y };
  };

  useEffect(() => {
    
    setDotPosition(generateRandomPosition());
  }, []);

  const handleDotClick = (e) => {
    e.stopPropagation();
    
    if (currentNumber > 1) {
      setCurrentNumber((prev) => prev - 1);
      setDotPosition(generateRandomPosition());
    } else {
      onComplete();
    }
  };

  const totalSteps = 12;
  const completedSteps = totalSteps - currentNumber;
  const progressPercent = (completedSteps / totalSteps) * 100;

  return (
    <div ref={containerRef} className="iris-fullscreen-container">
      <div className="iris-calibration-area">
        <span className="iris-exit-hint">Press Esc to exit</span>
        
        <div
          className="iris-calibration-dot"
          style={{
            top: `${dotPosition.y}%`,
            left: `${dotPosition.x}%`
          }}
          onClick={handleDotClick}
        >
          {currentNumber}
          <div className={`iris-motivation-bubble ${dotPosition.x > 50 ? 'position-left' : 'position-right'}`}>
            {motivationTexts[currentNumber]}
          </div>
        </div>

        <div className="iris-progress-container">
          <div className="iris-progress-track">
            <div 
              className="iris-progress-fill" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
