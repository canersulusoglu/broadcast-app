import path from "path";
import webpack from "webpack";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const config: webpack.Configuration = {
  entry: "./index.tsx",
  module: {
    rules: [
      // Typesript and Javasript file types.
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      // Css file type.
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              //modules: true
            },
          },
        ],
      },
      // Less file type
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: {
              attributes: { id: 'theme-style' },
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              },
            },
          },
        ],
      },
      // Image file types.
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        include: [path.join(__dirname, "src/@assets")],
        use: ['file-loader?name=[name].[ext]']
      },
      // Font file types.
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        include: [path.join(__dirname, "src/@assets")],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: ["*", ".tsx", ".ts", ".js"],
    alias: {
      ['@App']:  path.resolve(__dirname, 'src')
    }
  },
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: '/',
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    historyApiFallback: true,
    port: 4000,
    hot: true
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: path.resolve(__dirname, "./src/**/*.{ts,tsx,js,jsx}")
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'TEST_VARIABLE': '"Test Variable for process.env"'
      }
    })
  ],
};

export default config;