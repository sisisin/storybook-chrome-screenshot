module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('ts-loader')
      }
    ]
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
