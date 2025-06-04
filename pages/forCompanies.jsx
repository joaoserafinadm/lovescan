import React from "react";
import styles from "@/src/forCompanies/ForCompanies.module.css";
import Button from "@/src/components/Button";
import {
  Heart,
  Bell,
  BarChart3,
  QrCode,
  Users,
  TrendingUp,
  TriangleAlert,
  Star,
} from "lucide-react";
import Link from "next/link";
import CompanyRegister from "@/src/forCompanies/companyRegister";

const forCompanies = () => {
  return (
    <div className={`fadeItem ${styles.container}`}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="col-12 col-lg-6 d-flex justify-content-start justify-content-lg-center">
          <div className={`${styles.heroContent}`}>
            <img src="/LOGO_01.png" alt="Logo" className={styles.logo} />
            <h1 className="text-c-primary fw-bold mb-3">Para Empresas</h1>
            <p className={`${styles.subtitle} text-light`}>
              <b>Ofereça uma experiência completa para seus clientes!</b>{" "}
              Adicione em seu produto uma apresentação romântica personalizada
              via QR Code e ofereça muito mais que um simples presente.
            </p>

            {/* <div className="mt-3">
              <Button size="lg" fullWidth variant="primary">
                Ver Demonstração
              </Button>
            </div> */}
          </div>
        </div>

        <div className={`col-12 col-lg-6 ${styles.heroImage} mb-3`}>
          <img
            src="/IMAGE_04.png"
            alt="Produto com QR Code"
            style={{
              maxHeight: "100%",
              maxWidth: "80%",
              transform: "rotate(5deg)",
              borderRadius: "10px",
            }}
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
            <h3 className="text-white">Configure sua Conta</h3>
            <p className="text-white">
              Cadastre sua empresa e escolha o plano ideal para seu volume de
              vendas
            </p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepIcon}>2</div>
            <h3 className="text-white">Envie o Formulário</h3>
            <p className="text-white">
              Compartilhe um link personalizado com seus clientes para criarem
              suas apresentações
            </p>
          </div>
        </div>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepIcon}>3</div>
            <h3 className="text-white">Receba a Notificação</h3>
            <p className="text-white">
              Assim que o cliente finalizar, você recebe o QR Code pronto para
              impressão
            </p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepIcon}>4</div>
            <h3 className="text-white">Anexe ao Produto</h3>
            <p className="text-white">
              Imprima e cole o QR Code no produto, transformando-o em uma
              experiência única
            </p>
          </div>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <Star />
              </div>
              <h3 className="text-white">Créditos</h3>
              <p className="text-white">
                Cada apresentação criada custará um crédito. Confira nossos planos de créditos e escolha o que mais se encaixa em sua empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`d-flex justify-content-center `}
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <div className="pages">
          <div className="card border-secondary bg-dark m-2 ">
            <div className="card-body">
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  <h2 className={styles.sectionTitle}>Cadastre sua empresa</h2>
                </div>
                <CompanyRegister />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Segments Section */}
      <section className={styles.hero}>
        <div
          className={`col-12 col-lg-6 ${styles.heroImage} justify-content-center justify-content-lg-end my-5`}
        >
          <img
            src="/IMAGE_04.png"
            alt="Produtos com QR Code"
            style={{
              maxHeight: "100%",
              maxWidth: "90%",
            }}
            className={`${styles.coupleImage} rounded`}
          />
        </div>

        <div className="col-12 col-lg-6 d-flex justify-content-start justify-content-lg-center">
          <div className={`${styles.heroContent}`}>
            <h2 className="text-c-primary fw-bold">Segmentos Ideais</h2>
            <p className={`${styles.subtitle} text-light mb-4`}>
              Para quem é perfeito o Love Scan?
            </p>
            <div className="text-light">
              <p className="mb-2">
                🌸 <strong>Floriculturas:</strong> Transforme buquês em
                declarações eternas
              </p>
              <p className="mb-2">
                🎁 <strong>Lojas de Presentes:</strong> Adicione emoção a
                qualquer item
              </p>
              <p className="mb-2">
                📸 <strong>Fotógrafos:</strong> Complemente álbuns com vídeos
                românticos
              </p>
              <p className="mb-2">
                🍰 <strong>Confeitarias:</strong> Torne bolos e doces ainda mais
                especiais
              </p>
              <p className="mb-2">
                💍 <strong>Joalherias:</strong> Acompanhe anéis com pedidos
                emocionantes
              </p>
              <p className="mb-2">
                📝 <strong>Papelarias:</strong> Ofereça cartões que ganham vida
              </p>
              <p className="mb-2">
                🎨 <strong>Artesanatos:</strong> Personalize ainda mais suas
                criações
              </p>
              <p className="mb-2">
                🛒 <strong>E-commerce:</strong> Diferencie-se da concorrência
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.features}>
        <h2 className={`${styles.sectionTitle} text-c-primary`}>
          Vantagens Competitivas
        </h2>
        <div className={styles.featureGrid}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>💰</div>
            <h3>Aumento de Valor</h3>
            <p>Clientes pagam até 30% mais por experiências personalizadas</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>❤️</div>
            <h3>Fidelização</h3>
            <p>87% dos usuários recomendam a loja após usar o Love Scan</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>📣</div>
            <h3>Marketing Viral</h3>
            <p>Se diferencie da concorrência e viralize!</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🚀</div>
            <h3>ROI Comprovado</h3>
            <p>Investimento que se paga desde a primeira venda</p>
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Pronto para revolucionar seu negócio?</h2>
          <p>
            Junte-se a centenas de empresas que já transformam produtos em
            experiências inesquecíveis
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link href="/credits">
            <Button size="lg">Conheça nossos planos</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="mb-3">
          <p className="mb-1">
            <strong>Garantias:</strong>
          </p>
          <p>
            ✓ Suporte em português | ✓ Uptime
            de 99,9% | ✓ Dados seguros
          </p>
        </div>
        <div className="mb-3">
          <p className="mb-1">
            <strong>Contato:</strong>
          </p>
          <p>
            Email: contato.lovescan@gmail.com.br 
          </p>
        </div>
        <p>
          © {new Date().getFullYear()} Love Scan. Todos os
          direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default forCompanies;
