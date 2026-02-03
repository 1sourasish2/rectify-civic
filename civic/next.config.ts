import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   reactStrictMode: true,
  images: {
    domains: [
      "cdn-icons-png.flaticon.com", // for profile avatars
      "source.unsplash.com",    
      "pcacs.ac.in"   ,
      "media.istockphoto.com" ,
       "static.toiimg.com",
       "pcacs.ac.in",
        "img.etimg.com"
    ],
  },
};

export default nextConfig;
