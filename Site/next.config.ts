import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/ArthurBr02/bonbons-ensim-usine-du-futur/**",
      },
    ],
  },
};

export default nextConfig;
