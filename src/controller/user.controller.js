// user路由器的路由处理函数
// 导入数据库操作函数
const { createUser, getUserInfo } = require("../service/user.service");
const { userRegisterError } = require("../constant/error.type");
class UserController {
  // 因为数据库操作等属于异步操作，所以使用async/await异步处理
  //ctx:http上下文，一个包含http请求（ctx.request）和http响应（ctx.response）的对象
  // 调用service层函数最好都使用try/catch语法捕获数据库操作错误
  // 注册接口
  async register(ctx, next) {
    // 获取数据
    const { user_name, password } = ctx.request.body;

    try {
      // 操作数据库
      const res = await createUser(user_name, password);
      ctx.body = {
        code: 200,
        message: "用户注册成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (error) {
      // 添加数据失败
      console.log(error);
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }

  // 登录接口
  async login(ctx, next) {
    ctx.body = "这是用户登录页！";
  }
}

// 导出类的实例化对象
module.exports = new UserController();
