import React, { useEffect, useState } from 'react';
import './css/BackToTop.css'

const BackToTopButton = ({ threshold = 300 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return isVisible ? (
    <button className="back-to-top" onClick={scrollToTop}>
      ↑ Back to Top
    </button>
  ) : null;
};

export default BackToTopButton;
