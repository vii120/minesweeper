module.exports = {
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
           @import "./src/styles/variables.scss";
        `,
      },
    },
  },
};
