import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  output: 'export', // Gera arquivos HTML/CSS/JS estáticos
  images: {
    unoptimized: true, // Necessário pois o GitHub Pages não suporta Otimização de Imagem dinâmica do Next
  },
  basePath: process.env.NODE_ENV === 'production' ? '/meu-gestor-compras' : '',
};

export default nextConfig;
