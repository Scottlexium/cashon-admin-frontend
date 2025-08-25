import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'development' 
              ? [
                  // More permissive CSP for development
                  "default-src 'self' 'unsafe-inline' 'unsafe-eval'",
                  "connect-src 'self' https://cashon.stag.cashonrails.com http://localhost:* ws://localhost:*",
                  "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
                  "style-src 'self' 'unsafe-inline'",
                  "img-src 'self' data: https: http:",
                  "font-src 'self' data: https:",
                  "object-src 'none'",
                  "base-uri 'self'"
                ].join('; ')
              : [
                  // Stricter CSP for production
                  "default-src 'self'",
                  "connect-src 'self' https://cashon.stag.cashonrails.com",
                  "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
                  "style-src 'self' 'unsafe-inline'",
                  "img-src 'self' data: https:",
                  "font-src 'self' data:",
                  "object-src 'none'",
                  "base-uri 'self'",
                  "form-action 'self'",
                  "frame-ancestors 'none'",
                  "upgrade-insecure-requests"
                ].join('; ')
          }
        ]
      }
    ];
  }
};

export default nextConfig;
