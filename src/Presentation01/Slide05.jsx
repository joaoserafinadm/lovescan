import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Presentation.module.css';
import InstagramEffect from "@/src/PresentationConfig1/InstagramEffect";


const Slide05 = ({ onNextSlide, imagesArray }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagesArray.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imagesArray.length) % imagesArray.length);
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
            //   style={{
            //     position: 'relative',
            //     borderRadius: '15px',
            //     overflow: 'hidden',
            //     aspectRatio: '16/10'
            //   }}
            >
                      <InstagramEffect imageUrl={imagesArray[currentImageIndex]?.image?.url} />

              {/* <img 
                src={imagesArray[currentImageIndex]?.image?.url} 
                alt={imagesArray[currentImageIndex]?.description || "Momento especial"}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              /> */}
            </motion.div>
          </AnimatePresence>

          {/* Botões de navegação */}
          {imagesArray.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                style={{
                  position: 'absolute',
                  left: '-50px',
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
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-50%) scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(-50%) scale(1)'}
              >
                ❮
              </button>
              <button 
                onClick={nextImage}
                style={{
                  position: 'absolute',
                  right: '-50px',
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
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-50%) scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(-50%) scale(1)'}
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
            marginRight: 'auto'
          }}
        >
          <p>{imagesArray[currentImageIndex]?.description || "Um momento inesquecível"}</p>
        </motion.div>

        {/* Indicadores */}
        {/* {imagesArray.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              margin: '2rem 0'
            }}
          >
            {imagesArray.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  opacity: index === currentImageIndex ? 1 : 0.5,
                  transform: index === currentImageIndex ? 'scale(1.3)' : 'scale(1)',
                  fontSize: '1.2rem'
                }}
              >
                💕
              </button>
            ))}
          </motion.div>
        )} */}

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
              flexWrap: 'wrap'
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
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                <img 
                  src={image?.image?.url} 
                  alt={image.description || `Foto ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
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