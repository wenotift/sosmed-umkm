import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Careers consolidated to the umbrella: 301 the old umkm /karir page to the
    // single canonical careers page at www.sosmed.io/careers. statusCode 301
    // (Next's `permanent: true` would emit 308) to match the studio-side redirect.
    return [
      { source: "/karir", destination: "https://www.sosmed.io/careers", statusCode: 301 },
      { source: "/karir/:path*", destination: "https://www.sosmed.io/careers", statusCode: 301 },
    ];
  },
};

export default nextConfig;
