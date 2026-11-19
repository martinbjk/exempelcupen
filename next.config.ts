import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Innehållsfilerna läses vid byggtid, så sajten blir statisk och snabb.
  outputFileTracingIncludes: { "/**": ["./content/**/*"] },
};

export default nextConfig;
