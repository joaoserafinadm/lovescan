import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slide01 from './Slide01';
import Slide02 from './Slide02';
import Slide03 from './Slide03';
import styles from './Presentation.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Presentation = ({
  userName,
  loveName,
  day,
  month,
  year,
  couplePhoto,
  imagesArray,
  descriptionsArray,
  letterContent
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeSince, setTimeSince] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calcular o tempo desde que se conheceram
  useEffect(() => {
    const calculateTimeSince = () => {
      const startDate = new Date(`${year}-${month}-${day}`);
      const now = new Date();
      const difference = now - startDate;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeSince({ days, hours, minutes, seconds });
    };

    calculateTimeSince();
    const timer = setInterval(calculateTimeSince, 1000);

    return () => clearInterval(timer);
  }, [day, month, year]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  // Declare renderSlides como uma função que retorna o array de slides
  const renderSlides = () => [
    <Slide01 
      key="slide-01" 
      loveName={loveName} 
      couplePhoto={couplePhoto} 
      onNextSlide={nextSlide} 
    />,
    <Slide02 
      key="slide-02" 
      userName={userName} 
      loveName={loveName} 
      timeSince={timeSince} 
      onNextSlide={nextSlide}
    />,
    <Slide03
      key="slide-03"
      userName={userName}
      loveName={loveName}
      timeSince={timeSince}
      onNextSlide={nextSlide}
    />
  ];

  // Gera os slides apenas quando necessário
  const slides = renderSlides();

  return (
    <div className={styles.presentationContainer}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className={styles.slideContainer}
        >
          {slides[currentSlide]}
        </motion.div>
      </AnimatePresence>

      <div className={styles.navigationControls}>
        <button 
          className={styles.navButton} 
          onClick={prevSlide}
          aria-label="Slide anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <div className={styles.slideIndicators}>
          {slides.map((_, index) => (
            <button
              key={`indicator-${index}`}
              className={`${styles.indicator} ${currentSlide === index ? styles.activeIndicator : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
        <button 
          className={styles.navButton} 
          onClick={nextSlide}
          aria-label="Próximo slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Presentation;