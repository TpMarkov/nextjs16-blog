import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: ""
      }, {
        protocol: "https",
        hostname: "original-salmon-783.convex.cloud",
        port: ""
      }
    ]
  }
};

export default nextConfig;
