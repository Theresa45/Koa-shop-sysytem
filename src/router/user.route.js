// 路由器实例化及路由规则编写
// 给每一个模块实例化不同的路由器router
//导入koa-router包
const Router = require("@koa/router");
// 导入路由处理函数
const { register, login } = require("../controller/user.controller");
// 导入用户验证中间件
const { userValidator, verifyUser } = require("../middleware/user.catchError");

//实例化router对象，给不同的模块加上对应的前缀
const router = new Router({ prefix: "/users" });

//编写路由规则
// 注册接口：POST /users/register
// 路由器可以传入多个中间件，每个中间件的功能都是单一的，即也是洋葱模型
router.post("/register", userValidator, verifyUser, register);

// 登录接口：POST /users/login
router.post("/login", login);

module.exports = router;
