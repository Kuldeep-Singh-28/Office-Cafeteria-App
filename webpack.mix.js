// webpack.mix.js

let mix = require("laravel-mix");

mix
  .js("src/js/app.js", "public/js/app.js")
  .sass("src/scss/app.scss", "public/css/app.css");

mix.babelConfig({
  plugins: ["@babel/plugin-proposal-class-properties"],
});
