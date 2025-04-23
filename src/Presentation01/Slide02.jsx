import React from 'react';
import { motion } from 'framer-motion';
import styles from './Presentation.module.css';
import { Heart } from 'lucide-react';

const Slide02 = ({ userName, loveName, timeSince, onNextSlide }) => {
  const { days, hours, minutes, seconds } = timeSince;

  const timeBoxVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2 + 0.5, duration: 0.6 }
    })
  };

  return (
    <div className={styles.slide}>
      <div className={styles.slideContent}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.slideTitle}
        >
          <h2>
            <span className={styles.highlightedText}>{userName}</span> está apaixonado(a) por{' '}
            <span className={styles.highlightedText}>{loveName}</span> há:
          </h2>
        </motion.div>

        <div className={styles.timeCounterContainer}>
          <motion.div
            className={styles.timeCounter}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className={styles.timeBox}
              variants={timeBoxVariants}
              custom={0}
            >
              <span className={styles.timeValue}>{days}</span>
              <span className={styles.timeLabel}>Dias</span>
            </motion.div>

            <motion.div
              className={styles.timeBox}
              variants={timeBoxVariants}
              custom={1}
            >
              <span className={styles.timeValue}>{hours}</span>
              <span className={styles.timeLabel}>Horas</span>
            </motion.div>

            <motion.div
              className={styles.timeBox}
              variants={timeBoxVariants}
              custom={2}
            >
              <span className={styles.timeValue}>{minutes}</span>
              <span className={styles.timeLabel}>Minutos</span>
            </motion.div>

            <motion.div
              className={styles.timeBox}
              variants={timeBoxVariants}
              custom={3}
            >
              <span className={styles.timeValue}>{seconds}</span>
              <span className={styles.timeLabel}>Segundos</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.5,
              type: "spring",
              stiffness: 200
            }}
            className={styles.heartIcon}
          >
            <Heart size={48} fill="#d23669" color="#d23669" />
          </motion.div>
        </div>
        
        <motion.button
          className={styles.nextButton}
          onClick={onNextSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Próximo Slide <span>❤</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Slide02;