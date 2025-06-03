import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slide01 from './Slide01';
import Slide02 from './Slide02';
import Slide03 from './Slide03';
import styles from './Presentation.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slide04 from './Slide04';
import Slide05 from './Slide05';
import Slide06 from './Slide06';
import Slide07 from './Slide07';
import Slide08 from './Slide08'; // Importar o componente
import YouTubeAudioPlayer from '../Presentation/YouTubeAudioPlayer';

const Presentation = ({
  userName,
  loveName,
  day,
  month,
  year,
  couplePhoto,
  imagesArray,
  descriptionsArray,
  letterContent,
  musicLink
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeSince, setTimeSince] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Ref para controlar o player de áudio
  const audioPlayerRef = useRef(null);

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
    />,
    <Slide04
      key="slide-04"
      onNextSlide={nextSlide}
    />,
    <Slide05
      key="slide-05"
      imagesArray={imagesArray}
      onNextSlide={nextSlide}
    />,
    <Slide06
      key="slide-06"
      onNextSlide={nextSlide}
    />,
    <Slide07
      key="slide-07"
      onNextSlide={nextSlide}
      letterContent={letterContent}
    />,
    <Slide08
      key="slide-08"
      onNextSlide={nextSlide}
      userName={userName}
      loveName={loveName}
    />,
  ];

  const slides = renderSlides();

  return (
    <div className={`fadeItem ${styles.presentationContainer}`}>
      {/* ✅ Componente de Áudio Separado */}
      {musicLink && (
        <YouTubeAudioPlayer
          ref={audioPlayerRef}
          musicLink={musicLink}
          autoplay={true}
        volume={70}
        loop={true}
          showDebug={process.env.NODE_ENV === 'development'} // Debug só em dev
        />
      )}

      
      
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