import React from 'react';
import { motion } from 'framer-motion';
import styles from './Presentation.module.css';
import { Heart, MessageCircle, Clock, Music, Camera, HeartPulse, Smile } from 'lucide-react';

const Slide03 = ({ userName, loveName, timeSince, onNextSlide }) => {
  const { days } = timeSince;

  // Cálculos das estatísticas
  const beijos = Math.round(days * 8);
  const abracoMinutos = days * 15;
  const abracoHoras = Math.round(abracoMinutos / 60);
  const mensagens = Math.round(days * 25);
  const teAmos = Math.round(days * 3);
  const risadas = Math.round(days * 12);
  const batimentosCardiacos = Math.round(days * 24 * 60 * 70);
  const batimentosFormatados = batimentosCardiacos.toLocaleString('pt-BR');
  const musicas = Math.round(days * 5);
  const fotos = Math.round(days * 0.8);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
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
          <h2>Nosso Amor em Números</h2>
        </motion.div>

        <motion.div
          className={styles.statsContainer}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.statItem} variants={itemVariants}>
            <div className={styles.statIcon}><Heart size={28} color="#d23669" /></div>
            <div className={styles.statContent}>
              <span className={`${styles.statValue} me-1`} style={{color: "#d23669"}}>{beijos}</span>
              <span className={styles.statLabel} style={{color: "#d23669"}}>Beijos Trocados</span>
            </div>
          </motion.div>

          <motion.div className={styles.statItem} variants={itemVariants}>
            <div className={styles.statIcon}><Clock size={28} color="#d23669" /></div>
            <div className={styles.statContent}>
              <span className={`${styles.statValue} me-1`} style={{color: "#d23669"}}>{abracoHoras}</span>
              <span className={styles.statLabel} style={{color: "#d23669"}}>Horas de Abraços</span>
            </div>
          </motion.div>

          <motion.div className={styles.statItem} variants={itemVariants}>
            <div className={styles.statIcon}><MessageCircle size={28} color="#d23669" /></div>
            <div className={styles.statContent}>
              <span className={`${styles.statValue} me-1`} style={{color: "#d23669"}}>{mensagens}</span>
              <span className={styles.statLabel} style={{color: "#d23669"}}>Mensagens Trocadas</span>
            </div>
          </motion.div>

          <motion.div className={styles.statItem} variants={itemVariants}>
            <div className={styles.statIcon}><Heart size={28} color="#d23669" /></div>
            <div className={styles.statContent}>
              <span className={`${styles.statValue} me-1`} style={{color: "#d23669"}}>{teAmos}</span>
              <span className={styles.statLabel} style={{color: "#d23669"}}>"Eu Te Amo" Ditos</span>
            </div>
          </motion.div>

          <motion.div className={styles.statItem} variants={itemVariants}>
            <div className={styles.statIcon}><Smile size={28} color="#d23669" /></div>
            <div className={styles.statContent}>
              <span className={`${styles.statValue} me-1`} style={{color: "#d23669"}}>{risadas}</span>
              <span className={styles.statLabel} style={{color: "#d23669"}}>Risadas Juntos</span>
            </div>
          </motion.div>

          <motion.div className={styles.statItem} variants={itemVariants}>
            <div className={styles.statIcon}><HeartPulse size={28} color="#d23669" /></div>
            <div className={styles.statContent}>
              <span className={`${styles.statValue} me-1`} style={{color: "#d23669"}}>{batimentosFormatados}</span>
              <span className={styles.statLabel} style={{color: "#d23669"}}>Batimentos Cardíacos</span>
            </div>
          </motion.div>

          <motion.div className={styles.statItem} variants={itemVariants}>
            <div className={styles.statIcon}><Music size={28} color="#d23669" /></div>
            <div className={styles.statContent}>
              <span className={`${styles.statValue} me-1`} style={{color: "#d23669"}}>{musicas}</span>
              <span className={styles.statLabel} style={{color: "#d23669"}}>Músicas Compartilhadas</span>
            </div>
          </motion.div>

          <motion.div className={styles.statItem} variants={itemVariants}>
            <div className={styles.statIcon}><Camera size={28} color="#d23669" /></div>
            <div className={styles.statContent}>
              <span className={`${styles.statValue} me-1`} style={{color: "#d23669"}}>{fotos}</span>
              <span className={styles.statLabel} style={{color: "#d23669"}}>Fotos Juntos</span>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.button
          className={styles.nextButton}
          onClick={onNextSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Próximo Slide <span>❤</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Slide03;