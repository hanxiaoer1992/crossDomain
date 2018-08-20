//加载模块
let http = require('http')
var qs = require('querystring')
let fs = require('fs')
let nUrl = require('url')
let path = require('path')
// '127.0.0.1'表明只有本机可访问，'0.0.0.0'表示所有人可访问
const hostname = '127.0.0.1'
const port = 3000
// 通过http.createServer获取一个server实例
// 其中(req, res) => {}，在服务器每次接收到请求时都会被执行
let server = http.createServer((req, res) => {
  let method = req.method // 客户端请求方法
  let url = nUrl.parse(req.url) // 将请求url字符串转换为node的url对象
  if (method === 'GET' && url.pathname === '/') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World')
    return
  }
  // 如果客户端GET请求'/api/user'，会执行这个分支里面的逻辑
  if (method === 'GET' && url.pathname === '/api/user') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
      code: 0,
      msg: '',
      result: {
        username: 'shasharoman'
      }
    }))
    return
  }
  // 如果客户端GET请求'/*/vuejsonp'，会执行这个分支里面的逻辑
  if (method === 'GET' && url.path.search('vuejsonp') != -1) {
    let result = {
      code: 200,
      name: "vuejsonp"
    }
    let call = url.path.split('?')
    let back = call[0].split('&')
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/javascript')
    res.end(back[0] + '(' + JSON.stringify(result) + ')')
    return
  }
  // 如果客户端GET请求'/*/cors'，会执行这个分支里面的逻辑
  if (method === 'GET' && url.path.search('cors') != -1) {
    let result = {
      code: 201,
      name: "cors"
    }
    res.writeHead(200, {
      'Access-Control-Allow-Credentials': 'true',     // 后端允许发送Cookie
      'Access-Control-Allow-Origin': 'http://localhost:63342',    // 允许访问的域（协议+域名+端口）
      'Set-Cookie': 'l=a123456;Path=/;Domain=localhost:1111;',
      'Access-Control-Allow-Credentials': 'true'
    })
    res.write(JSON.stringify(result))
    res.end()
    return
  }
  // 如果客户端GET请求'/*/nginx'，会执行这个分支里面的逻辑
  if (method === 'GET' && url.path.search('nginx') != -1) {
    let result = {
      code: 201,
      name: "nginx"
    }
    res.writeHead(200, {
      'Set-Cookie': 'l=a123456;Path=/;Domain=*;HttpOnly'   // HttpOnly:脚本无法读取
    })
    res.write(JSON.stringify(result))
    res.end()
    return
  }
  let staticPath = path.join(__dirname, 'assets')
  let pathObj = nUrl.parse(req.url, true)
  let filePath = path.join(staticPath, pathObj.pathname)
  let fileContent = fs.readFileSync(filePath, 'binary')
  res.write(fileContent, 'binary')
  res.end()
})

server.listen(1111)
console.log('http://localhost:1111')
