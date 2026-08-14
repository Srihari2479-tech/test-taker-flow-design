import React, { useState, useEffect, useRef } from 'react';
import '../iris_check_screen.css';

const calibrationPoints = [
  { x: 50, y: 50 }, // 1. Center
  { x: 15, y: 15 }, // 2. Top-Left
  { x: 85, y: 15 }, // 3. Top-Right
  { x: 85, y: 85 }, // 4. Bottom-Right
  { x: 15, y: 85 }, // 5. Bottom-Left
  { x: 50, y: 15 }, // 6. Top-Center
  { x: 85, y: 50 }, // 7. Right-Center
  { x: 50, y: 85 }, // 8. Bottom-Center
  { x: 15, y: 50 }, // 9. Left-Center
  { x: 30, y: 30 }, // 10. Inner Top-Left
  { x: 70, y: 30 }, // 11. Inner Top-Right
  { x: 50, y: 50 }, // 12. Final Center
];

const motivationTexts = {
  12: "Focus on the number 12",
  11: "Great job! Keep going",
  10: "Follow the dot",
  9: "You're doing fantastic",
  8: "Almost halfway there",
  7: "Stay focused",
  6: "Halfway done!",
  5: "Keep your eyes on the target",
  4: "Only a few more left",
  3: "Nearly complete!",
  2: "Just two more!",
  1: "Final point!",
};

export default function IrisCheckScreen({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const containerRef = useRef(null);

  const currentNumber = 12 - stepIndex;
  const dotPosition = calibrationPoints[stepIndex] || { x: 50, y: 50 };

  const handleDotClick = () => {
    if (stepIndex < calibrationPoints.length - 1) {
      setStepIndex((prev) => prev + 1);
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
            '--dot-y': `${dotPosition.y}%`,
            '--dot-x': `${dotPosition.x}%`
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
              style={{ '--progress-percent': `${progressPercent}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
