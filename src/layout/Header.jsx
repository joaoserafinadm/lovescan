// Header.js
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, LogIn } from 'lucide-react';
import styles from './Header.module.css';

const Header = ({ user = null }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
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
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/templates/buttons" className={styles.navLink}>Botão</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/templates/inputs" className={styles.navLink}>Input</Link>
            </li>
            {/* <li className={`${styles.navItem} ${styles.hasDropdown}`}>
              <span className={styles.navLink}>
                Serviços <ChevronDown size={16} />
              </span>
              <ul className={styles.dropdown}>
                <li><Link href="/service1" className={styles.dropdownItem}>Serviço 1</Link></li>
                <li><Link href="/service2" className={styles.dropdownItem}>Serviço 2</Link></li>
                <li><Link href="/service3" className={styles.dropdownItem}>Serviço 3</Link></li>
              </ul>
            </li>
            <li className={styles.navItem}>
              <Link href="/portfolio" className={styles.navLink}>Portfólio</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/contact" className={styles.navLink}>Contato</Link>
            </li> */}
          </ul>
        </nav>

        {/* CTA/Avatar (direita) */}
        <div className={styles.cta}>
          {user ? (
            <div className={styles.userAvatar}>
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt={user.name || "Usuário"}
                className={styles.avatarImage}
              />
            </div>
          ) : (
            <div className={styles.ctaWrapper}>
              {/* Botão de Login para Desktop */}
              <button className={styles.ctaButton}>Começar Agora</button>

              {/* Botão de Login para Mobile */}
              <Link href="/login" className={styles.loginButton}>
                <LogIn size={20} />
              </Link>
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
            <li className={styles.mobileNavItem}>
              <Link href="/" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Home</Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link href="/templates/buttons" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Botão</Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link href="/templates/inputs" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Input</Link>
            </li>
            {/* <li className={styles.mobileNavItem}>
              <details className={styles.mobileDropdown}>
                <summary className={styles.mobileNavLink}>Serviços</summary>
                <ul className={styles.mobileDropdownContent}>
                  <li><Link href="/service1" className={styles.mobileDropdownItem} onClick={toggleMobileMenu}>Serviço 1</Link></li>
                  <li><Link href="/service2" className={styles.mobileDropdownItem} onClick={toggleMobileMenu}>Serviço 2</Link></li>
                  <li><Link href="/service3" className={styles.mobileDropdownItem} onClick={toggleMobileMenu}>Serviço 3</Link></li>
                </ul>
              </details>
            </li>
            <li className={styles.mobileNavItem}>
              <Link href="/portfolio" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Portfólio</Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link href="/contact" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Contato</Link>
            </li> */}
          </ul>

          {!user && (
            <div className={styles.mobileCtaContainer}>
              <button className={styles.mobileCta}>Começar Agora</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;