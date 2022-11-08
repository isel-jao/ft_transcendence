/** @type {import('next').NextConfig} */
const path = require('path');
const withImages = require('next-images')
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  withImages({
    exclude: path.resolve(__dirname, 'src/assets/svg'),
    webpack(config, options) {
      return config
    }
  })
};

module.exports = nextConfig;
