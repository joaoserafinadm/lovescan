export default function isMobile() {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 850;
    }
    return false; // ou outro valor padrão para SSR
  }
  