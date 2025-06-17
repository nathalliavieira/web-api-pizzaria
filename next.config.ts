import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns: [
      {
        // protocol: "https", Como ainda estamos em ambiente de desenvolvimento vamos deixar isso comentado
        hostname: "res.cloudinary.com"
      }
    ]
  }
}; //Aqui precisamos passar essa configuracao se nao o Image do next js nao nos permite reproduzir imagens de bancos externos, no nosso caso estamos usando o cloudinary

export default nextConfig;
