// hooks/useTranslation.js
import { useRouter } from 'next/router';

// Importar todos os arquivos de tradução
import ptCommon from '../locales/pt/common';
import ptPresentationConfig from '../locales/pt/presentationConfig';

import enCommon from '../locales/en/common';
import enPresentationConfig from '../locales/en/presentationConfig';

import esCommon from '../locales/es/common';
import esPresentationConfig from '../locales/es/presentationConfig';

// Organizar as traduções por locale e namespace
const translations = {
  'pt': {
    common: ptCommon,
    presentationConfig: ptPresentationConfig,
  },
  'en': {
    common: enCommon,
    presentationConfig: enPresentationConfig,
  },
  'es': {
    common: esCommon,
    presentationConfig: esPresentationConfig,
  },
};

export function useTranslation(namespaces = ['common']) {
  const router = useRouter();
  const { locale, locales, asPath } = router;

  // Garantir que `namespaces` seja um array
  const nsArray = Array.isArray(namespaces) ? namespaces : [namespaces];

  const t = (key) => {
    // Tentar encontrar a chave em cada namespace fornecido
    for (const ns of nsArray) {
      const keys = key.split('.');
      let translation = translations[locale]?.[ns];

      for (const k of keys) {
        translation = translation?.[k];
        if (translation === undefined) break;
      }

      if (translation !== undefined) return translation;
    }

    // Se não encontrar, retorna a chave como fallback
    return key;
  };

  const changeLanguage = (newLocale) => {
    router.push(asPath, asPath, { locale: newLocale });
  };

  return {
    t,
    locale,
    locales,
    changeLanguage,
  };
}
