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
          options: {
            parser: 'PostHTML Parser'
            plugins: [ /* PostHTML Plugins */ ]
            template: true
          }
        }
      ]
    }
  ]
},
```

<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|`parser`|`{String/Function}`|`undefined`|PostHTML Parser|
|`render`|`{String/Function}`|`undefined`|PostHTML Render|
|`config`|`{Object}`|`undefined`|PostHTML Config `posthtml.config.js`|
|`plugins`|`{Array/Function}`|`[]`|PostHTML Plugins|
|`template` |`{Boolean/String}`|`false`|Export HTML Template `{Function}`|

### Parser

If you want to use a custom parser, you can pass it in under the `parser` key  in the loader options e.g [SugarML](https://github.com/posthtml/sugarml)

**webpack.config.js**
```js
module: {
  rules: [
    {
      test: /\.ssml$/,
      use: [
        {
          loader: 'posthtml-loader',
          options: { parser: 'posthtml-sugarml' }
        }
      ]
    }
  ]
}
```

### Plugins

Plugins are specified under the `plugins` key in the loader options

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

If you want to use are shareable config file instead of inline options in your `webpack.config.js` create a `posthtml.config.js` file and placed it somewhere down the file tree in your project. The nearest config relative to `dirname(file)` currently processed by the loader applies. This enables **Config Cascading**. Despite some edge cases the config file will be loaded automatically and **no** additional setup is required. If you don't intend to use Config Cascading, it's recommended to place `posthtml.config.js` in the **Root** `./` of your project

```
|– src
|   |– components
|   |   |– component.html
|   |   |– posthtml.config.js (components)
|   |– index.html
|
|– posthtml.config.js (index)
|– webpack.config.js
```

[**posthtml.config.js**](https://github.com/posthtml/posthtml-load-config)
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

**webpack.config.js**
```js
{
  loader: 'posthtml-loader',
}
```

#### Path

If you normally place all your config files in a separate folder e.g './config' it is nessescary to explicitly set the config path in `webpack.config.js`

**webpack.config.js**
```js
{
  loader: 'posthtml-loader',
  options: {
    config: { path: 'path/to/posthtml.config.js' }
  }
}
```

#### Context

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|`env`|`{String}`|`'development'`|process.env.NODE_ENV|
|`file`|`{Object}`|`dirname, basename, extname`|File|
|`options`|`{Object}`|`{}`|Plugin Options (Context)|

**webpack.config.js**
```js
{
  loader: 'posthtml-loader',
  options: {
    ctx: {
      include: {...options}
      content: {...options}
    }
  }
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

### Templates

By setting the template option the loader will export a `{Function}` instead of a  `{String}` to enable templating via ES2015 Template Literals. By default
locals/literals must are declared with an `_` inside your HTML Templates, it is possible to override the selctor with a custom one by passing a string to the template option e.g `{ template: '$' }`

**template.html**
```html
<div>${ _.hello }</div>
```

**webpack.config.js**
```js
{
  loader: 'posthtml-loader',
  options: {
    template: true
  }
}
```

**template.js**
```js
import template from './template.html'

document.body.innerHTML = template({ hello: 'Hello World!' })
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
