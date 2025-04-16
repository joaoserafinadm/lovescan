import React, { useState, useEffect, useRef } from 'react';
import styles from './Presentation.module.css';

const PresentationPreview = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);
  const progressInterval = useRef(null);
  const storyDuration = 5000; // 5 segundos para cada slide
  const progressUpdateInterval = 10; // Atualizar a cada 10ms

  useEffect(() => {
    if (!isPaused && slides.length > 0) {
      // Inicia ou reinicia o intervalo
      clearInterval(progressInterval.current);
      setStoryProgress(0);
      
      progressInterval.current = setInterval(() => {
        setStoryProgress((prev) => {
          const newProgress = prev + (progressUpdateInterval / storyDuration) * 100;
          
          // Se completou o progresso, avança para o próximo slide
          if (newProgress >= 100) {
            clearInterval(progressInterval.current);
            handleNext();
            return 0;
          }
          
          return newProgress;
        });
      }, progressUpdateInterval);
    }
    
    return () => {
      clearInterval(progressInterval.current);
    };
  }, [currentIndex, isPaused, slides.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleMouseDown = () => {
    setIsPaused(true);
  };

  const handleMouseUp = () => {
    setIsPaused(false);
  };

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  // Função para mudar para um slide específico
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (slides.length === 0) {
    return <div>Nenhum slide disponível</div>;
  }

  return (
    <div className={styles.storiesContainer}>
      {/* Barra de progresso para cada slide */}
      <div className={styles.progressContainer}>
        {slides.map((_, index) => (
          <div 
            key={index} 
            className={`${styles.progressBar} ${index === currentIndex ? styles.active : index < currentIndex ? styles.completed : ''}`}
            onClick={() => goToSlide(index)}
          >
            {index === currentIndex && (
              <div 
                className={styles.progressIndicator} 
                style={{ width: `${storyProgress}%` }} 
              />
            )}
          </div>
        ))}
      </div>

      {/* Conteúdo do slide atual */}
      <div 
        className={styles.storyContent}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Áreas para navegação */}
        <div className={styles.navigationArea}>
          <div className={styles.prevArea} onClick={handlePrevious}></div>
          <div className={styles.nextArea} onClick={handleNext}></div>
        </div>
        
        {/* O componente do slide atual */}
        {slides[currentIndex]}
      </div>
    </div>
  );
};

export default PresentationPreview;