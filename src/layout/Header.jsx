// Header.js
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, LogIn, User, Settings, LogOut } from 'lucide-react';
import styles from './Header.module.css';
import LoginModal from './login/LoginModal';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/router';

const Header = ({  }) => {

  const { user, logout } = useAuth(); // Assumindo que existe uma função logout no contexto

  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto
    setUserDropdownOpen(false);
    router.reload();
  };

  // Fecha o dropdown quando clica fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <LoginModal />
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Mobile Menu Toggle (esquerda em mobile) */}
          <div className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} color="#ffffff" /> : <Menu size={24} color="#ffffff" />}
          </div>

          {/* Logo/Nome do App (centralizado em mobile) */}
          <div className={styles.logo}>
            <Link href="/">
              <img src="/LOGO_01.png" alt="" height={40} />
            </Link>
          </div>

          {/* Navegação Desktop */}
          <nav className={styles.desktopNav}>
            <ul className={styles.navList}>
              {/* <li className={styles.navItem}>
                <Link href="/" className={styles.navLink}>Início</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/templates/buttons" className={styles.navLink}>Botão</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/templates/inputs" className={styles.navLink}>Input</Link>
              </li> */}
            </ul>
          </nav>

          {/* CTA/Avatar (direita) */}
          <div className={styles.cta}>
            {user ? (
              <div className={styles.userAvatarWrapper} ref={dropdownRef}>
                <div className={styles.userAvatar} onClick={toggleUserDropdown}>
                  <img
                    src={user?.profileImageUrl || "/USER.png"}
                    alt={user?.name || "Usuário"}
                    className={styles.avatarImage}
                  />
                  <ChevronDown 
                    size={16} 
                    className={`${styles.dropdownArrow} ${userDropdownOpen ? styles.rotated : ''}`}
                  />
                </div>
                
                {/* Dropdown do usuário */}
                {userDropdownOpen && (
                  <div className={styles.userDropdown}>
                    <div className={styles.userInfo}>
                      <img
                        src={user?.profileImageUrl || "/USER.png"}
                        alt={user?.userName || "Usuário"}
                        className={styles.dropdownAvatar}
                      />
                      <div className={styles.userDetails}>
                        <span className={styles.userName}>{user?.userName || "Usuário"}</span>
                        <span className={`${styles.userEmail}`}>{user?.email}</span>
                      </div>
                    </div>
                    
                    {/* <div className={styles.dropdownDivider}></div>
                    
                    <Link href="/profile" className={styles.dropdownItem} onClick={() => setUserDropdownOpen(false)}>
                      <User size={16} />
                      <span>Meu Perfil</span>
                    </Link>
                    
                    <Link href="/settings" className={styles.dropdownItem} onClick={() => setUserDropdownOpen(false)}>
                      <Settings size={16} />
                      <span>Configurações</span>
                    </Link> */}
                    
                    <div className={styles.dropdownDivider}></div>
                    
                    <button className={styles.dropdownItem} onClick={handleLogout}>
                      <LogOut size={16} />
                      <span>Sair</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.ctaWrapper}>
                {/* Botão de Login para Desktop */}
                <button className={styles.ctaButton} data-bs-toggle="modal" data-bs-target="#loginModal">Entrar</button>

                {/* Botão de Login para Mobile */}
                <div data-bs-toggle="modal" data-bs-target="#loginModal" className={styles.loginButton}>
                  <LogIn size={20} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Menu Mobile - Tela cheia, vindo da esquerda */}
        <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
          <div className={styles.mobileMenuHeader}>
            <img src="/LOGO_01.png" alt="" height={40} />
            <button className={styles.mobileMenuClose} onClick={toggleMobileMenu}>
              <X size={24} color="#ffffff" />
            </button>
          </div>

          <nav className={styles.mobileNavContainer}>
            <ul className={styles.mobileNavList}>
              {/* <li className={styles.mobileNavItem}>
                <Link href="/" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Home</Link>
              </li>
              <li className={styles.mobileNavItem}>
                <Link href="/templates/buttons" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Botão</Link>
              </li>
              <li className={styles.mobileNavItem}>
                <Link href="/templates/inputs" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Input</Link>
              </li> */}
            </ul>

            {!user && (
              <div className={styles.mobileCtaContainer}>
                <button className={styles.mobileCta} data-bs-toggle="modal" data-bs-target="#loginModal">Entrar</button>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;