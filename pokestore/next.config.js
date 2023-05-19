/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Concede permisos a la pagina para consumir API
  images:{
    domains: ['raw.githubusercontent.com']
  } 
}

module.exports = nextConfig
