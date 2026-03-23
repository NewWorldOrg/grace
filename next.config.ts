import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  compiler: {},
  allowedDevOrigins: ['grace.localhost'],
  transpilePackages: [
    '@cloudscape-design/components',
    '@cloudscape-design/design-tokens',
    '@cloudscape-design/component-toolkit',
    '@blocknote/core',
    '@blocknote/react',
    '@blocknote/mantine',
  ],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.SSR_API_BASE_PATH}/api/:path*`,
      },
      {
        source: '/auth0/:path*',
        destination: `${process.env.SSR_API_BASE_PATH}/auth0/:path*`,
      },
    ]
  },
}

export default nextConfig
