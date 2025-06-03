import { Music, Pause, Play } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

const YouTubeAudioPlayer = ({ 
  musicLink, 
  autoplay = true, 
  volume = 100, 
  loop = true,
  showDebug = false 
}) => {
  // Estados do player
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerState, setPlayerState] = useState('unstarted');
  const [playerReady, setPlayerReady] = useState(false);
  const [playerError, setPlayerError] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);
  
  // Estados do UI
  const [isExpanded, setIsExpanded] = useState(true);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoId, setVideoId] = useState('');
  
  const playerRef = useRef(null);
  const isInitializingRef = useRef(false);
  const minimizeTimerRef = useRef(null);

  // Função para extrair o ID do vídeo do YouTube da URL
  const extractYouTubeId = (url) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Timer para minimizar após 3 segundos
  useEffect(() => {
    if (isExpanded && playerReady) {
      minimizeTimerRef.current = setTimeout(() => {
        setIsExpanded(false);
      }, 3000);
    }

    return () => {
      if (minimizeTimerRef.current) {
        clearTimeout(minimizeTimerRef.current);
      }
    };
  }, [isExpanded, playerReady]);

  // Detectar interação do usuário para fallback
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!userInteracted && playerRef.current) {
        console.log('🎵 [YouTubeAudioPlayer] Primeira interação detectada');
        setUserInteracted(true);
        
        setTimeout(() => {
          if (playerRef.current) {
            const currentState = playerRef.current.getPlayerState();
            console.log('🔊 Garantindo reprodução com som após interação');
            playerRef.current.unMute();
            playerRef.current.setVolume(volume);
            
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
  }, [userInteracted, volume]);

  // Carregar a API do YouTube
  useEffect(() => {
    if (!musicLink || isInitializingRef.current) return;

    const extractedVideoId = extractYouTubeId(musicLink);
    if (extractedVideoId) {
      setVideoId(extractedVideoId);
    }

    isInitializingRef.current = true;

    if (window.YT && window.YT.Player) {
      initializePlayer();
      return;
    }

    // Carregar a API do YouTube
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = initializePlayer;

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error('🎵 [YouTubeAudioPlayer] Erro ao destruir player:', error);
        }
      }
    };
  }, [musicLink]);

  const initializePlayer = () => {
    const extractedVideoId = extractYouTubeId(musicLink);
    if (!extractedVideoId) {
      console.error('🎵 [YouTubeAudioPlayer] ID do vídeo não encontrado:', musicLink);
      setPlayerError('URL inválida');
      return;
    }

    console.log('🎵 [YouTubeAudioPlayer] Inicializando player:', extractedVideoId);

    try {
      playerRef.current = new window.YT.Player('youtube-audio-player', {
        height: '0',
        width: '0',
        videoId: extractedVideoId,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
          loop: loop ? 1 : 0,
          playlist: loop ? extractedVideoId : undefined,
          mute: 0,
          enablejsapi: 1
        },
        events: {
          onReady: (event) => {
            console.log('🎵 [YouTubeAudioPlayer] Player pronto');
            setPlayerReady(true);
            setPlayerError(null);
            setIsMuted(false);
            
            // Obter título do vídeo
            try {
              const videoData = event.target.getVideoData();
              setVideoTitle(videoData.title || 'Música');
            } catch (error) {
              setVideoTitle('Música');
            }
            
            if (autoplay) {
              console.log('🎵 [YouTubeAudioPlayer] Iniciando reprodução automática');
              event.target.unMute();
              event.target.setVolume(volume);
              event.target.playVideo();
            }
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
            
            console.log(`🎵 [YouTubeAudioPlayer] Estado: ${currentState}`);
            
            // Reiniciar quando terminar (se loop ativo)
            if (event.data === 0 && loop) {
              console.log('🎵 [YouTubeAudioPlayer] Reiniciando para loop');
              setTimeout(() => {
                if (playerRef.current) {
                  playerRef.current.playVideo();
                }
              }, 500);
            }
            
            // Garantir que não está mutado quando começar a tocar
            if (event.data === 1) {
              if (playerRef.current && typeof playerRef.current.isMuted === 'function') {
                const actualMuteState = playerRef.current.isMuted();
                if (actualMuteState) {
                  console.log('🎵 [YouTubeAudioPlayer] Desmutando automaticamente');
                  playerRef.current.unMute();
                  playerRef.current.setVolume(volume);
                }
                setIsMuted(false);
              }
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
            console.error('🎵 [YouTubeAudioPlayer] Erro:', errorMessage);
            setPlayerError(errorMessage);
          }
        }
      });
    } catch (error) {
      console.error('🎵 [YouTubeAudioPlayer] Erro ao criar player:', error);
      setPlayerError('Erro ao inicializar player');
    }
  };

  // Verificação para manter sempre com som
  useEffect(() => {
    if (!playerReady) return;
    
    const interval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.isMuted === 'function') {
        const actualMuteState = playerRef.current.isMuted();
        if (actualMuteState) {
          console.log('🎵 [YouTubeAudioPlayer] Corrigindo estado mutado');
          playerRef.current.unMute();
          playerRef.current.setVolume(volume);
        }
        setIsMuted(false);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [playerReady, volume]);

  // Funções de controle público
  const play = () => {
    if (playerRef.current) {
      console.log('🎵 [YouTubeAudioPlayer] Play manual');
      playerRef.current.unMute();
      playerRef.current.setVolume(volume);
      playerRef.current.playVideo();
      setUserInteracted(true);
    }
  };

  const pause = () => {
    if (playerRef.current) {
      console.log('🎵 [YouTubeAudioPlayer] Pause manual');
      playerRef.current.pauseVideo();
    }
  };

  const setPlayerVolume = (newVolume) => {
    if (playerRef.current && newVolume >= 0 && newVolume <= 100) {
      playerRef.current.setVolume(newVolume);
      setCurrentVolume(newVolume);
      console.log(`🎵 [YouTubeAudioPlayer] Volume alterado para: ${newVolume}`);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (minimizeTimerRef.current) {
      clearTimeout(minimizeTimerRef.current);
    }
  };

  const getPlayerInfo = () => {
    return {
      isPlaying,
      playerState,
      playerReady,
      playerError,
      userInteracted,
      isMuted,
      currentVolume
    };
  };

  // Expor funções para o componente pai via ref
  React.useImperativeHandle(React.forwardRef(() => null), () => ({
    play,
    pause,
    togglePlayPause,
    setVolume: setPlayerVolume,
    getInfo: getPlayerInfo
  }));

  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : '';

  return (
    <>
      {/* Player invisível */}
      <div id="youtube-audio-player" style={{ display: 'none' }}></div>
      
      {/* Player Visual */}
      {playerReady && (
        <div
          style={{
            position: 'fixed',
            top: '5px',
            right: '5px',
            zIndex: 1000,
            transition: 'all 0.3s ease-in-out',
            cursor: 'pointer'
          }}
        >
          {isExpanded ? (
            // Card expandido
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                borderRadius: '12px',
                padding: '16px',
                color: 'white',
                maxWidth: '300px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header com botão minimizar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#60a5fa' }}>
                  <Music size={20} /> Tocando agora
                </div>
                <button
                  onClick={toggleExpanded}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    fontSize: '16px',
                    padding: '4px'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Thumbnail e Info */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                {thumbnailUrl && (
                  <img
                    src={thumbnailUrl}
                    alt="Video thumbnail"
                    style={{
                      width: '80px',
                      height: '60px',
                      borderRadius: '8px',
                      objectFit: 'cover'
                    }}
                  />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: '500',
                      marginBottom: '4px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {videoTitle}
                  </div>
                  {/* <div style={{ fontSize: '11px', color: '#9ca3af' }}>
                    {isPlaying ? '🎵 Playing' : '⏸️ Paused'}
                  </div> */}
                </div>
              </div>

              {/* Controles */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button
                  onClick={togglePlayPause}
                  style={{
                    backgroundColor: isPlaying ? '#dc2626' : '#059669',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    transition: 'all 0.2s'
                  }}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
              </div>

              {playerError && (
                <div style={{
                  marginTop: '8px',
                  padding: '8px',
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: '#ef4444'
                }}>
                  ❌ {playerError}
                </div>
              )}
            </div>
          ) : (
            // Ícone minimizado
            <div
              onClick={toggleExpanded}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ position: 'relative' }}>
                <span style={{ fontSize: '20px' }} className='d-flex align-items-center justify-content-center'><Music size={20} /></span>
                {isPlaying && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-2px',
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#10b981',
                      borderRadius: '50%',
                      animation: 'pulse 1.5s infinite'
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CSS para animação */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
          }
        `}
      </style>
    </>
  );
};

export default YouTubeAudioPlayer;