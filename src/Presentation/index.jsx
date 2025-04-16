import React from 'react';
import PresentationPreview from './PresentationPreview';
import styles from './Presentation.module.css';

// Componentes dos slides
const Slide1 = () => (
  <div className={styles.slide} style={{ backgroundColor: '#FF6A00' }}>
    <h2 className={styles.slideTitle}>Bem-vindo à apresentação</h2>
    <p className={styles.slideText}>Deslize para conhecer nosso produto</p>
  </div>
);

const Slide2 = () => (
  <div className={styles.slide} style={{ backgroundColor: '#4C9AFF' }}>
    <h2 className={styles.slideTitle}>Características principais</h2>
    <ul style={{ textAlign: 'left' }}>
      <li>Design moderno e intuitivo</li>
      <li>Alto desempenho</li>
      <li>Personalizável para suas necessidades</li>
    </ul>
    <button className={styles.slideButton}>Saiba mais</button>
  </div>
);

const Slide3 = () => (
  <div 
    className={styles.slide} 
    style={{ 
      backgroundImage: 'url(/images/background.jpg)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center' 
    }}
  >
    <div className={styles.contentBox}>
      <h2 className={styles.slideTitle}>Planos e preços</h2>
      <p className={styles.slideText}>Ofertas especiais disponíveis agora!</p>
    </div>
  </div>
);

const ProductSlide = () => (
  <div 
    className={styles.slide} 
    style={{ 
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(/images/product.jpg)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center' 
    }}
  >
    <div className={styles.productInfo}>
      <h2 className={styles.productTitle}>Produto Premium</h2>
      <p>A solução completa para suas necessidades</p>
      <div className={styles.price}>R$ 299,90</div>
      <button className={styles.buyButton}>Comprar agora</button>
    </div>
  </div>
);

const FinalSlide = () => (
  <div className={styles.slide} style={{ backgroundColor: '#2E7D32' }}>
    <h2 className={styles.slideTitle}>Entre em contato</h2>
    <p className={styles.slideText}>Estamos prontos para ajudar</p>
    <div style={{ marginTop: '20px' }}>
      <p>contato@empresa.com</p>
      <p>(11) 9999-9999</p>
    </div>
  </div>
);

const PresentationExample = () => {
  // Array com os componentes de cada slide
  const presentationSlides = [
    <Slide1 key="slide1" />,
    <Slide2 key="slide2" />,
    <Slide3 key="slide3" />,
    <ProductSlide key="slide4" />,
    <FinalSlide key="slide5" />
  ];

  return (
    <div className="container">
      <PresentationPreview slides={presentationSlides} />
      
      <style jsx>{`
        .container {
          padding: 0px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        h1 {
          text-align: center;
          margin-bottom: 30px;
        }
      `}</style>
    </div>
  );
};

export default PresentationExample;