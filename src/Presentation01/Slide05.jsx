import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Presentation.module.css';
import InstagramEffect from "@/src/PresentationConfig1/InstagramEffect";

const Slide05 = ({ onNextSlide, imagesArray }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoadError, setImageLoadError] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagesArray.length);
    setImageLoadError(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imagesArray.length) % imagesArray.length);
    setImageLoadError(false);
  };

  const handleImageError = () => {
    setImageLoadError(true);
  };

  return (
    <div className={`${styles.slide} ${styles.firstSlide}`}>
      <div className={styles.slideContent}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={styles.slideTitle}
        >
          <h1>Nossos Momentos Especiais</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            position: 'relative',
            maxWidth: '600px',
            width: '100%',
            margin: '2rem auto',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            background: 'white',
            padding: '15px'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'relative',
                borderRadius: '15px',
                overflow: 'hidden',
                width: '100%',
                paddingBottom: '62.5%', // 16:10 aspect ratio
                backgroundColor: '#f5f5f5'
              }}
            >
              {/* Container absoluto para o conteúdo */}
              {/* Usa o InstagramEffect diretamente */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '100%',
                  maxWidth: '360px', // Limita largura para manter proporção mobile
                  margin: '0 auto'
                }}>
                  <InstagramEffect imageUrl={imagesArray[currentImageIndex]?.image?.url} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Botões de navegação */}
          {imagesArray.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'linear-gradient(135deg, #ff9db4, #ffb6c1)',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.5rem',
                  padding: '0.8rem',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  boxShadow: '0 8px 16px rgba(255, 182, 193, 0.3)',
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                ❮
              </button>
              <button 
                onClick={nextImage}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'linear-gradient(135deg, #ff9db4, #ffb6c1)',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.5rem',
                  padding: '0.8rem',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  boxShadow: '0 8px 16px rgba(255, 182, 193, 0.3)',
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                ❯
              </button>
            </>
          )}
        </motion.div>

        {/* Descrição da imagem */}
        <motion.div
          key={`desc-${currentImageIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            textAlign: 'center',
            color: '#666',
            fontSize: '1.5rem',
            fontStyle: 'italic',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 1rem'
          }}
        >
          <p>{imagesArray[currentImageIndex]?.description || "Um momento inesquecível"}</p>
        </motion.div>

        {/* Thumbnails */}
        {imagesArray.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              margin: '2rem 0',
              flexWrap: 'wrap',
              padding: '0 1rem'
            }}
          >
            {imagesArray.slice(0, 6).map((image, index) => (
              <motion.div
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: index === currentImageIndex ? '3px solid #ff9db4' : '3px solid transparent',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  WebkitTapHighlightColor: 'transparent',
                  flexShrink: 0
                }}
              >
                <img 
                  src={image?.image?.url} 
                  alt={image.description || `Foto ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <motion.button
          className={styles.nextButton}
          onClick={onNextSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continuar nossa história <span>💕</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Slide05;