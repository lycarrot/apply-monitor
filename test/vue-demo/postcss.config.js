module.exports = {
    loader: 'postcss-loader',  
    plugins: {
        'postcss-preset-env': {
            "browsers": [
                "defaults",
                "not ie < 11",
                "last 2 versions",
                "> 1%",
                "iOS 7",
                "last 3 iOS versions"
            ]
        },
      }
  }