
module.exports = {
  entry: {
    main: "./src/index.js"
  },
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader")
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use:
          {
            loader: 'file-loader',
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "imgs"
            } 
          }
      }
    ]
  }
};
