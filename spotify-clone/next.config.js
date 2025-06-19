/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lbgfoiqrnnyolpzopyff.supabase.co'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lbgfoiqrnnyolpzopyff.supabase.co',
        pathname: '/storage/**', // khai báo path rõ ràng hơn nếu muốn chắc chắn
      }
    ]
  }
};

module.exports = nextConfig;
