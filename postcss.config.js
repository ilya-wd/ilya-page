module.exports = (cfg) => {
  const dev = cfg.env === 'development';

  return {
    map: dev ? { inline: false } : false,
    plugins: [
      require('postcss-advanced-variables')({ unresolved: 'ignore' }),
      require('tailwindcss/nesting')(require('postcss-nested')),
      require('postcss-import'),
      require('tailwindcss')(),
      require('autoprefixer')(),
    ],
  };
};
