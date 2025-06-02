import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Presentation.module.css';
import InstagramEffect from "@/src/PresentationConfig1/InstagramEffect";

const Slide05 = ({ onNextSlide, imagesArray }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [useInstagramEffect, setUseInstagramEffect] = useState(true);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagesArray.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imagesArray.length) % imagesArray.length);
  };

  const handleImageError = () => {
    // Se o InstagramEffect falhar, usa imagem simples
    setUseInstagramEffect(false);
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
            maxWidth: '400px', // Reduzido para acomodar melhor o formato vertical
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
                width: '100%',
                borderRadius: '15px',
                overflow: 'hidden',
                backgroundColor: '#f5f5f5'
              }}
            >
              {useInstagramEffect ? (
                // Renderiza o InstagramEffect com seu próprio aspect ratio
                <div style={{ width: '100%' }}>
                  <InstagramEffect 
                    imageUrl={imagesArray[currentImageIndex]?.image?.url}
                    onError={handleImageError}
                  />
                </div>
              ) : (
                // Fallback: imagem simples com aspect ratio 16:10
                <div style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '62.5%', // 16:10 aspect ratio
                  backgroundColor: '#f5f5f5'
                }}>
                  <img 
                    src={imagesArray[currentImageIndex]?.image?.url} 
                    alt={imagesArray[currentImageIndex]?.description || "Momento especial"}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#666;">Erro ao carregar imagem</div>';
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Botões de navegação */}
          {imagesArray.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'linear-gradient(135deg, #ff9db4, #ffb6c1)',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.2rem',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(255, 182, 193, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'linear-gradient(135deg, #ff9db4, #ffb6c1)',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.2rem',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(255, 182, 193, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
            fontSize: '1.2rem',
            fontStyle: 'italic',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 1rem',
            marginTop: '1rem'
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
              gap: '0.8rem',
              margin: '1.5rem 0',
              flexWrap: 'wrap',
              padding: '0 1rem'
            }}
          >
            {imagesArray.slice(0, 6).map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: index === currentImageIndex ? '3px solid #ff9db4' : '3px solid transparent',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  WebkitTapHighlightColor: 'transparent',
                  padding: 0,
                  background: 'none',
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
              </motion.button>
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