import React, { useState } from "react";
import Button from "../components/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Input from "../components/Input";

export default function Config_031(props) {
  const { musicLink, setMusicLink } = props;
  const [videoTitle, setVideoTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    try {
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      if (response.ok) {
        const data = await response.json();
        setVideoTitle(data.title || 'Título não disponível');
      } else {
        setVideoTitle('Título não disponível');
      }
    } catch (error) {
      console.error('Erro ao buscar título do vídeo:', error);
      setVideoTitle('Título não disponível');
    } finally {
      setIsLoading(false);
    }
  };

  const videoId = getYouTubeVideoId(musicLink);

  // Buscar título quando o videoId mudar
  React.useEffect(() => {
    if (videoId) {
      fetchVideoTitle(videoId);
    } else {
      setVideoTitle('');
    }
  }, [videoId]);

  return (
    <>
      <main className="card border-secondary bg-dark m-2">
        <div className="card-body">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-start my-3">
              <h2 className="text-c-primary">Escolha a trilha sonora 🎵</h2>
            </div>
            <div className="col-12 d-flex justify-content-start my-3">
              <p className="">Escolha a trilha sonora da apresentação!</p>
            </div>

            {/* Área de input para o link do YouTube */}
            <div className="col-12 mb-4">
              <Input
                type="text"
                placeholder="Cole aqui o link do YouTube"
                name="musicLink"
                id="musicLink"
                variant="default"
                size="md"
                fullWidth
                label="Link da trilha sonora (Youtube)"
                value={musicLink}
                onChange={(e) => setMusicLink(e.target.value)}
              />
            </div>

            {/* Player de áudio do YouTube - aparece apenas quando há um link válido */}
            {videoId && (
              <div className="col-12 mb-4">
                <div className="d-flex justify-content-center">
                  <div style={{ width: '100%', maxWidth: '400px' }}>
                    <div className="card bg-secondary border-0">
                      <div className="card-body p-3">
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
                        
                        <div style={{ height: '80px' }}>
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&modestbranding=1&rel=0&showinfo=0`}
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
                        
                        <div className="mt-2 text-center">
                          <small className="">
                            ✅ Trilha sonora carregada com sucesso
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mensagem de erro para links inválidos */}
            {musicLink && !videoId && (
              <div className="col-12 mb-4">
                <div className="alert alert-warning" role="alert">
                  <small>
                    ⚠️ Link do YouTube inválido. Certifique-se de usar um link válido do YouTube.
                  </small>
                </div>
              </div>
            )}

            <div className="col-12 d-flex justify-content-between mt-5">
              <Button
                outline
                variant="ghost"
                data-bs-target="#newPresentationCarousel"
                data-bs-slide='prev'
              >
                <ChevronLeft /> Voltar
              </Button>
              <Button
                outline
                data-bs-target="#newPresentationCarousel"
                data-bs-slide='next'
              >
                Próximo <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Link para fontes manuscritas do Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"
        rel="stylesheet"
      />
    </>
  );
}