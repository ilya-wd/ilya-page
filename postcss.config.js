module.exports = (cfg) => {
  const dev = cfg.env === 'development';
  // scss = cfg.file.extname === '.scss';

  return {
    map: dev ? { inline: false } : false,
    // parser: scss ? 'postcss-scss' : false,
    plugins: [
      require('postcss-advanced-variables')({ unresolved: 'ignore' }),
      // require('postcss-nested')(),
      require('tailwindcss/nesting')(require('postcss-nested')),
      require('postcss-import'),
      require('tailwindcss')(),
      require('autoprefixer')(),
    ],
  };
};
