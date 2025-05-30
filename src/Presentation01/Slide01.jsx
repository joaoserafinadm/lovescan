import React from 'react';
import { motion } from 'framer-motion';
import styles from './Presentation.module.css';

const Slide01 = ({ loveName, couplePhoto, onNextSlide }) => {
  return (
    <div className={`${styles.slide} ${styles.firstSlide}`}>
      <div className={styles.slideContent}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={styles.slideTitle}
        >
          <h1>Para o meu amor,</h1>
          <h2 className={styles.loveName}>{loveName}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className={styles.photoContainer}
        >
          {couplePhoto ? (
            <img 
              src={couplePhoto.url} 
              alt={`Foto com o(a) ${loveName}`} 
              className={styles.couplePhoto}
              loading="eager"
            />
          ) : (
            <div className={styles.photoPlaceholder}>
              <span>Foto do casal</span>
            </div>
          )}
        </motion.div>
        
        <motion.button
          className={styles.nextButton}
          onClick={onNextSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continuar <span>❤</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Slide01;