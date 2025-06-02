import React from "react";
import { motion } from "framer-motion";
import styles from "./Presentation.module.css";

const Slide08 = ({ onNextSlide, userName, loveName }) => {
  return (
    <div className={`${styles.slide} ${styles.firstSlide}`}>
      <div className={styles.slideContent}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`${styles.slideTitle} d-flex`}
        >
          <h1>Te amo</h1> <h1 className="ms-2" style={{ color: "#d23669" }}>{loveName}!</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`${styles.slideTitle} d-flex`}
        >
          <h1>do seu amor,</h1>
          <h1 className="ms-2" style={{ color: "#d23669" }}>{userName}</h1> <h1 className="pulse">💕</h1>
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
          Ver novamente <span>❤</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Slide08;
