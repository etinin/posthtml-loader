[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![code style][style]][style-url]
[![chat][chat]][chat-url]

<div align="center">
  <a href="https://github.com/posthtml/posthtml">
    <img width="220" height="200" title="PosHTML"           src="http://posthtml.github.io/posthtml/logo.svg">
  </a>
  <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  <h1>PostHTML Loader</h1>
</div>

<h2 align="center">Install</h2>

```bash
npm i -D html-loader posthtml-loader
```

<h2 align="center">Usage</h2>

```js
import html from './file.html'
```
**webpack.config.js**
```js
module: {
  rules: [
    {
      test: /\.html$/,
      use: [
        {
          loader: 'posthtml-loader',
          options: { plugins: [ /* PostHTML Plugins */ ] }
        }
      ]
    }
  ]
},
```

<h2 align="center">Options</h2>

### Options

If you want to use a custom parser, you can pass it in under the `parser` key or as query string in the loader. Below is an example with [SugarML](https://github.com/posthtml/sugarml):

**webpack.config.js**
```js
module: {
  rules: [
    {
      test: /\.ssml$/,
      use: [
        {
          loader: 'posthtml-loader',
          options: { parser: require('posthtml-sugarml')() }
        }
      ]
    }
  ]
}
```

### Plugins

**webpack.config.js**
```js
module: {
  rules: [
    {
      test: /\.html$/,
      use: [
        'html-loader',
        {
          loader: 'posthtml-loader',
          options: {
            plugins: () => [
              require('posthtml-plugin')()
            ]
          }
        }
      ]
    }
  ]
}
```

### Config

**webpack.config.js**
```js
module: {
  rules: [
    {
      test: /\.html$/,
      use: [
        {
          loader: 'posthtml-loader',
          options: {
            config: { path: 'path/to/posthtml.config.js', context: {} }
          }
        }
      ]
    }
  ]
}
```

**posthtml.config.js**
```js
module.exports = ({ file, options, env }) => ({
  parser: 'posthttml-sugarml'
  plugins: {
    'posthtml-include': options.include
    'posthtml-content': options.content
    'htmlnano': env === 'production' ? {} : false
  }
})
```

<h2 align="center">Maintainer</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150 height="150"
        src="https://avatars.githubusercontent.com/u/5419992?v=3&s=150">
        <br />
        <a href="https://github.com/michael-ciniawsky">Michael Ciniawsky</a>
      </td>
    </tr>
  <tbody>
</table>

<h2 align="center">Contributors</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150 height="150"
        src="https://avatars.githubusercontent.com/u/556932?v=3&s=150">
        <br />
        <a href="https://github.com/jescalan">Jeff Escalante</a>
      </td>
      <td align="center">
        <img width="150" height="150" src="https://avatars.githubusercontent.com/u/2789192?v=3&s=150">
        <br />
        <a href="https://github.com/Gitscrum">Ivan Demidov</a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/posthtml-loader.svg
[npm-url]: https://npmjs.com/package/posthtml-loader

[node]: https://img.shields.io/node/v/posthtml-loader.svg
[node-url]: https://nodejs.org/

[deps]: https://david-dm.org/posthtml/posthtml-loader.svg
[deps-url]: https://david-dm.org/posthtml/posthtml-loader

[tests]: http://img.shields.io/travis/posthtml/posthtml-loader.svg
[tests-url]: https://travis-ci.org/posthtml/posthtml-loader

[cover]: https://coveralls.io/repos/github/posthtml/posthtml-loader/badge.svg
[cover-url]: https://coveralls.io/github/posthtml/posthtml-loader

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[chat]: https://badges.gitter.im/posthtml/posthtml.svg
[chat-url]: https://gitter.im/posthtml/posthtml
