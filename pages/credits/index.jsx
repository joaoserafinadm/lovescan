import { useState } from 'react';
import Button from '@/src/components/Button';
import Image from 'next/image';
import { Heart, ShoppingBag, ShoppingBasket, ShoppingCart } from 'lucide-react';
import scrollTo from '@/utils/scrollTo';

const dolar = 5.85;

export const PRODUCTS = [
    {
        id: 'credit-1',
        title: '1 Crédito',
        description: 'Ideal para criar uma mensagem especial para aquela pessoa que você ama',
        price: 5 * dolar,
        credits: 1,
        recommended: false,
        userType: 'individual'
    },
    {
        id: 'credit-10',
        title: '10 Créditos',
        description: 'Perfeito para floricultura, presentes personalizados ou pequenas celebrações',
        price: 40 * dolar,
        credits: 10,
        recommended: true,
        userType: 'business'
    },
    {
        id: 'credit-20',
        title: '20 Créditos',
        description: 'Ideal para lojas, joalherias ou eventos de médio porte',
        price: 70 * dolar,
        credits: 20,
        recommended: false,
        userType: 'business'
    },
    {
        id: 'credit-50',
        title: '50 Créditos',
        description: 'Para empresas com alto volume de vendas ou grandes eventos',
        price: 150 * dolar,
        credits: 50,
        recommended: false,
        userType: 'business'
    }
];

export default function Credits() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('all');

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
    };

    const handlePurchase = () => {
        if (!selectedProduct) return;
        // Lógica de pagamento
        console.log(`Iniciando compra de ${selectedProduct.credits} créditos por R$ ${selectedProduct.price.toFixed(2)}`);
    };

    const filteredProducts = PRODUCTS.filter(product =>
        activeTab === 'all' || product.userType === activeTab
    );

    return (
        <div className="container fadeItem py-5" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="text-center mb-5">
                        <img src="/LOGO_01.png" alt="" style={{maxWidth: '370px', maxHeight: '100px'}} />
                        <p className="lead" style={{ color: '#f8f9fa' }}>
                            Crie experiências inesquecíveis!
                        </p>
                    </div>

                    <div className="row mb-5">
                        <div className="col-md-6">
                            <div className="card bg-dark border-0 h-100 shadow">
                                <div className="card-body p-4">
                                    <h3 className="mb-3" style={{ color: '#ff2056' }}>Como funciona</h3>
                                    <div className="d-flex mb-3">
                                        <div className="me-3">
                                            <div style={{ backgroundColor: '#ff2056', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</div>
                                        </div>
                                        <div>
                                            <h5 className="text-light">Compre créditos</h5>
                                            <p className="text-secondary">Escolha o pacote ideal para suas necessidades</p>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <div className="me-3">
                                            <div style={{ backgroundColor: '#ff2056', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</div>
                                        </div>
                                        <div>
                                            <h5 className="text-light">Crie sua mensagem</h5>
                                            <p className="text-secondary">Personalize uma apresentação romântica única</p>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="me-3">
                                            <div style={{ backgroundColor: '#ff2056', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</div>
                                        </div>
                                        <div>
                                            <h5 className="text-light">Compartilhe o QR Code</h5>
                                            <p className="text-secondary">Surpreenda com uma experiência digital inesquecível</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card bg-dark border-0 h-100 shadow">
                                <div className="card-body p-4">
                                    <h3 className="mb-3" style={{ color: '#ff2056' }}>Uso empresarial</h3>
                                    <p className="text-light">Surpreenda seus clientes com uma experiência digital única e memorável!</p>
                                    <div className="mt-3">
                                        <div className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-2" style={{ color: '#ff2056' }}></i>
                                            <p className="mb-0 text-light"><strong>Floriculturas:</strong> <span className="text-secondary">Anexe aos buquês de flores</span></p>
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-2" style={{ color: '#ff2056' }}></i>
                                            <p className="mb-0 text-light"><strong>Joalherias:</strong> <span className="text-secondary">Complemente presentes especiais</span></p>
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-2" style={{ color: '#ff2056' }}></i>
                                            <p className="mb-0 text-light"><strong>Presentes:</strong> <span className="text-secondary">Grave em copos térmicos ou itens personalizados</span></p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <i className="fas fa-check me-2" style={{ color: '#ff2056' }}></i>
                                            <p className="mb-0 text-light"><strong>Eventos:</strong> <span className="text-secondary">Casamentos, aniversários, comemorações</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 bg-dark shadow mb-5">
                        <div className="card-body p-4">
                            {/* <ul className="nav nav-pills mb-4 justify-content-center" style={{ gap: '10px' }}>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'individual' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('individual')}
                    style={{ 
                      backgroundColor: activeTab === 'individual' ? '#ff2056' : 'transparent',
                      color: activeTab === 'individual' ? 'white' : '#ff2056',
                      border: `1px solid #ff2056`
                    }}
                  >
                    <i className="fas fa-user me-2"></i>
                    Uso pessoal
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'business' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('business')}
                    style={{ 
                      backgroundColor: activeTab === 'business' ? '#ff2056' : 'transparent',
                      color: activeTab === 'business' ? 'white' : '#ff2056',
                      border: `1px solid #ff2056`
                    }}
                  >
                    <i className="fas fa-building me-2"></i>
                    Empresas
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'all' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('all')}
                    style={{ 
                      backgroundColor: activeTab === 'all' ? '#ff2056' : 'transparent',
                      color: activeTab === 'all' ? 'white' : '#ff2056',
                      border: `1px solid #ff2056`
                    }}
                  >
                    <i className="fas fa-th-large me-2"></i>
                    Todos os pacotes
                  </button>
                </li>
              </ul> */}

                            <div className="row">
                                {filteredProducts.map((product, index) => (
                                    <div key={product.id} className="col-md-6 col-lg-3 mb-4">
                                        <div
                                            className={`card h-100 position-relative ${selectedProduct?.id === product.id ? 'border-2' : 'border-0'}`}
                                            style={{
                                                backgroundColor: '#242424',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                borderColor: selectedProduct?.id === product.id ? '#ff2056' : 'transparent',
                                                transform: selectedProduct?.id === product.id ? 'translateY(-5px)' : 'none',
                                                boxShadow: selectedProduct?.id === product.id ? '0 10px 20px rgba(255, 32, 86, 0.2)' : '0 5px 15px rgba(0,0,0,0.1)'
                                            }}
                                            onClick={() => {handleSelectProduct(product); scrollTo('payment');}}
                                        >
                                            {product.recommended && (
                                                <div
                                                    className="position-absolute"
                                                    style={{
                                                        top: '-12px',
                                                        right: '10px',
                                                        backgroundColor: '#ff2056',
                                                        color: 'white',
                                                        padding: '5px 10px',
                                                        borderRadius: '20px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    Mais popular
                                                </div>
                                            )}
                                            <div className="card-body d-flex flex-column p-4">
                                                <div className="text-center mb-3">
                                                    <div
                                                        style={{
                                                            backgroundColor: 'rgba(255, 32, 86, 0.1)',
                                                            width: '70px',
                                                            height: '70px',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: '50%',
                                                            margin: '0 auto'
                                                        }}
                                                    >
                                                        {index === 0 ? (
                                                            <Heart className="fas fa-user fa-2x" style={{ color: '#ff2056' }} />
                                                        ) : index === 1 ? (
                                                            <ShoppingBag className="fas fa-user fa-2x" style={{ color: '#ff2056' }} />
                                                        ) : index === 2 ?
                                                            <ShoppingBasket className="fas fa-user fa-2x" style={{ color: '#ff2056' }} />
                                                            :
                                                            <ShoppingCart className="fas fa-user fa-2x" style={{ color: '#ff2056' }} />

                                                        }
                                                    </div>
                                                </div>
                                                <h4 className="card-title text-center text-light mb-2">{product.title}</h4>
                                                <p className="text-secondary text-center mb-3">
                                                    {product.description}
                                                </p>
                                                <div className="text-center mt-auto">
                                                    <h3 className="text-light mb-3">
                                                        R$ {product.price.toFixed(2)}
                                                    </h3>
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                                            marginBottom: '15px'
                                                        }}
                                                    ></div>
                                                    <button
                                                        className={`btn ${selectedProduct?.id === product.id ? 'btn-light text-danger' : 'btn-outline-light'}`}
                                                        style={{
                                                            borderRadius: '30px',
                                                            padding: '8px 20px',
                                                            fontWeight: 'bold',
                                                            borderColor: selectedProduct?.id === product.id ? 'white' : 'rgba(255, 255, 255, 0.5)'
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleSelectProduct(product);
                                                        }}
                                                    >
                                                        {selectedProduct?.id === product.id ? 'Selecionado' : 'Selecionar'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {selectedProduct && (
                        <div className="card border-0 bg-dark shadow mb-4" id="payment">
                            <div className="card-body p-4">
                                <h3 className="card-title mb-4" style={{ color: '#ff2056' }}>Resumo da compra</h3>

                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="d-flex justify-content-between mb-3">
                                            <span className="text-light">Pacote selecionado:</span>
                                            <span className="text-light fw-bold">{selectedProduct.title}</span>
                                        </div>

                                        <div className="d-flex justify-content-between mb-3">
                                            <span className="text-light">Quantidade de créditos:</span>
                                            <span className="text-light fw-bold">{selectedProduct.credits}</span>
                                        </div>

                                        <div
                                            style={{
                                                width: '100%',
                                                border: '1px dashed rgba(255, 255, 255, 0.1)',
                                                marginBottom: '15px',
                                                marginTop: '15px'
                                            }}
                                        ></div>

                                        <div className="d-flex justify-content-between mb-3">
                                            <span className="text-light fs-5">Valor total:</span>
                                            <span className="fs-5 fw-bold" style={{ color: '#ff2056' }}>
                                                R$ {selectedProduct.price.toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="mt-4 mb-3">
                                            <Button
                                                onClick={handlePurchase}
                                                variant='primary'
                                                fullWidth
                                                size='lg'
                                            >
                                                <i className="fas fa-lock me-2"></i> Finalizar Compra Segura
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="card bg-black border-0 h-100">
                                            <div className="card-body p-4">
                                                <h5 className="text-center mb-3" style={{ color: '#ff2056' }}>O que você pode fazer</h5>

                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="me-3" style={{ color: '#ff2056' }}>
                                                        <i className="fas fa-check-circle"></i>
                                                    </div>
                                                    <p className="mb-0 text-light">Criar uma apresentação romântica personalizada</p>
                                                </div>

                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="me-3" style={{ color: '#ff2056' }}>
                                                        <i className="fas fa-check-circle"></i>
                                                    </div>
                                                    <p className="mb-0 text-light">Gerar um QR code único para acessar</p>
                                                </div>

                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="me-3" style={{ color: '#ff2056' }}>
                                                        <i className="fas fa-check-circle"></i>
                                                    </div>
                                                    <p className="mb-0 text-light">Transmitir seus sentimentos de forma digital</p>
                                                </div>

                                                {selectedProduct.credits > 1 && (
                                                    <div className="mt-4 p-3" style={{ backgroundColor: 'rgba(255, 32, 86, 0.1)', borderRadius: '10px' }}>
                                                        <p className="mb-0 text-center" style={{ color: '#ff2056', fontSize: '0.9rem' }}>
                                                            <i className="fas fa-info-circle me-2"></i>
                                                            Ideal para empresas que desejam oferecer uma experiência única aos seus clientes!
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="text-center mb-4">
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '20px',
                            flexWrap: 'wrap'
                        }}>
                            <span className="text-light d-flex align-items-center">
                                <i className="fas fa-lock me-2" style={{ color: '#ff2056' }}></i>
                                Pagamento seguro
                            </span>
                            <span className="text-light d-flex align-items-center">
                                <i className="fas fa-redo me-2" style={{ color: '#ff2056' }}></i>
                                Ativação instantânea
                            </span>
                            <span className="text-light d-flex align-items-center">
                                <i className="fas fa-headset me-2" style={{ color: '#ff2056' }}></i>
                                Suporte dedicado
                            </span>
                        </div>
                    </div>

                    <div className="text-center text-secondary">
                        <p>
                            <small>Ao finalizar a compra, você concorda com nossos termos e condições.</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}