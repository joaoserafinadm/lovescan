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
import Slide08 from './Slide08';

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
  const playerRef = useRef(null);

  // Função para extrair o ID do vídeo do YouTube da URL
  const extractYouTubeId = (url) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Carregar a API do YouTube
  useEffect(() => {
    if (!musicLink) return;

    // Verificar se a API já foi carregada
    if (window.YT && window.YT.Player) {
      initializePlayer();
      return;
    }

    // Carregar a API do YouTube
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Callback global para quando a API estiver pronta
    window.onYouTubeIframeAPIReady = initializePlayer;

    return () => {
      // Cleanup
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
    };
  }, [musicLink]);

  const initializePlayer = () => {
    const videoId = extractYouTubeId(musicLink);
    if (!videoId) return;

    playerRef.current = new window.YT.Player('youtube-player', {
      height: '0',
      width: '0',
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        loop: 1,
        playlist: videoId // Necessário para o loop funcionar
      },
      events: {
        onReady: (event) => {
          // Definir volume e tocar automaticamente
          event.target.setVolume(50);
          event.target.playVideo();
        },
        onStateChange: (event) => {
          // Reiniciar o vídeo quando terminar (backup para o loop)
          if (event.data === window.YT.PlayerState.ENDED) {
            event.target.playVideo();
          }
        }
      }
    });
  };

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

  // Gera os slides apenas quando necessário
  const slides = renderSlides();

  return (
    <div className={`fadeItem ${styles.presentationContainer}`}>
      {/* Player do YouTube invisível */}
      <div id="youtube-player" style={{ display: 'none' }}></div>
      
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