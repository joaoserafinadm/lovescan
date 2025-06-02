import { useState, useRef } from 'react';

// Componente otimizado para iOS com fallback de aspect ratio
const InstagramImageDisplay = ({ imageUrl, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef(null);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Container com padding-bottom trick para aspect ratio (funciona em todos os iOS)
  const containerStyle = {
    position: 'relative',
    width: '100%',
    paddingBottom: '177.78%', // 9:16 aspect ratio (16/9 * 100)
    backgroundColor: '#000',
    overflow: 'hidden',
    borderRadius: '8px'
  };

  const innerContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  };

  const backgroundBlurStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'blur(15px)',
    opacity: 0.7,
    transform: 'scale(1.1)',
    WebkitFilter: 'blur(15px)', // Prefixo para Safari
    WebkitTransform: 'scale(1.1)' // Prefixo para Safari
  };

  const mainImageStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '100%',
    maxWidth: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    zIndex: 10,
    WebkitTransform: 'translate(-50%, -50%)', // Prefixo para Safari
    display: 'block' // Importante para iOS
  };

  const loadingContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'white',
    WebkitTransform: 'translate(-50%, -50%)'
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={innerContainerStyle}>
        {/* Background com blur - só mostra se a imagem carregou */}
        {isLoaded && !hasError && (
          <img
            src={imageUrl}
            alt=""
            style={backgroundBlurStyle}
            aria-hidden="true" // Indica que é decorativo
          />
        )}

        {/* Imagem principal */}
        {!hasError && (
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Imagem"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={mainImageStyle}
          />
        )}

        {/* Estado de erro */}
        {hasError && (
          <div style={loadingContainerStyle}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📷</div>
            <div style={{ fontSize: '14px' }}>Erro ao carregar imagem</div>
          </div>
        )}

        {/* Loading state */}
        {!isLoaded && !hasError && (
          <div style={loadingContainerStyle}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(255,255,255,0.3)',
              borderTopColor: 'white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 10px'
            }} />
            <div style={{ fontSize: '12px' }}>Carregando...</div>
            
            <style jsx>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
              @-webkit-keyframes spin {
                to { -webkit-transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramImageDisplay;