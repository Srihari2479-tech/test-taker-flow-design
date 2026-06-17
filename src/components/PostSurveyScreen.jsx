import React, { useState, useRef, useEffect } from 'react';
import maivenLogo from '../assets/maiven_logo.png';
import surveyImage from '../assets/survey_image.png';
import '../postsurvey_screen.css';


const StarIcon = ({ active }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ps-star-svg">
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

export default function PostSurveyScreen({ onSubmit }) {
  
  const [selectedHeadphone, setSelectedHeadphone] = useState('');
  const [selectedSoftDrinks, setSelectedSoftDrinks] = useState([]);
  const [adDetail, setAdDetail] = useState('');
  const [firstRemember, setFirstRemember] = useState('');
  const [adFeeling, setAdFeeling] = useState('');
  const [adBrand, setAdBrand] = useState('');
  const [adMessage, setAdMessage] = useState('');
  const [isNewRating, setIsNewRating] = useState(0);
  const [considerRating, setConsiderRating] = useState(0);

  
  const [hoveredNewRating, setHoveredNewRating] = useState(null);
  const [hoveredConsiderRating, setHoveredConsiderRating] = useState(null);

  
  const [activeRecorderField, setActiveRecorderField] = useState(null);
  const [voiceStates, setVoiceStates] = useState({
    adDetail: { state: 'idle', url: null },
    firstRemember: { state: 'idle', url: null },
    adFeeling: { state: 'idle', url: null },
    adBrand: { state: 'idle', url: null },
    adMessage: { state: 'idle', url: null },
  });

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const containerRef = useRef(null);

  
  const q1Ref = useRef(null);
  const q2Ref = useRef(null);
  const q3Ref = useRef(null);
  const q4Ref = useRef(null);
  const q5Ref = useRef(null);
  const q6Ref = useRef(null);
  const q7Ref = useRef(null);
  const q8Ref = useRef(null);
  const q9Ref = useRef(null);

  const headphoneBrands = [
    'boAt Rockerz 425', 'Portronics Muffs M3',
    'Noise Two', 'JBL Blue Tune 520',
    'Zebronics Duke Pro', 'Other', 'Not sure'
  ];

  const softDrinkBrands = [
    'Coca-Cola', 'Pepsi', 'Sprite',
    'Fanta', 'Thumbs Up', 'Other'
  ];

  
  useEffect(() => {
    return () => {
      stopRecording();
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
    };
  }, []);

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

  const handleSoftDrinkToggle = (drink) => {
    let newDrinks;
    if (selectedSoftDrinks.includes(drink)) {
      newDrinks = selectedSoftDrinks.filter(item => item !== drink);
    } else {
      newDrinks = [...selectedSoftDrinks, drink];
    }
    setSelectedSoftDrinks(newDrinks);
    
    
    if (newDrinks.length >= 2) {
      setTimeout(() => {
        scrollToQuestion(q3Ref);
      }, 300);
    }
  };

  const handleHeadphoneSelect = (brand) => {
    setSelectedHeadphone(brand);
    
    setTimeout(() => {
      scrollToQuestion(q2Ref);
    }, 200);
  };

  
  const startRecording = async (fieldName, setter) => {
    if (activeRecorderField) {
      stopRecording();
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setVoiceStates(prev => ({
          ...prev,
          [fieldName]: { ...prev[fieldName], url }
        }));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setActiveRecorderField(fieldName);
      setVoiceStates(prev => ({
        ...prev,
        [fieldName]: { state: 'listening', url: null }
      }));

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-IN';
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setter(transcript);
        };
        recognition.onerror = (e) => console.error("Speech Recognition error", e);
        recognition.start();
      }
    } catch (err) {
      console.error("Microphone access failed", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (activeRecorderField) {
      const field = activeRecorderField;
      setVoiceStates(prev => ({
        ...prev,
        [field]: { ...prev[field], state: 'loading' }
      }));
      setTimeout(() => {
        setVoiceStates(prev => ({
          ...prev,
          [field]: { ...prev[field], state: 'hasAudio' }
        }));
      }, 1500);
      setActiveRecorderField(null);
    }
  };

  const togglePlayAudio = (fieldName) => {
    const audioState = voiceStates[fieldName];
    if (!audioState.url) return;

    if (audioState.state === 'playing') {
      audioPlayerRef.current.pause();
      setVoiceStates(prev => ({
        ...prev,
        [fieldName]: { ...prev[fieldName], state: 'hasAudio' }
      }));
    } else {
      if (audioPlayerRef.current) audioPlayerRef.current.pause();
      
      setVoiceStates(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(k => {
          if (updated[k].state === 'playing') updated[k].state = 'hasAudio';
        });
        updated[fieldName].state = 'playing';
        return updated;
      });

      audioPlayerRef.current.src = audioState.url;
      audioPlayerRef.current.play();
      audioPlayerRef.current.onended = () => {
        setVoiceStates(prev => ({
          ...prev,
          [fieldName]: { ...prev[fieldName], state: 'hasAudio' }
        }));
      };
    }
  };

  const deleteAudio = (fieldName, setter) => {
    if (audioPlayerRef.current && voiceStates[fieldName].state === 'playing') {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.src = '';
    }
    setter('');
    setVoiceStates(prev => ({
      ...prev,
      [fieldName]: { state: 'idle', url: null }
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isAllAnswered && onSubmit) {
      onSubmit({
        postHeadphone: selectedHeadphone,
        postSoftDrinks: selectedSoftDrinks,
        adDetail,
        firstRemember,
        adFeeling,
        adBrand,
        adMessage,
        isNewRating,
        considerRating
      });
    }
  };

  const isAllAnswered = 
    selectedHeadphone && 
    selectedSoftDrinks.length >= 1 && 
    adDetail.trim() !== '' && 
    firstRemember.trim() !== '' && 
    adFeeling.trim() !== '' && 
    adBrand.trim() !== '' && 
    adMessage.trim() !== '' && 
    isNewRating > 0 && 
    considerRating > 0;

  return (
    <div className="post-survey-card animate-fade-in">
      <header className="post-survey-header">
        <img src={maivenLogo} alt="maiven" className="logo-img" />
      </header>

      <div className="post-survey-top-section">
        <div className="post-survey-title-info">
          <h1>That was amazing.</h1>
          <p className="subtitle">Please answer a few more questions to help us personalize your experience.</p>
        </div>
        <div className="post-survey-illustration-wrapper">
          <img src={surveyImage} alt="Survey illustration" className="post-survey-illustration" />
        </div>
      </div>

      <form onSubmit={handleFormSubmit}>
        <div className="post-survey-questions-container" ref={containerRef}>
          
          {}
          <div className="post-survey-section-header">
            <span className="post-survey-section-title">Category</span>
          </div>

          {}
          <div className="post-survey-question-block" ref={q1Ref}>
            <div className="post-survey-question-header">
              <span className="post-survey-question-num">1)</span>
              <span className="post-survey-question-text">If Buying Headphones Today, Which Brand Would You Now Consider?</span>
            </div>
            <div className="post-survey-options-grid">
              {headphoneBrands.map(hp => (
                <div
                  key={hp}
                  className={`post-survey-option-card ${selectedHeadphone === hp ? 'selected' : ''}`}
                  onClick={() => handleHeadphoneSelect(hp)}
                >
                  <div className="ps-radio-outer">
                    <div className="ps-radio-inner" />
                  </div>
                  <span className="brand-name">{hp}</span>
                </div>
              ))}
            </div>
          </div>

          {}
          <div className="post-survey-question-block" ref={q2Ref}>
            <div className="post-survey-question-header">
              <span className="post-survey-question-num">2)</span>
              <span className="post-survey-question-text">If Buying Soft Drinks Today, Which Brand Would You Now Consider?</span>
            </div>
            <p className="post-survey-question-instruction">Select all that apply.</p>
            <div className="post-survey-options-grid">
              {softDrinkBrands.map(sd => (
                <div
                  key={sd}
                  className={`post-survey-option-card ${selectedSoftDrinks.includes(sd) ? 'selected' : ''}`}
                  onClick={() => handleSoftDrinkToggle(sd)}
                >
                  <div className="ps-checkbox-outer">
                    <CheckIcon />
                  </div>
                  <span className="brand-name">{sd}</span>
                </div>
              ))}
            </div>
          </div>

          {}
          <div className="post-survey-section-header">
            <span className="post-survey-section-title">Ad Viewing</span>
          </div>

          {}
          <div className="post-survey-question-block" ref={q3Ref}>
            <div className="post-survey-question-header">
              <span className="post-survey-question-num">3)</span>
              <span className="post-survey-question-text">Tell Us In Detail About The Ad That You Have Just Seen.</span>
            </div>
            <div className="ps-input-wrapper">
              {voiceStates.adDetail.state === 'loading' ? (
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
                    {voiceStates.adDetail.state === 'idle' && (
                      <button type="button" className="voice-action-btn" onClick={() => startRecording('adDetail', setAdDetail)}>
                        <MicIcon />
                      </button>
                    )}
                    {voiceStates.adDetail.state === 'listening' && (
                      <button type="button" className="chatgpt-listening-btn" onClick={stopRecording}>
                        <ListeningAnimation />
                      </button>
                    )}
                    {(voiceStates.adDetail.state === 'hasAudio' || voiceStates.adDetail.state === 'playing') && (
                      <button type="button" className="voice-action-btn" onClick={() => togglePlayAudio('adDetail')}>
                        {voiceStates.adDetail.state === 'playing' ? <PauseIcon /> : <PlayIcon />}
                      </button>
                    )}
                  </div>
                  <textarea
                    className="ps-textarea-field"
                    placeholder="Enter your answer here..."
                    value={adDetail}
                    onChange={(e) => setAdDetail(e.target.value)}
                    onFocus={() => {
                      setTimeout(() => {
                        if (adDetail.trim() === '') scrollToQuestion(q3Ref);
                      }, 250);
                    }}
                  />
                </>
              )}
              {(voiceStates.adDetail.state === 'hasAudio' || voiceStates.adDetail.state === 'playing') && (
                <div className="input-actions-right">
                  <button type="button" className="delete-voice-btn" onClick={() => deleteAudio('adDetail', setAdDetail)}>
                    <CrossIcon />
                  </button>
                </div>
              )}
            </div>
          </div>

          {}
          <div className="post-survey-question-block" ref={q4Ref}>
            <div className="post-survey-question-header">
              <span className="post-survey-question-num">4)</span>
              <span className="post-survey-question-text">What Is The First Thing You Remember About This Ad?</span>
            </div>
            <div className="ps-input-wrapper align-center">
              {voiceStates.firstRemember.state === 'loading' ? (
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
                    {voiceStates.firstRemember.state === 'idle' && (
                      <button type="button" className="voice-action-btn" onClick={() => startRecording('firstRemember', setFirstRemember)}>
                        <MicIcon />
                      </button>
                    )}
                    {voiceStates.firstRemember.state === 'listening' && (
                      <button type="button" className="chatgpt-listening-btn" onClick={stopRecording}>
                        <ListeningAnimation />
                      </button>
                    )}
                    {(voiceStates.firstRemember.state === 'hasAudio' || voiceStates.firstRemember.state === 'playing') && (
                      <button type="button" className="voice-action-btn" onClick={() => togglePlayAudio('firstRemember')}>
                        {voiceStates.firstRemember.state === 'playing' ? <PauseIcon /> : <PlayIcon />}
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    className="ps-text-field"
                    placeholder="Enter your answer here..."
                    value={firstRemember}
                    onChange={(e) => setFirstRemember(e.target.value)}
                    onFocus={() => {
                      setTimeout(() => {
                        if (firstRemember.trim() === '') scrollToQuestion(q4Ref);
                      }, 250);
                    }}
                  />
                </>
              )}
              {(voiceStates.firstRemember.state === 'hasAudio' || voiceStates.firstRemember.state === 'playing') && (
                <div className="input-actions-right">
                  <button type="button" className="delete-voice-btn" onClick={() => deleteAudio('firstRemember', setFirstRemember)}>
                    <CrossIcon />
                  </button>
                </div>
              )}
            </div>
          </div>

          {}
          <div className="post-survey-question-block" ref={q5Ref}>
            <div className="post-survey-question-header">
              <span className="post-survey-question-num">5)</span>
              <span className="post-survey-question-text">What Is The Ad Saying And How Does It Make You Feel?</span>
            </div>
            <div className="ps-input-wrapper">
              {voiceStates.adFeeling.state === 'loading' ? (
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
                    {voiceStates.adFeeling.state === 'idle' && (
                      <button type="button" className="voice-action-btn" onClick={() => startRecording('adFeeling', setAdFeeling)}>
                        <MicIcon />
                      </button>
                    )}
                    {voiceStates.adFeeling.state === 'listening' && (
                      <button type="button" className="chatgpt-listening-btn" onClick={stopRecording}>
                        <ListeningAnimation />
                      </button>
                    )}
                    {(voiceStates.adFeeling.state === 'hasAudio' || voiceStates.adFeeling.state === 'playing') && (
                      <button type="button" className="voice-action-btn" onClick={() => togglePlayAudio('adFeeling')}>
                        {voiceStates.adFeeling.state === 'playing' ? <PauseIcon /> : <PlayIcon />}
                      </button>
                    )}
                  </div>
                  <textarea
                    className="ps-textarea-field"
                    placeholder="Enter your answer here..."
                    value={adFeeling}
                    onChange={(e) => setAdFeeling(e.target.value)}
                    onFocus={() => {
                      setTimeout(() => {
                        if (adFeeling.trim() === '') scrollToQuestion(q5Ref);
                      }, 250);
                    }}
                  />
                </>
              )}
              {(voiceStates.adFeeling.state === 'hasAudio' || voiceStates.adFeeling.state === 'playing') && (
                <div className="input-actions-right">
                  <button type="button" className="delete-voice-btn" onClick={() => deleteAudio('adFeeling', setAdFeeling)}>
                    <CrossIcon />
                  </button>
                </div>
              )}
            </div>
          </div>

          {}
          <div className="post-survey-section-header">
            <span className="post-survey-section-title">Diagnostic Questions</span>
          </div>

          {}
          <div className="post-survey-question-block" ref={q6Ref}>
            <div className="post-survey-question-header">
              <span className="post-survey-question-num">6)</span>
              <span className="post-survey-question-text">Which Brand Was This Advertisement For?</span>
            </div>
            <div className="ps-input-wrapper">
              {voiceStates.adBrand.state === 'loading' ? (
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
                    {voiceStates.adBrand.state === 'idle' && (
                      <button type="button" className="voice-action-btn" onClick={() => startRecording('adBrand', setAdBrand)}>
                        <MicIcon />
                      </button>
                    )}
                    {voiceStates.adBrand.state === 'listening' && (
                      <button type="button" className="chatgpt-listening-btn" onClick={stopRecording}>
                        <ListeningAnimation />
                      </button>
                    )}
                    {(voiceStates.adBrand.state === 'hasAudio' || voiceStates.adBrand.state === 'playing') && (
                      <button type="button" className="voice-action-btn" onClick={() => togglePlayAudio('adBrand')}>
                        {voiceStates.adBrand.state === 'playing' ? <PauseIcon /> : <PlayIcon />}
                      </button>
                    )}
                  </div>
                  <textarea
                    className="ps-textarea-field"
                    placeholder="Enter your answer here..."
                    value={adBrand}
                    onChange={(e) => setAdBrand(e.target.value)}
                    onFocus={() => {
                      setTimeout(() => {
                        if (adBrand.trim() === '') scrollToQuestion(q6Ref);
                      }, 250);
                    }}
                  />
                </>
              )}
              {(voiceStates.adBrand.state === 'hasAudio' || voiceStates.adBrand.state === 'playing') && (
                <div className="input-actions-right">
                  <button type="button" className="delete-voice-btn" onClick={() => deleteAudio('adBrand', setAdBrand)}>
                    <CrossIcon />
                  </button>
                </div>
              )}
            </div>
          </div>

          {}
          <div className="post-survey-question-block" ref={q7Ref}>
            <div className="post-survey-question-header">
              <span className="post-survey-question-num">7)</span>
              <span className="post-survey-question-text">What Was The Main Message Of This Ad?</span>
            </div>
            <div className="ps-input-wrapper align-center">
              {voiceStates.adMessage.state === 'loading' ? (
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
                    {voiceStates.adMessage.state === 'idle' && (
                      <button type="button" className="voice-action-btn" onClick={() => startRecording('adMessage', setAdMessage)}>
                        <MicIcon />
                      </button>
                    )}
                    {voiceStates.adMessage.state === 'listening' && (
                      <button type="button" className="chatgpt-listening-btn" onClick={stopRecording}>
                        <ListeningAnimation />
                      </button>
                    )}
                    {(voiceStates.adMessage.state === 'hasAudio' || voiceStates.adMessage.state === 'playing') && (
                      <button type="button" className="voice-action-btn" onClick={() => togglePlayAudio('adMessage')}>
                        {voiceStates.adMessage.state === 'playing' ? <PauseIcon /> : <PlayIcon />}
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    className="ps-text-field"
                    placeholder="Enter your answer here..."
                    value={adMessage}
                    onChange={(e) => setAdMessage(e.target.value)}
                    onFocus={() => {
                      setTimeout(() => {
                        if (adMessage.trim() === '') scrollToQuestion(q7Ref);
                      }, 250);
                    }}
                  />
                </>
              )}
              {(voiceStates.adMessage.state === 'hasAudio' || voiceStates.adMessage.state === 'playing') && (
                <div className="input-actions-right">
                  <button type="button" className="delete-voice-btn" onClick={() => deleteAudio('adMessage', setAdMessage)}>
                    <CrossIcon />
                  </button>
                </div>
              )}
            </div>
          </div>

          {}
          <div className="post-survey-question-block" ref={q8Ref}>
            <div className="post-survey-question-header">
              <span className="post-survey-question-num">8)</span>
              <span className="post-survey-question-text">Is The Ad Saying Anything New? Why?</span>
            </div>
            <p className="post-survey-question-instruction">Please rate your experience.</p>
            <div className="ps-stars-row-container">
              <div className="ps-stars-row" onMouseLeave={() => setHoveredNewRating(null)}>
                {[1, 2, 3, 4, 5].map(rating => {
                  const active = hoveredNewRating !== null ? rating <= hoveredNewRating : rating <= isNewRating;
                  return (
                    <button
                      key={rating}
                      type="button"
                      className={`ps-star-btn ${active ? 'active' : ''}`}
                      onClick={() => {
                        setIsNewRating(rating);
                        setTimeout(() => {
                          scrollToQuestion(q9Ref);
                        }, 250);
                      }}
                      onMouseEnter={() => setHoveredNewRating(rating)}
                    >
                      <StarIcon active={active} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {}
          <div className="post-survey-question-block" ref={q9Ref}>
            <div className="post-survey-question-header">
              <span className="post-survey-question-num">9)</span>
              <span className="post-survey-question-text">After Watching This Ad, How Likely Are You To Consider This Brand?</span>
            </div>
            <p className="post-survey-question-instruction">Please rate your experience.</p>
            <div className="ps-stars-row-container">
              <div className="ps-stars-row" onMouseLeave={() => setHoveredConsiderRating(null)}>
                {[1, 2, 3, 4, 5].map(rating => {
                  const active = hoveredConsiderRating !== null ? rating <= hoveredConsiderRating : rating <= considerRating;
                  return (
                    <button
                      key={rating}
                      type="button"
                      className={`ps-star-btn ${active ? 'active' : ''}`}
                      onClick={() => setConsiderRating(rating)}
                      onMouseEnter={() => setHoveredConsiderRating(rating)}
                    >
                      <StarIcon active={active} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        <div className="post-survey-actions">
          <button
            type="submit"
            className={`post-survey-submit-btn ${isAllAnswered ? 'dark-btn' : ''}`}
            disabled={!isAllAnswered}
          >
            <span>Submit</span>
            <ArrowRightIcon />
          </button>
        </div>
      </form>
      <audio ref={audioPlayerRef} style={{ display: 'none' }} />
    </div>
  );
}
