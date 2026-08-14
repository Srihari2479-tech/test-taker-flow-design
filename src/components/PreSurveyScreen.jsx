import React, { useState, useRef, useEffect } from 'react';
import maivenLogo from '../assets/maiven_logo.png';
import surveyImage from '../assets/survey_image.png';
import cocaColaImg from '../assets/coco_cola.png';
import fantaImg from '../assets/Fanta.png';
import iphoneImg from '../assets/iphone.png';
import motorolaImg from '../assets/motorola.png';
import oneplusImg from '../assets/oneplus.png';
import pepsiImg from '../assets/pepsi.png';
import redmiImg from '../assets/redmi.png';
import samsungImg from '../assets/samsung.png';
import spriteImg from '../assets/sprite.png';
import thumsupImg from '../assets/thumsup.png';
import zebronicsImg from '../assets/zebronics.png';
import appleLogo from '../assets/APPLE.png';
import samsungLogo from '../assets/SAMSUNGlogo.png';
import xiaomiLogo from '../assets/XIAOMI.png';
import oneplusLogo from '../assets/ONEPLUS copy.png';
import notSureImg from '../assets/not sure.png';
import othersImg from '../assets/others.png';
import sonyImg from '../assets/sony.png';
import jblHeadphoneImg from '../assets/JBL.png';
import boseImg from '../assets/BOSE.png';
import appleHeadphoneImg from '../assets/apple_headphone.png';
import sennheiserImg from '../assets/sennheiser.png';
import boatHeadphoneImg from '../assets/boat_headphone.png';
import dellLpImg from '../assets/dell_lp.png';
import lenovoLpImg from '../assets/lenovo_lp.png';
import hpLpImg from '../assets/hp_lp.png';
import appleLpImg from '../assets/apple_lp.png';
import msiLpImg from '../assets/msi_lp.png';
import asusLpImg from '../assets/asus_lp.png';
import '../pre_survey.css';

const StarIcon = ({ active }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="star-svg">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const MicIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
);

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="6 3 20 12 6 21 6 3"></polygon>
  </svg>
);

const PauseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

const CrossIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ListeningAnimation = () => (
  <div className="chatgpt-listening-container">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="listening-stop-square">
      <rect x="5" y="5" width="14" height="14" rx="2" ry="2" fill="currentColor"></rect>
    </svg>
  </div>
);

const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;

// Map local collected assets for options
const OPTION_IMAGES = {
  'Maiven': maivenLogo,
  'Sony': sonyImg,
  'JBL': jblHeadphoneImg,
  'Bose': boseImg,
  'Sennheiser': sennheiserImg,
  'Apple': appleLogo,
  'Samsung': samsungLogo,
  'Xiaomi': xiaomiLogo,
  'OnePlus': oneplusLogo,
  'boAt': boatHeadphoneImg,
  'Zebronics': zebronicsImg,
  'Dell': dellLpImg,
  'Lenovo': lenovoLpImg,
  'HP': hpLpImg,
  'MSI': msiLpImg,
  'Asus': asusLpImg,
  'iPhone': iphoneImg,
  'Motorola': motorolaImg,
  'Redmi': redmiImg,
  'Coca-Cola': cocaColaImg,
  'Pepsi': pepsiImg,
  'Sprite': spriteImg,
  'Fanta': fantaImg,
  'Thums Up': thumsupImg,
  'Limca': spriteImg,
  'Mountain Dew': spriteImg,
  '7Up': spriteImg,
  'Other': othersImg,
  'Not sure': notSureImg
};

export default function PreSurveyScreen({ onSubmit }) {
  const [selectedBrand, setSelectedBrand] = useState('Apple');
  const [selectedRating, setSelectedRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [selectedHeadphone, setSelectedHeadphone] = useState('Sony');
  const [selectedLaptops, setSelectedLaptops] = useState(['Lenovo']);
  const [audioPref, setAudioPref] = useState('');
  const [easeOfUse, setEaseOfUse] = useState('');

  const [voiceState5, setVoiceState5] = useState('idle');
  const [audioUrl5, setAudioUrl5] = useState(null);
  const [lang5, setLang5] = useState('en-IN');
  const audioRef5 = useRef(null);
  const mediaRecorderRef5 = useRef(null);
  const audioChunksRef5 = useRef([]);
  const recognitionRef5 = useRef(null);

  const [voiceState6, setVoiceState6] = useState('idle');
  const [audioUrl6, setAudioUrl6] = useState(null);
  const [lang6, setLang6] = useState('en-IN');
  const audioRef6 = useRef(null);
  const mediaRecorderRef6 = useRef(null);
  const audioChunksRef6 = useRef([]);
  const recognitionRef6 = useRef(null);

  const q1Ref = useRef(null);
  const q2Ref = useRef(null);
  const q3Ref = useRef(null);
  const q4Ref = useRef(null);
  const q5Ref = useRef(null);
  const q6Ref = useRef(null);

  const containerRef = useRef(null);



  const scrollToQuestion = (qRef) => {
    if (qRef.current) {
      if (window.innerWidth <= 768) {
        qRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      } else if (containerRef.current) {
        const container = containerRef.current;
        const element = qRef.current;
        const offsetTop = element.offsetTop - container.offsetTop - 12;
        container.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  };

  const startRecording5 = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef5.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef5.current = mediaRecorder;
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef5.current.push(event.data);
        }
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef5.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl5(url);
        if (audioRef5.current) {
          audioRef5.current.src = url;
        }
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
      setVoiceState5('listening');

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognitionRef5.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = lang5;

        recognition.onresult = (event) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          if (transcript) {
            setAudioPref(transcript);
          }
        };

        recognition.onerror = (event) => {
          console.log('Speech recognition error 5:', event.error);
        };

        recognition.start();
      }
    } catch (err) {
      console.log('Error accessing microphone 5:', err);
      alert('Could not access microphone. Please check permissions.');
      setVoiceState5('idle');
    }
  };

  const startRecording6 = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef6.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef6.current = mediaRecorder;
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef6.current.push(event.data);
        }
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef6.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl6(url);
        if (audioRef6.current) {
          audioRef6.current.src = url;
        }
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
      setVoiceState6('listening');

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognitionRef6.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = lang6;

        recognition.onresult = (event) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          if (transcript) {
            setEaseOfUse(transcript);
          }
        };

        recognition.onerror = (event) => {
          console.log('Speech recognition error 6:', event.error);
        };

        recognition.start();
      }
    } catch (err) {
      console.log('Error accessing microphone 6:', err);
      alert('Could not access microphone. Please check permissions.');
      setVoiceState6('idle');
    }
  };

  const stopRecording5 = () => {
    if (mediaRecorderRef5.current && mediaRecorderRef5.current.state === 'recording') {
      mediaRecorderRef5.current.stop();
    }
    if (recognitionRef5.current) {
      try {
        recognitionRef5.current.stop();
      } catch (e) {}
    }
    setVoiceState5('loading');
    setTimeout(() => {
      setVoiceState5('hasAudio');
    }, 1200);
  };

  const stopRecording6 = () => {
    if (mediaRecorderRef6.current && mediaRecorderRef6.current.state === 'recording') {
      mediaRecorderRef6.current.stop();
    }
    if (recognitionRef6.current) {
      try {
        recognitionRef6.current.stop();
      } catch (e) {}
    }
    setVoiceState6('loading');
    setTimeout(() => {
      setVoiceState6('hasAudio');
    }, 1200);
  };

  const togglePlayAudio5 = () => {
    if (!audioRef5.current) return;
    if (voiceState5 === 'playing') {
      audioRef5.current.pause();
      setVoiceState5('hasAudio');
    } else {
      audioRef5.current.currentTime = 0;
      audioRef5.current.play();
      setVoiceState5('playing');
    }
  };

  const togglePlayAudio6 = () => {
    if (!audioRef6.current) return;
    if (voiceState6 === 'playing') {
      audioRef6.current.pause();
      setVoiceState6('hasAudio');
    } else {
      audioRef6.current.currentTime = 0;
      audioRef6.current.play();
      setVoiceState6('playing');
    }
  };

  const deleteAudio5 = () => {
    if (audioRef5.current) {
      audioRef5.current.pause();
      audioRef5.current.src = '';
    }
    setAudioUrl5(null);
    setVoiceState5('idle');
    setAudioPref('');
  };

  const deleteAudio6 = () => {
    if (audioRef6.current) {
      audioRef6.current.pause();
      audioRef6.current.src = '';
    }
    setAudioUrl6(null);
    setVoiceState6('idle');
    setEaseOfUse('');
  };

  const handleLaptopToggle = (laptop) => {
    if (selectedLaptops.includes(laptop)) {
      setSelectedLaptops(selectedLaptops.filter((l) => l !== laptop));
    } else {
      setSelectedLaptops([...selectedLaptops, laptop]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      selectedBrand,
      selectedRating,
      selectedHeadphone,
      selectedLaptops,
      audioPref,
      easeOfUse
    });
  };

  const handleScroll = (e) => {
    e.stopPropagation();
  };

  const brands = ['Apple', 'Samsung', 'Xiaomi', 'OnePlus', 'Other', 'Not sure'];
  const ratings = [1, 2, 3, 4, 5];
  const headphones = ['Sony', 'JBL', 'Bose', 'Apple', 'Sennheiser', 'boAt', 'Other', 'Not sure'];
  const laptops = ['Dell', 'Lenovo', 'HP', 'Apple', 'MSI', 'Asus', 'Other', 'Not sure'];

  const isAllAnswered = selectedBrand && selectedRating && selectedHeadphone && selectedLaptops.length > 0;

  return (
    <div className="survey-card animate-fade-in">
      <header className="survey-header">
        <img src={maivenLogo} alt="maiven" className="logo-img" />
      </header>

      <div className="survey-top-section">
        <div className="survey-title-info">
          <h1>Before we begin...</h1>
          <p className="subtitle">Please answer a few more questions to help us personalize your experience.</p>
        </div>
        <div className="survey-illustration-wrapper">
          <img src={surveyImage} alt="Survey checklist illustration" className="survey-illustration" />
        </div>
      </div>

      <form onSubmit={handleFormSubmit}>
        <div 
          className="survey-questions-container" 
          ref={containerRef}
          onScroll={handleScroll}
        >
          {/* Question 1 */}
          <div className="survey-question-block" ref={q1Ref}>
            <div className="question-header-row">
              <span className="question-badge">1</span>
              <h3>If you were to purchase in this category today, which brand would you consider?</h3>
            </div>
            <div className="brand-options-row">
              {brands.map((brand) => (
                <div
                  key={brand}
                  className={`brand-option-card ${selectedBrand === brand ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedBrand(brand);
                    setTimeout(() => scrollToQuestion(q2Ref), 200);
                  }}
                >
                  <div className="radio-outer">
                    <div className="radio-inner"></div>
                  </div>
                  <div className="option-image-wrapper">
                    <img 
                      src={OPTION_IMAGES[brand] || OPTION_IMAGES['Other']} 
                      alt={brand} 
                      className="option-card-img" 
                    />
                  </div>
                  <span className="brand-name">{brand}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="survey-question-block" ref={q2Ref}>
            <div className="question-header-row">
              <span className="question-badge">2</span>
              <h3>How likely are you to purchase your selected brand?</h3>
            </div>
            <p className="question-sub-instruction">Rate your likelihood on a scale of 1 to 5.</p>
            <div className="stars-rating-row" onMouseLeave={() => setHoveredRating(null)}>
              {ratings.map((rating) => {
                const active = hoveredRating !== null ? rating <= hoveredRating : rating <= selectedRating;
                return (
                  <button
                    key={rating}
                    type="button"
                    className={`star-btn ${active ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedRating(rating);
                      setTimeout(() => scrollToQuestion(q3Ref), 200);
                    }}
                    onMouseEnter={() => setHoveredRating(rating)}
                  >
                    <StarIcon active={active} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 3 */}
          <div className="survey-question-block" ref={q3Ref}>
            <div className="question-header-row">
              <span className="question-badge">3</span>
              <h3>If you were to purchase headphones today, which brand would you consider?</h3>
            </div>
            <p className="question-sub-instruction">Select one option.</p>
            <div className="brand-options-row">
              {headphones.map((hp) => (
                <div
                  key={hp}
                  className={`brand-option-card ${selectedHeadphone === hp ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedHeadphone(hp);
                    setTimeout(() => scrollToQuestion(q4Ref), 200);
                  }}
                >
                  <div className="radio-outer">
                    <div className="radio-inner"></div>
                  </div>
                  <div className="option-image-wrapper">
                    <img 
                      src={hp === 'Apple' ? appleHeadphoneImg : (OPTION_IMAGES[hp] || OPTION_IMAGES['Other'])} 
                      alt={hp} 
                      className="option-card-img" 
                    />
                  </div>
                  <span className="brand-name">{hp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Question 4 */}
          <div className="survey-question-block" ref={q4Ref}>
            <div className="question-header-row">
              <span className="question-badge">4</span>
              <h3>If you were to purchase a laptop today, which brand would you consider?</h3>
            </div>
            <p className="question-sub-instruction">Select all that apply.</p>
            <div className="brand-options-row">
              {laptops.map((lp) => (
                <div
                  key={lp}
                  className={`brand-option-card ${selectedLaptops.includes(lp) ? 'selected' : ''}`}
                  onClick={() => handleLaptopToggle(lp)}
                >
                  <div className="checkbox-outer-square">
                    <CheckIcon />
                  </div>
                  <div className="option-image-wrapper">
                    <img 
                      src={lp === 'Apple' ? appleLpImg : (OPTION_IMAGES[lp] || OPTION_IMAGES['Other'])} 
                      alt={lp} 
                      className="option-card-img" 
                    />
                  </div>
                  <span className="brand-name">{lp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Question 5 */}
          <div className="survey-question-block" ref={q5Ref}>
            <div className="question-header-row">
              <span className="question-badge">5</span>
              <h3>Please share any specific audio requirements or preferences you have.</h3>
            </div>
            <div className="textarea-input-wrapper">
              {voiceState5 === 'loading' ? (
                <div className="voice-loading-group">
                  <div className="voice-loader-wrapper">
                    <div className="loader"></div>
                  </div>
                  <div className="placeholder-loading-text">
                    Processing audio...
                  </div>
                </div>
              ) : (
                <>
                  <div className="voice-action-left">
                    {voiceState5 === 'idle' && (
                      <button type="button" className="voice-action-btn" onClick={startRecording5}>
                        <MicIcon />
                      </button>
                    )}
                    {voiceState5 === 'listening' && (
                      <button type="button" className="chatgpt-listening-btn" onClick={stopRecording5}>
                        <ListeningAnimation />
                      </button>
                    )}
                    {(voiceState5 === 'hasAudio' || voiceState5 === 'playing') && (
                      <button type="button" className="voice-action-btn" onClick={togglePlayAudio5}>
                        {voiceState5 === 'playing' ? <PauseIcon /> : <PlayIcon />}
                      </button>
                    )}
                  </div>
                  <textarea
                    className="textarea-field"
                    placeholder="Enter your audio preferences here..."
                    value={audioPref}
                    onChange={(e) => setAudioPref(e.target.value)}
                    onFocus={() => {
                      setTimeout(() => {
                        if (audioPref.trim() === '') scrollToQuestion(q5Ref);
                      }, 250);
                    }}
                  />
                </>
              )}
              {(voiceState5 === 'hasAudio' || voiceState5 === 'playing') && (
                <div className="input-actions-right">
                  <button type="button" className="delete-voice-btn" onClick={deleteAudio5}>
                    <CrossIcon />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Question 6 */}
          <div className="survey-question-block" ref={q6Ref}>
            <div className="question-header-row">
              <span className="question-badge">6</span>
              <h3>How easy was it to complete the previous steps?</h3>
            </div>
            <div className="textarea-input-wrapper">
              {voiceState6 === 'loading' ? (
                <div className="voice-loading-group">
                  <div className="voice-loader-wrapper">
                    <div className="loader"></div>
                  </div>
                  <div className="placeholder-loading-text">
                    Processing audio...
                  </div>
                </div>
              ) : (
                <>
                  <div className="voice-action-left">
                    {voiceState6 === 'idle' && (
                      <button type="button" className="voice-action-btn" onClick={startRecording6}>
                        <MicIcon />
                      </button>
                    )}
                    {voiceState6 === 'listening' && (
                      <button type="button" className="chatgpt-listening-btn" onClick={stopRecording6}>
                        <ListeningAnimation />
                      </button>
                    )}
                    {(voiceState6 === 'hasAudio' || voiceState6 === 'playing') && (
                      <button type="button" className="voice-action-btn" onClick={togglePlayAudio6}>
                        {voiceState6 === 'playing' ? <PauseIcon /> : <PlayIcon />}
                      </button>
                    )}
                  </div>
                  <textarea
                    className="textarea-field"
                    placeholder="Enter your feedback here..."
                    value={easeOfUse}
                    onChange={(e) => setEaseOfUse(e.target.value)}
                    onFocus={() => {
                      setTimeout(() => {
                        if (easeOfUse.trim() === '') scrollToQuestion(q6Ref);
                      }, 250);
                    }}
                  />
                </>
              )}
              {(voiceState6 === 'hasAudio' || voiceState6 === 'playing') && (
                <div className="input-actions-right">
                  <button type="button" className="delete-voice-btn" onClick={deleteAudio6}>
                    <CrossIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="survey-actions">
          <button 
            type="submit" 
            className={`survey-submit-btn ${isAllAnswered ? 'dark-btn' : ''}`}
            disabled={!isAllAnswered}
          >
            <span>Submit</span>
            <ArrowRightIcon />
          </button>
        </div>
        <audio ref={audioRef5} onEnded={() => setVoiceState5('hasAudio')} className="audio-hidden" />
        <audio ref={audioRef6} onEnded={() => setVoiceState6('hasAudio')} className="audio-hidden" />
      </form>
    </div>
  );
}
