module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/minesweeper/' : '/',
  pages: {
    index: {
      entry: 'src/main.ts',
      title: 'Minesweeper',
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
           @import "./src/styles/handler.scss";
        `,
      },
    },
  },
};
