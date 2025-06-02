// Calcular o tempo desde que se conheceramimport React, { useState, useEffect, useRef } from 'react';
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
import { useEffect, useRef, useState } from 'react';

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
  const [userInteracted, setUserInteracted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  const playerRef = useRef(null);
  const isInitializingRef = useRef(false);

  // console.log("musicLink", musicLink);

  // Função para extrair o ID do vídeo do YouTube da URL
  const extractYouTubeId = (url) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Detectar interação do usuário para fallback se autoplay com som falhar
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!userInteracted && playerRef.current) {
        console.log('👆 Primeira interação do usuário detectada');
        setUserInteracted(true);
        
        // Garantir que está com som após interação
        setTimeout(() => {
          if (playerRef.current) {
            const currentState = playerRef.current.getPlayerState();
            console.log('🔊 Garantindo reprodução com som após interação, estado:', currentState);
            playerRef.current.unMute();
            playerRef.current.setVolume(50);
            
            // Se não estiver tocando, tentar reproduzir
            if (currentState !== 1) {
              playerRef.current.playVideo();
            }
            setIsMuted(false);
          }
        }, 200);
      }
    };

    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [userInteracted]);

  // Carregar a API do YouTube
  useEffect(() => {
    if (!musicLink || isInitializingRef.current) return;

    isInitializingRef.current = true;

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

    console.log('🎬 Inicializando player com videoId:', videoId);

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
          playlist: videoId,
          mute: 0,              // ✅ MUDANÇA: Não iniciar mutado
          enablejsapi: 1
        },
        events: {
          onReady: (event) => {
            console.log('✅ Player pronto');
            setPlayerReady(true);
            setPlayerError(null);
            setIsMuted(false); // ✅ Inicia desmutado
            
            // ✅ Configurar volume e reproduzir com som
            console.log('🎵 Iniciando reprodução com som');
            event.target.unMute();
            event.target.setVolume(50);
            event.target.playVideo();
          },
          
          onStateChange: (event) => {
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
            setIsPlaying(event.data === 1);
            
            console.log(`🔄 Estado: ${currentState} (${event.data})`);
            
            // ÚNICA INTERVENÇÃO: Reiniciar quando terminar
            if (event.data === 0) { // ENDED
              console.log('🔁 Vídeo terminou, reiniciando...');
              setTimeout(() => {
                if (playerRef.current) {
                  playerRef.current.playVideo();
                }
              }, 500);
            }
            
            // Log importante: quando começar a tocar
            if (event.data === 1) {
              console.log('🎵 TOCANDO! Mutado:', playerRef.current?.isMuted());
              // Verificar e garantir que não está mutado
              if (playerRef.current && typeof playerRef.current.isMuted === 'function') {
                const actualMuteState = playerRef.current.isMuted();
                if (actualMuteState) {
                  console.log('🔊 Player estava mutado, desmutando...');
                  playerRef.current.unMute();
                  playerRef.current.setVolume(50);
                }
                setIsMuted(false); // Sempre manter desmutado
                console.log('🔊 Estado garantido: COM SOM');
              }
            }
            
            // Log quando pausar (sem tentar corrigir)
            if (event.data === 2) {
              console.log('⏸️ PAUSOU - deixando quieto');
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
            console.error('❌ Erro no player:', errorMessage);
            setPlayerError(errorMessage);
          }
        }
      });
    } catch (error) {
      console.error('❌ Erro ao criar player:', error);
      setPlayerError('Erro ao inicializar player');
    }
  };

  // Verificação periódica para garantir que nunca fica mutado
  useEffect(() => {
    if (!playerReady) return;
    
    const interval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.isMuted === 'function') {
        const actualMuteState = playerRef.current.isMuted();
        if (actualMuteState) {
          console.log('🔊 Detectado estado mutado, corrigindo...');
          playerRef.current.unMute();
          playerRef.current.setVolume(50);
        }
        setIsMuted(false); // Sempre manter como não mutado
      }
    }, 2000); // Verifica a cada 2 segundos
    
    return () => clearInterval(interval);
  }, [playerReady]);
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

  // Função manual para controle
  const manualPlay = () => {
    if (playerRef.current) {
      console.log('🎵 Play manual COM SOM');
      playerRef.current.unMute();
      playerRef.current.setVolume(50);
      playerRef.current.playVideo();
      setUserInteracted(true);
      setIsMuted(false);
    }
  };

  const manualPause = () => {
    if (playerRef.current) {
      console.log('⏸️ Pause manual');
      playerRef.current.pauseVideo();
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      const currentMuteState = playerRef.current.isMuted();
      if (currentMuteState) {
        playerRef.current.unMute();
        playerRef.current.setVolume(50);
        setIsMuted(false);
        console.log('🔊 Desmutado manualmente');
      } else {
        playerRef.current.mute();
        setIsMuted(true);
        console.log('🔇 Mutado manualmente');
      }
    }
  };

  return (
    <div className={`fadeItem ${styles.presentationContainer}`}>
      {/* Debug Panel Simplificado */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ 
          position: 'fixed', 
          top: '10px', 
          right: '10px', 
          background: 'rgba(0,0,0,0.9)', 
          color: 'white', 
          padding: '16px', 
          borderRadius: '12px',
          fontSize: '12px',
          zIndex: 1000,
          fontFamily: 'monospace',
          minWidth: '280px'
        }}>
          <div style={{marginBottom: '8px'}}><strong>🎵 Player Status</strong></div>
          <div>Estado: <span style={{color: isPlaying ? '#10b981' : '#f59e0b'}}>{playerState}</span></div>
          <div>Tocando: <span style={{color: isPlaying ? '#10b981' : '#ef4444'}}>{isPlaying ? 'SIM ✅' : 'NÃO ❌'}</span></div>
          <div>Pronto: <span style={{color: playerReady ? '#10b981' : '#ef4444'}}>{playerReady ? 'SIM ✅' : 'NÃO ❌'}</span></div>
          <div>Mutado: <span style={{color: isMuted ? '#f59e0b' : '#10b981'}}>{isMuted ? 'SIM 🔇' : 'NÃO 🔊'}</span></div>
          <div>User Click: <span style={{color: userInteracted ? '#10b981' : '#f59e0b'}}>{userInteracted ? 'SIM ✅' : 'NÃO ⏳'}</span></div>
          {playerError && <div style={{color: '#ef4444'}}>❌ {playerError}</div>}
          
          <div style={{marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '4px'}}>
            <button onClick={manualPlay} style={{padding: '6px 8px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px'}}>
              ▶️ PLAY
            </button>
            <button onClick={manualPause} style={{padding: '6px 8px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px'}}>
              ⏸️ PAUSE
            </button>
            <button onClick={toggleMute} style={{padding: '6px 8px', backgroundColor: '#7c3aed', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px'}}>
              {isMuted ? '🔊 UNMUTE' : '🔇 MUTE'}
            </button>
          </div>
          
          {!isPlaying && playerReady && (
            <div style={{
              marginTop: '8px',
              padding: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              borderRadius: '6px',
              fontSize: '11px',
              color: '#ef4444'
            }}>
              ⚠️ Player não está tocando - use PLAY manual (COM SOM)
            </div>
          )}
          
          {isPlaying && !isMuted && (
            <div style={{
              marginTop: '8px',
              padding: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              borderRadius: '6px',
              fontSize: '11px',
              color: '#10b981'
            }}>
              🎵 Música tocando COM SOM! ✅
            </div>
          )}
        </div>
      )}
      
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