import React, { useState, useEffect, useRef } from 'react';

const YouTubeAudioPlayer = ({ 
  musicLink, 
  autoplay = true, 
  volume =100, 
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
  
  const playerRef = useRef(null);
  const isInitializingRef = useRef(false);

  // Função para extrair o ID do vídeo do YouTube da URL
  const extractYouTubeId = (url) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

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
    const videoId = extractYouTubeId(musicLink);
    if (!videoId) {
      console.error('🎵 [YouTubeAudioPlayer] ID do vídeo não encontrado:', musicLink);
      setPlayerError('URL inválida');
      return;
    }

    console.log('🎵 [YouTubeAudioPlayer] Inicializando player:', videoId);

    try {
      playerRef.current = new window.YT.Player('youtube-audio-player', {
        height: '0',
        width: '0',
        videoId: videoId,
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
          playlist: loop ? videoId : undefined,
          mute: 0,
          enablejsapi: 1
        },
        events: {
          onReady: (event) => {
            console.log('🎵 [YouTubeAudioPlayer] Player pronto');
            setPlayerReady(true);
            setPlayerError(null);
            setIsMuted(false);
            
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

  return (
    <>
      {/* Player invisível */}
      <div id="youtube-audio-player" style={{ display: 'none' }}></div>
      
      {/* Debug Panel (opcional) */}
      {/* {showDebug && (
        <div style={{ 
          position: 'fixed', 
          bottom: '10px', 
          right: '10px', 
          background: 'rgba(0,0,0,0.9)', 
          color: 'white', 
          padding: '12px', 
          borderRadius: '8px',
          fontSize: '11px',
          zIndex: 1000,
          fontFamily: 'monospace',
          minWidth: '200px',
          maxWidth: '300px'
        }}>
          <div style={{marginBottom: '6px'}}><strong>🎵 YouTube Audio Player</strong></div>
          <div>Estado: <span style={{color: isPlaying ? '#10b981' : '#f59e0b'}}>{playerState}</span></div>
          <div>Tocando: <span style={{color: isPlaying ? '#10b981' : '#ef4444'}}>{isPlaying ? 'SIM ✅' : 'NÃO ❌'}</span></div>
          <div>Pronto: <span style={{color: playerReady ? '#10b981' : '#ef4444'}}>{playerReady ? 'SIM ✅' : 'NÃO ❌'}</span></div>
          <div>Volume: <span style={{color: '#60a5fa'}}>{currentVolume}</span></div>
          <div>Interação: <span style={{color: userInteracted ? '#10b981' : '#f59e0b'}}>{userInteracted ? 'SIM ✅' : 'NÃO ⏳'}</span></div>
          {playerError && <div style={{color: '#ef4444'}}>❌ {playerError}</div>}
          
          <div style={{marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px'}}>
            <button 
              onClick={play}
              style={{
                padding: '4px 8px', 
                backgroundColor: '#059669', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer', 
                fontSize: '9px'
              }}
            >
              ▶️ PLAY
            </button>
            <button 
              onClick={pause}
              style={{
                padding: '4px 8px', 
                backgroundColor: '#dc2626', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer', 
                fontSize: '9px'
              }}
            >
              ⏸️ PAUSE
            </button>
            <button 
              onClick={() => setPlayerVolume(currentVolume === 0 ? volume : 0)}
              style={{
                padding: '4px 8px', 
                backgroundColor: '#7c3aed', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer', 
                fontSize: '9px'
              }}
            >
              {currentVolume === 0 ? '🔊 VOL' : '🔇 MUTE'}
            </button>
          </div>
          
          {isPlaying && (
            <div style={{
              marginTop: '6px',
              padding: '6px',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              borderRadius: '4px',
              fontSize: '10px',
              color: '#10b981'
            }}>
              🎵 Música tocando com som! ✅
            </div>
          )}
          
          {!isPlaying && playerReady && (
            <div style={{
              marginTop: '6px',
              padding: '6px',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              borderRadius: '4px',
              fontSize: '10px',
              color: '#ef4444'
            }}>
              ⚠️ Clique PLAY ou interaja com a página
            </div>
          )}
        </div>
      )} */}
    </>
  );
};

export default YouTubeAudioPlayer;