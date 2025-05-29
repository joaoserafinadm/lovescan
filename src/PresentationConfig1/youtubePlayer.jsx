import React, { useState, useEffect } from "react";

export default function YoutubePlayer({ videoUrl, autoplay = false, controls = true }) {
  const [videoTitle, setVideoTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Função para extrair o ID do vídeo do YouTube
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Função para buscar o título do vídeo
  const fetchVideoTitle = async (videoId) => {
    if (!videoId) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );
      
      if (response.ok) {
        const data = await response.json();
        setVideoTitle(data.title || 'Título não disponível');
      } else {
        setVideoTitle('Título não disponível');
        setError('Não foi possível carregar o título do vídeo');
      }
    } catch (error) {
      console.error('Erro ao buscar título do vídeo:', error);
      setVideoTitle('Título não disponível');
      setError('Erro ao carregar informações do vídeo');
    } finally {
      setIsLoading(false);
    }
  };

  const videoId = getYouTubeVideoId(videoUrl);

  // Buscar título quando o videoId mudar
  useEffect(() => {
    if (videoId) {
      fetchVideoTitle(videoId);
    } else {
      setVideoTitle('');
      setError('');
    }
  }, [videoId]);

  // Se não há URL válida, não renderiza nada
  if (!videoUrl || !videoId) {
    return null;
  }

  return (
    <div className="youtube-player-container">
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card bg-secondary border-0">
          <div className="card-body p-3">
            {/* Header com thumbnail e título */}
            <div className="d-flex align-items-center mb-2">
              <div className="me-3">
                <div 
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundImage: `url(https://img.youtube.com/vi/${videoId}/mqdefault.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px'
                  }}
                ></div>
              </div>
              <div className="flex-grow-1">
                <h6 className="mb-1 text-white">
                  {isLoading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Carregando...
                    </span>
                  ) : (
                    <span>🎵 {videoTitle}</span>
                  )}
                </h6>
                <small className="text-muted">Player de áudio</small>
              </div>
            </div>
            
            {/* Player do YouTube */}
            <div style={{ height: '80px' }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}&modestbranding=1&rel=0&showinfo=0`}
                title="YouTube audio player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                style={{
                  width: '100%',
                  height: '80px',
                  borderRadius: '6px'
                }}
              ></iframe>
            </div>
            
            {/* Status do carregamento */}
            <div className="mt-2 text-center">
              {error ? (
                <small className="text-warning">
                  ⚠️ {error}
                </small>
              ) : (
                <small className="">
                  ✅ Trilha sonora carregada com sucesso
                </small>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}