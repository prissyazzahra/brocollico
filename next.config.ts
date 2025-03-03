import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  module.exports = {
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.mdx/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@mdx-js/loader',
            options: pluginOptions.options,
          },
        ],
      })
      return config
    },
  }
};

export default nextConfig;
