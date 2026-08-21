import React, { useState, useRef, useEffect } from 'react';
import maivenLogo from '../assets/maiven_logo.png';

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="chevron-icon">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export default function OnboardingForm({ onSubmit }) {
  const [country, setCountry] = useState('United States');
  const [region, setRegion] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [countryOpen, setCountryOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);

  const [countrySearch, setCountrySearch] = useState('');
  const [regionSearch, setRegionSearch] = useState('');

  const countryRef = useRef(null);
  const regionRef = useRef(null);
  const genderRef = useRef(null);

  const countries = ['India', 'United States'];
  const regions = {
    'United States': ['California', 'New York', 'Texas', 'Florida', 'Washington', 'Illinois', 'Massachusetts'],
    'India': [
      'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
      'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
      'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
      'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
      'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
      'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
      'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
    ]
  };
  const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

  useEffect(() => {
    function handleClickOutside(event) {
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setCountryOpen(false);
      }
      if (regionRef.current && !regionRef.current.contains(event.target)) {
        setRegionOpen(false);
      }
      if (genderRef.current && !genderRef.current.contains(event.target)) {
        setGenderOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCountryDropdown = () => {
    if (countryOpen) {
      setCountryOpen(false);
    } else {
      setCountrySearch('');
      setCountryOpen(true);
      setRegionOpen(false);
      setGenderOpen(false);
    }
  };

  const toggleRegionDropdown = () => {
    if (!country) return;
    if (regionOpen) {
      setRegionOpen(false);
    } else {
      setRegionSearch('');
      setRegionOpen(true);
      setCountryOpen(false);
      setGenderOpen(false);
    }
  };

  const handleCountrySelect = (c) => {
    setCountry(c);
    setRegion('');
    setCountryOpen(false);
  };

  const handleRegionSelect = (r) => {
    setRegion(r);
    setRegionOpen(false);
  };

  const handleGenderSelect = (g) => {
    setGender(g);
    setGenderOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return;
    onSubmit({ country, region, age, gender });
  };

  const filteredCountries = countries.filter(c => 
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredRegions = (regions[country] || []).filter(r => 
    r.toLowerCase().includes(regionSearch.toLowerCase())
  );

  const handleCountryKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCountries.length > 0) {
        handleCountrySelect(filteredCountries[0]);
      }
    } else if (e.key === 'Escape') {
      setCountryOpen(false);
    }
  };

  const handleRegionKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredRegions.length > 0) {
        handleRegionSelect(filteredRegions[0]);
      }
    } else if (e.key === 'Escape') {
      setRegionOpen(false);
    }
  };

  return (
    <div className="onboarding-left">
      <header className="logo-container">
        <img src={maivenLogo} alt="maiven" className="logo-img" />
      </header>

      <div className="welcome-text">
        <h1>Nice to meet you! <span className="wave-emoji">👋</span></h1>
        <p className="subtitle">Tell us about yourself to get started.</p>
      </div>

      <form className="onboarding-form" onSubmit={handleSubmit}>
        <div className="form-field-wrapper" ref={countryRef}>
          <div 
            className={`custom-select-trigger ${countryOpen ? 'active' : ''}`}
            onClick={toggleCountryDropdown}
          >
            <div className="field-icon-bg">
              <GlobeIcon />
            </div>
            <div className="field-content">
              <span className="field-label">Country</span>
              {countryOpen ? (
                <input 
                  type="text" 
                  className="field-search-input"
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={handleCountryKeyDown}
                  placeholder={country || 'Select Country'}
                  autoFocus
                />
              ) : (
                <span className="field-value">{country || 'Select Country'}</span>
              )}
            </div>
            <ChevronDownIcon />
          </div>
          {countryOpen && (
            <div className="dropdown-options">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((c) => (
                  <div 
                    key={c} 
                    className={`dropdown-option ${country === c ? 'selected' : ''}`}
                    onClick={() => handleCountrySelect(c)}
                  >
                    {c}
                  </div>
                ))
              ) : (
                <div className="dropdown-option-empty">No matches found</div>
              )}
            </div>
          )}
        </div>

        <div className="form-field-wrapper" ref={regionRef}>
          <div 
            className={`custom-select-trigger ${regionOpen ? 'active' : ''} ${!country ? 'disabled' : ''}`}
            onClick={toggleRegionDropdown}
          >
            <div className="field-icon-bg">
              <PinIcon />
            </div>
            <div className="field-content">
              <span className="field-label">Region</span>
              {regionOpen && country ? (
                <input 
                  type="text" 
                  className="field-search-input"
                  value={regionSearch}
                  onChange={(e) => setRegionSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={handleRegionKeyDown}
                  placeholder={region || 'Select Region'}
                  autoFocus
                />
              ) : (
                <span className={`field-value ${!region ? 'placeholder' : ''}`}>
                  {region || 'Select Region'}
                </span>
              )}
            </div>
            <ChevronDownIcon />
          </div>
          {regionOpen && country && (
            <div className="dropdown-options">
              {filteredRegions.length > 0 ? (
                filteredRegions.map((r) => (
                  <div 
                    key={r} 
                    className={`dropdown-option ${region === r ? 'selected' : ''}`}
                    onClick={() => handleRegionSelect(r)}
                  >
                    {r}
                  </div>
                ))
              ) : (
                <div className="dropdown-option-empty">No matches found</div>
              )}
            </div>
          )}
        </div>

        <div className="form-row-grid">
          <div className="form-field-wrapper">
            <label className="custom-input-label-wrapper">
              <div className="field-icon-bg">
                <CalendarIcon />
              </div>
              <div className="field-content">
                <span className="field-label">Age</span>
                <input 
                  type="number" 
                  className="custom-input-field" 
                  placeholder="Enter Age"
                  value={age}
                  min="1"
                  max="120"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </label>
          </div>

          <div className="form-field-wrapper" ref={genderRef}>
            <div 
              className={`custom-select-trigger ${genderOpen ? 'active' : ''}`}
              onClick={() => setGenderOpen(!genderOpen)}
            >
              <div className="field-icon-bg">
                <UserIcon />
              </div>
              <div className="field-content">
                <span className="field-label">Gender</span>
                <span className={`field-value ${!gender ? 'placeholder' : ''}`}>
                  {gender || 'Select Gender'}
                </span>
              </div>
              <ChevronDownIcon />
            </div>
            {genderOpen && (
              <div className="dropdown-options">
                {genders.map((g) => (
                  <div 
                    key={g} 
                    className={`dropdown-option ${gender === g ? 'selected' : ''}`}
                    onClick={() => handleGenderSelect(g)}
                  >
                    {g}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="terms-container">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              className="checkbox-input"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span className="checkbox-custom"></span>
            <span className="terms-text">
              I have read and agree to the <a href="#terms" className="link">Terms and Conditions</a> and <a href="#privacy" className="link">Privacy Policy</a>
            </span>
          </label>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={!agreed}
        >
          <span>Begin</span>
          <svg className="arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </form>
    </div>
  );
}
