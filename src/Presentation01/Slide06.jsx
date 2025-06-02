import React from 'react';
import { motion } from 'framer-motion';
import styles from './Presentation.module.css';

const Slide06 = ({ onNextSlide }) => {
  return (
    <div className={`${styles.slide} ${styles.firstSlide}`}>
      <div className={styles.slideContent}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={styles.slideTitle}
        >
          <h1>Para finalizar, gostaria de expressar o quanto eu te amo 💕</h1>
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

export default Slide06;