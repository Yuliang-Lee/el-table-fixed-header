# element table fixed bottom header directive

[![Vue 2.x](https://img.shields.io/badge/Vue-2.x-brightgreen.svg)](https://vuejs.org/v2/guide/)
[![npm](https://img.shields.io/npm/v/el-table-fixed-header.svg)](https://www.npmjs.com/package/el-table-fixed-header)
[![npm-downloades](https://img.shields.io/npm/dm/el-table-fixed-header.svg)](https://www.npmjs.com/package/el-table-fixed-header)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Yuliang-Lee/vue2-smooth-scroll/blob/master/LICENSE)


## Features

- Fixed element's table header when scrolling

## Instalation

### Using module bundlers
``` bash
# install dependency
npm install --save el-table-fixed-header
```

``` javascript
// import on your project (less then 1KB gziped)
import ElTableFixedHeader from 'el-table-fixed-header'
Vue.use(ElTableFixedHeader)
```

### Browser

``` html
<body>
  <div id="app">
    <div id="wrapper-id">
      <el-table v-fixed-header="{startFixed: 230, container: '#wrapper-id'}"></el-table>
    </div>
  </div>
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/vue2-smooth-scroll"></script>
  <script>
  Vue.use(ElTableFixedHeader);
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  });
</script>
</body>
```

## Usage
``` html
<div id="wrapper-id">
  <el-table v-fixed-bottom-header="{startFixed: 230, container: '#wrapper-id'}"></el-table>
</div>
```

## Custom options
### Defaults
``` js
  {
    startFixed: 0, // Distance from top of table to top of browser window when to start fix header
    container: '', // default is window, the scroll container, use document.querySelector to query the Element
  }
```

## License

[MIT](./LICENSE)
