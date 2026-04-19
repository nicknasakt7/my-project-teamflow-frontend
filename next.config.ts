import type { NextConfig } from 'next';
import '@/lib/config/env.validation';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
