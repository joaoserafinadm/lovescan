import { useState, useRef } from 'react';

// Componente simplificado para exibir imagem com efeito Instagram
const InstagramImageDisplay = ({ imageUrl, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef(null);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Proporção de tela de celular típica com responsividade
  const mobileRatio = {
    width: '100%',
    maxWidth: '100%',
    aspectRatio: '9/16', // Proporção fixa de um celular (9:16)
    position: 'relative',
    overflow: 'hidden',
    margin: '0 auto',
    backgroundColor: '#000'
  };

  return (
    <div style={mobileRatio} className={`rounded ${className}`}>
      {/* Background com blur */}
      {isLoaded && (
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <img
            src={imageUrl}
            alt="Background blur"
            className="w-100 h-100"
            style={{
              objectFit: 'cover',
              filter: 'blur(15px)',
              opacity: 0.7,
              transform: 'scale(1.1)'
            }}
          />
        </div>
      )}

      {/* Imagem principal centralizada */}
      <div className="position-relative w-100 h-100 d-flex align-items-center justify-content-center">
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Imagem"
          onLoad={handleImageLoad}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            zIndex: 10
          }}
        />
      </div>

      {/* Loading state */}
      {!isLoaded && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="spinner-border text-light mb-2" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <div className="text-light small">Carregando imagem...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramImageDisplay;