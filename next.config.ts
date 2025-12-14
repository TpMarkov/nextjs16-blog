import type {NextConfig} from "next";
import {proxy} from "@/proxy";

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
      }, {
        protocol: "https",
        hostname: "avatar.vercel.sh",
        port: ""
      }
    ]
  }
};

export default nextConfig;
