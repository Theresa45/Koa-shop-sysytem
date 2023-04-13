// 该文件用于存储APP业务
// 导入koa
const Koa = require("koa");
// 导入路由器
// 给每一个模块注册不同的路由器router
const userRouter = require("../router/user.route");
// 导入body参数解析模块
const bodyParser = require("koa-bodyparser");
// 导入错误处理函数
const errorHandler = require("./errorHandler");
// 创建Koa的实例对象
const app = new Koa();

// 在所有的路由处理之前注册中间件
app.use(bodyParser());
//router提供了一个routes方法返回一个中间件。注册路由中间件
app.use(userRouter.routes());
//编写中间件

// 统一的错误处理
// 监听事件的触发
// 错误处理函数抽取成一个模块
app.on("error", errorHandler);
module.exports = app;
