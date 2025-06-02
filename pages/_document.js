import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Meta tags essenciais para iOS */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* Meta tags para PWA e iOS */}
        <meta name="application-name" content="Love Scan" />
        <meta name="apple-mobile-web-app-title" content="Love Scan" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="description" content="Love Scan" />
        
        {/* Meta tags adicionais para melhor compatibilidade */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Previne zoom em inputs no iOS */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
        
        {/* Charset */}
        <meta charSet="utf-8" />
        
        {/* IE compatibility */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#ff9db4" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}