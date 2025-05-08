import React from 'react';
import styles from './LandingPage.module.css';
import Button from '../components/Button';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <img src="/LOGO_01.png" alt="Logo" className={styles.logo}  />
          <p className={`${styles.subtitle} text-light`}>
            Crie uma apresentação romântica única para celebrar sua história de amor
          </p>
          <div className={styles.ctaButton}>
            <Link href="/newPresentation">
            <Button size='lg' fullWidth variant='primary' icon={<Heart size={20} />} iconPosition="right">Comece Agora</Button>
            </Link>
          </div>
        </div>
        <div className={`${styles.heroImage} my-5`}>
            <img 
              src="/IMAGE_01.png" 
              alt="Casal feliz" 
              style={{ maxHeight: '100%', maxWidth: '50%', transform: 'rotate(-10deg)' }}
              className={styles.coupleImage}
            />
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>Como Funciona</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepIcon}>1</div>
            <h3>Adicione Detalhes</h3>
            <p>Insira a data em que conheceu seu amor, seus nomes e até 4 fotos de momentos especiais.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepIcon}>2</div>
            <h3>Escreva Uma Carta</h3>
            <p>Expresse seus sentimentos com uma carta de amor personalizada.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepIcon}>3</div>
            <h3>Compartilhe</h3>
            <p>Gere um QR code único para compartilhar sua apresentação romântica.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>O Que Sua Apresentação Terá</h2>
        <div className={styles.featureGrid}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>❤️</div>
            <h3>Contador de Amor</h3>
            <p>Veja exatamente há quantos dias, horas e segundos vocês estão apaixonados.</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Estatísticas Românticas</h3>
            <p>Descubra estimativas de quantos beijos, abraços e batimentos cardíacos vocês compartilharam.</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🖼️</div>
            <h3>Galeria de Momentos</h3>
            <p>Exiba suas fotos favoritas em uma apresentação emocionante.</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>💌</div>
            <h3>Carta de Amor</h3>
            <p>Surpreenda com palavras que vêm do coração.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>O Que Nossos Usuários Dizem</h2>
        <div className={styles.testimonialCards}>
          <div className={styles.testimonialCard}>
            <p>"Minha namorada chorou de emoção quando viu nossa apresentação. Melhor presente que já dei!"</p>
            <div className={styles.testimonialAuthor}>— Bruno e Ana</div>
          </div>
          <div className={styles.testimonialCard}>
            <p>"Usamos para nosso aniversário de 5 anos. As estatísticas são tão criativas e divertidas!"</p>
            <div className={styles.testimonialAuthor}>— Carla e Pedro</div>
          </div>
          <div className={styles.testimonialCard}>
            <p>"Simples de criar e o resultado final ficou incrível. Recomendo para qualquer casal!"</p>
            <div className={styles.testimonialAuthor}>— Júlia e Marcos</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Pronto Para Surpreender Seu Amor?</h2>
          <p>Crie sua apresentação romântica em minutos e eternize seu amor.</p>
          <Button>Criar Minha Apresentação</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Eternize o Seu Amor. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;