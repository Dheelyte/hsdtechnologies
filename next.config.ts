import type { NextConfig } from "next";

/** Old multi-page URLs redirect to their sections on the one-page layout. */
const SECTIONS = ["about", "services", "plans", "process", "academy", "team", "contact"];

const nextConfig: NextConfig = {
  async redirects() {
    return SECTIONS.map((section) => ({
      source: `/${section}`,
      destination: `/#${section}`,
      permanent: false,
    }));
  },
};

export default nextConfig;
