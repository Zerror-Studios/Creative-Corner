/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  turbopack: {},
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });
    return config;
  },
  reactCompiler: true,
  // Pages of the previous yourcreativecorner.com site — send old links and search results
  // to the matching section instead of a 404, so the ranking they built up carries over
  async redirects() {
    return [
      { source: "/index", destination: "/", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/about-us", destination: "/#about", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/contact-us", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
