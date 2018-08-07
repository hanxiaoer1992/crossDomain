跨域
由于浏览器对js的同源策略（协议、域名、端口相同）的限制导致跨域

解决方法：
jsonp：基于script标签实现
由于拥有src属性的标签不受跨域影响，因此可以把服务器上的数据装入js文件（一般以json格式），利用回调函数处理数据，形成了jsonp。原理：src属性不受跨域影响
缺点：只能实现一种请求

document.domain:基于使浏览器中的域名相同跨域。原理：修改不同域的域名，使其相同（至少一级域名相同）
只能更改一级域名相同的地址（如均为baidu.com），通过document.domain = 'baidu.com'更改

window.name:窗口的生命周期内载入的所有页面共享window.name，因此可以记录数据。原理：不同域的框架间可以获取对方window对象
相当于a页面和b页面均能改变window.name变量值，可以通过读取变量值实现页面之间数据传递，一级域名可以不同
使用：利用隐藏的iframe获取页面b，然后页面a去得到iframe的数据。获取一级域名不同的数据时，在更改window.name后需要通过js更改iframe 的src为与页面a同级域名才可获取

window.postMessage:原理：不同域的框架间可以获取对方window对象
IE6、7不支持

CORS:跨端资源共享：后端通过'Access-Control-Allow-Origin'设置
主要需要浏览器和服务器同时支持，浏览器将CORS请求分为简单请求和非简单请求，简单请求需要在头信息中增加一个Origin字段，非简单请求会在通信前增加HTTP查询，询问服务器网页所在域名是否在服务器许可名单中，以及可使用的HTTP动词和头信息字段，得到肯定答复后浏览器才会发出正式的XMLHttpRequest
请求方法为HEAD、GET、POST，头信息不超出Accept、Accept-Language、Content-Language、Last-Event-ID、Content-Type(application/x-www-form-urlencoded、multipart/form-data、text/plain)即为简单请求。对于普通跨域请求，只需后端设置，前端无需设置
跨域实现cookie传递数据，服务器端指定Access-Control-Allow-Credentials: true（Access-Control-Allow-Origin不能设置为*），ajax请求中需要打开withCredentials属性：
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

nginx代理：nginx配置，原理：同源策略是浏览器的，不是HTTP协议，服务端不存在跨域问题。
js、css、img可以跨域，icon不可以。在nginx静态资源服务器中配置'add_header Access-Control-Allow-Origin *'可实现iconfont字体文件跨域
通过nginx配置代理服务器，与页面a域名相同，端口不同，代理访问页面2接口，可以修改cookie中domain信息，修改当前域cookie，实现跨域登录。

node.js中间层代理(原理同nginx代理)
非vue：node + express + http-proxy-middleware搭建一个proxy服务器
vue:node + webpack + webpack-dev-server

WebSocket协议：允许客户端和服务器之间全双通信，只需建立一次链接就可一直保持链接状态。与HTTP协议不同，对服务器有重大影响，基于多线程或多进程的服务器无法适用。



demo运行：
server启动静态资源服务器http://localhost:1111,运行npm run server启动
jsonp:访问read_jsonp.html,能看到获取到对json数据
window.name:访问windowName/index.html能看到server中windowName.html中传递的数据
window.postMessage:访问windowPostMessage/index.html能看到server中windowPostMessage.html中传递的数据
cors:访问cors/index.html能看到http://localhost:1111/cors 返回的数据
node.js:初次执行npm run vue，否则执行npm run vueopen,访问localhost:8080 能看到调用http://localhost:1111/api/user接口


图片跨域问题：canvas.toDataURL会遇到，img标签添加 crossorigin="anonymous"属性，核心是请求头中包含了 Origin: "anonymous"或"*" 字段，响应头中就会附加上 Access-Control-Allow-Origin: * 字段，问题解决



