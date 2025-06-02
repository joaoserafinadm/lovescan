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
  
  // Estados para monitoramento do player
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerState, setPlayerState] = useState('unstarted');
  const [playerReady, setPlayerReady] = useState(false);
  const [playerError, setPlayerError] = useState(null);
  
  const playerRef = useRef(null);

  console.log("musicLink", musicLink);

  // Função para extrair o ID do vídeo do YouTube da URL
  const extractYouTubeId = (url) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Função para verificar status do player programaticamente
  const checkPlayerStatus = () => {
    if (playerRef.current && playerRef.current.getPlayerState) {
      try {
        const state = playerRef.current.getPlayerState();
        const volume = playerRef.current.getVolume();
        const currentTime = playerRef.current.getCurrentTime();
        
        const statusInfo = {
          state,
          volume,
          currentTime,
          isPlaying: state === 1
        };
        
        console.log('Status do player:', statusInfo);
        return statusInfo;
      } catch (error) {
        console.error('Erro ao verificar status do player:', error);
        return null;
      }
    }
    return null;
  };

  // Função para lidar com falhas de autoplay
  const handleAutoplayFail = () => {
    console.warn('Autoplay pode ter falhado. Tentando reproduzir novamente...');
    if (playerRef.current && playerRef.current.playVideo) {
      setTimeout(() => {
        try {
          playerRef.current.playVideo();
        } catch (error) {
          console.error('Erro ao tentar reproduzir vídeo:', error);
        }
      }, 1000);
    }
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
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error('Erro ao destruir player:', error);
        }
      }
    };
  }, [musicLink]);

  const initializePlayer = () => {
    const videoId = extractYouTubeId(musicLink);
    if (!videoId) {
      console.error('ID do vídeo não encontrado na URL:', musicLink);
      return;
    }

    console.log('Inicializando player com videoId:', videoId);

    try {
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
            console.log('Player pronto');
            setPlayerReady(true);
            setPlayerError(null);
            
            // Definir volume e tocar automaticamente
            event.target.setVolume(50);
            event.target.playVideo();
            
            // Verificar se começou a tocar após alguns segundos
            setTimeout(() => {
              const currentState = event.target.getPlayerState();
              console.log('Estado após 3 segundos:', currentState);
              if (currentState !== 1) { // 1 = playing
                handleAutoplayFail();
              }
            }, 3000);
          },
          onStateChange: (event) => {
            // Mapear os estados do player
            const states = {
              [-1]: 'unstarted',
              [0]: 'ended',
              [1]: 'playing',
              [2]: 'paused',
              [3]: 'buffering',
              [5]: 'video cued'
            };
            
            const currentState = states[event.data] || 'unknown';
            setPlayerState(currentState);
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
            
            console.log('Mudança de estado do player:', currentState, 'Data:', event.data);
            
            // Reiniciar o vídeo quando terminar (backup para o loop)
            if (event.data === window.YT.PlayerState.ENDED) {
              console.log('Vídeo terminou, reiniciando...');
              event.target.playVideo();
            }
          },
          onError: (event) => {
            const errorMessages = {
              2: 'ID do vídeo inválido',
              5: 'Erro de reprodução HTML5',
              100: 'Vídeo não encontrado ou privado',
              101: 'Reprodução não permitida em players embarcados',
              150: 'Reprodução não permitida em players embarcados'
            };
            
            const errorMessage = errorMessages[event.data] || `Erro desconhecido: ${event.data}`;
            console.error('Erro no player do YouTube:', errorMessage);
            setPlayerError(errorMessage);
          }
        }
      });
    } catch (error) {
      console.error('Erro ao criar player do YouTube:', error);
      setPlayerError('Erro ao inicializar player');
    }
  };

  // Verificação periódica do status (opcional para debug)
  useEffect(() => {
    if (!playerReady) return;
    
    const interval = setInterval(() => {
      if (process.env.NODE_ENV === 'development') {
        checkPlayerStatus();
      }
    }, 10000); // Verifica a cada 10 segundos apenas em desenvolvimento
    
    return () => clearInterval(interval);
  }, [playerReady]);

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

  // Função para controle manual do player (útil para debug)
  const togglePlayPause = () => {
    if (playerRef.current) {
      const currentState = playerRef.current.getPlayerState();
      if (currentState === 1) { // playing
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  return (
    <div className={`fadeItem ${styles.presentationContainer}`}>
      {/* Indicador de status do player (apenas em desenvolvimento) */}
      {/* {process.env.NODE_ENV === 'development' && ( */}
        <div style={{ 
          position: 'fixed', 
          top: '10px', 
          right: '10px', 
          background: 'rgba(0,0,0,0.8)', 
          color: 'white', 
          padding: '12px', 
          borderRadius: '8px',
          fontSize: '12px',
          zIndex: 1000,
          fontFamily: 'monospace',
          minWidth: '200px'
        }}>
          <div><strong>🎵 Player Status</strong></div>
          <div>Estado: <span style={{color: isPlaying ? '#4ade80' : '#fbbf24'}}>{playerState}</span></div>
          <div>Tocando: <span style={{color: isPlaying ? '#4ade80' : '#ef4444'}}>{isPlaying ? 'Sim' : 'Não'}</span></div>
          <div>Pronto: <span style={{color: playerReady ? '#4ade80' : '#ef4444'}}>{playerReady ? 'Sim' : 'Não'}</span></div>
          {playerError && <div style={{color: '#ef4444'}}>Erro: {playerError}</div>}
          <button 
            onClick={togglePlayPause}
            style={{
              marginTop: '8px',
              padding: '4px 8px',
              backgroundColor: '#374151',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '10px'
            }}
          >
            {isPlaying ? 'Pausar' : 'Tocar'}
          </button>
          <button 
            onClick={checkPlayerStatus}
            style={{
              marginTop: '4px',
              marginLeft: '4px',
              padding: '4px 8px',
              backgroundColor: '#374151',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '10px'
            }}
          >
            Verificar Status
          </button>
        </div>
      {/* )} */}
      
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