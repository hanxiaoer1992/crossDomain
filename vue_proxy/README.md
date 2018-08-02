# vuecli2.0

> a vue cross domain demo

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


添加proxy代理：
config文件夹下index.js 中添加proxyTable
proxyTable: {
  '/api': {
     target: 'http://localhost:1111',//这里是服务器地址额
     changeOrigin: true,
     pathRewrite: {
        '^/api': ''//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
     }
  }
}
npm install axios -g
在要调用接口的文件中引入axios
import axios from 'axios'
axios.get('/api/api/user')
  .then(function (data) {
     console.log(data)
  })
  .catch(function (error) {
     console.log(error)
  })
