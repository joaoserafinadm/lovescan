import React, { useState, useEffect, useRef } from 'react';
import styles from './Presentation.module.css';

const PresentationPreview = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);
  const [isStarted, setIsStarted] = useState(false); // Estado para controlar se a apresentação foi iniciada
  const [isFinished, setIsFinished] = useState(false); // Estado para controlar se a apresentação terminou
  const progressInterval = useRef(null);
  const slideTimerRef = useRef(null); // Referência para o timer de avanço de slide
  const storyDuration = 15000; // 5 segundos para cada slide
  const progressUpdateInterval = 10; // Atualizar a cada 10ms

  // Função para avançar para o próximo slide com segurança
  const advanceToNextSlide = () => {
    if (currentIndex === slides.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setStoryProgress(0); // Reseta o progresso para o novo slide
    }
  };

  useEffect(() => {
    // Limpa todos os intervalos e temporizadores quando os estados mudam
    clearInterval(progressInterval.current);
    clearTimeout(slideTimerRef.current);
    
    if (!isPaused && isStarted && !isFinished && slides.length > 0) {
      // Configura um novo temporizador para avançar o slide após a duração completa
      slideTimerRef.current = setTimeout(() => {
        advanceToNextSlide();
      }, storyDuration);
      
      // Configura o intervalo para atualizar o progresso visível
      progressInterval.current = setInterval(() => {
        setStoryProgress(prev => {
          const newProgress = prev + (progressUpdateInterval / storyDuration) * 100;
          return newProgress <= 100 ? newProgress : 100;
        });
      }, progressUpdateInterval);
    }
    
    return () => {
      clearInterval(progressInterval.current);
      clearTimeout(slideTimerRef.current);
    };
  }, [currentIndex, isPaused, isStarted, isFinished, slides.length]);

  const handlePrevious = () => {
    clearTimeout(slideTimerRef.current);
    clearInterval(progressInterval.current);
    setStoryProgress(0);
    setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    clearTimeout(slideTimerRef.current);
    clearInterval(progressInterval.current);
    setStoryProgress(0);
    setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
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

  // Função para iniciar a apresentação
  const startPresentation = () => {
    setIsStarted(true);
    setIsFinished(false);
    setCurrentIndex(0);
    setStoryProgress(0);
  };

  // Função para resetar a apresentação
  const resetPresentation = () => {
    clearTimeout(slideTimerRef.current);
    clearInterval(progressInterval.current);
    setIsStarted(false);
    setIsFinished(false);
    setCurrentIndex(0);
    setStoryProgress(0);
  };

  // Função para mudar para um slide específico
  const goToSlide = (index) => {
    clearTimeout(slideTimerRef.current);
    clearInterval(progressInterval.current);
    setStoryProgress(0);
    setCurrentIndex(index);
  };

  if (slides.length === 0) {
    return <div>Nenhum slide disponível</div>;
  }

  // Se a apresentação ainda não foi iniciada, mostrar a tela de início com o botão de play
  if (!isStarted) {
    return (
      <div className={styles.storiesContainer}>
        <div className={`${styles.slide} ${styles.startScreen}`} style={{ backgroundColor: '#282c34' }}>
          <h2 className={styles.slideTitle}>Apresentação</h2>
          <p className={styles.slideText}>Clique no botão abaixo para iniciar</p>
          <button 
            className={styles.playButton} 
            onClick={startPresentation}
          >
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="white"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
  
  // Se a apresentação terminou, mostrar a tela final com opção de assistir novamente
  if (isFinished) {
    return (
      <div className={styles.storiesContainer}>
        <div className={`${styles.slide} ${styles.endScreen}`} style={{ backgroundColor: '#2E7D32' }}>
          <h2 className={styles.slideTitle}>Apresentação concluída</h2>
          <p className={styles.slideText}>Obrigado por assistir!</p>
          <button 
            className={styles.playAgainButton} 
            onClick={startPresentation}
          >
            Assistir novamente
          </button>
        </div>
      </div>
    );
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

      {/* Botão para reiniciar a apresentação */}
      {/* <button 
        className={styles.resetButton}
        onClick={resetPresentation}
        title="Reiniciar apresentação"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="white"
        >
          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
        </svg>
      </button> */}
    </div>
  );
};

export default PresentationPreview;