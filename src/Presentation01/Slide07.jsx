import React from 'react';
import { motion } from 'framer-motion';
import styles from './Presentation.module.css';

const Slide07 = ({ onNextSlide, letterContent }) => {
  return (
    <div className={`${styles.slide} ${styles.firstSlide}`}>
      <div className={styles.slideContent}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={styles.slideTitle}
        >
          <h1>Minha carta de amor para você 💌</h1>
        </motion.div>

        {letterContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="col-12 mb-4"
            style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <div 
              className="p-0 p-md-4 mx-auto" 
              style={{
                width: "100%",
                maxWidth: "600px",
                minHeight: "300px",
                background: "#f8f5e6",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                borderRadius: "2px",
                position: "relative",
                fontFamily: "'Indie Flower', cursive",
                fontSize: "1.4rem",
                lineHeight: "1.5",
                backgroundImage: "linear-gradient(#f8f5e6 0px, #f8f5e6 30px, #ccc 30px, #ccc 31px, #f8f5e6 31px)",
                backgroundSize: "100% 32px",
                paddingTop: "31px"
              }}
            >
              <motion.div 
                style={{ marginTop: 0, color: "#444444" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.3 }}
              >
                {letterContent.split('\n').map((text, index) => (
                  <motion.p 
                    key={index} 
                    style={{ marginBottom: "8px" }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.5 + (index * 0.1) 
                    }}
                  >
                    {text}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
        
        <motion.button
          className={styles.nextButton}
          onClick={onNextSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continuar <span>💕</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Slide07;