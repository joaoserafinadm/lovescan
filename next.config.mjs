/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Configuração para resolver conflitos de versão da biblioteca cookie
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Resolve o conflito de versões da biblioteca cookie
      config.resolve.alias = {
        ...config.resolve.alias,
        'cookie': require.resolve('cookie')
      };
    }
    return config;
  },
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {

//   reactStrictMode: true,
// };

// export default nextConfig;
