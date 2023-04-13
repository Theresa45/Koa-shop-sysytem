const { getUserInfo } = require("../service/user.service");
const {
  userFoemateError,
  userExistedError,
  userRegisterError,
} = require("../constant/error.type");
const userValidator = async (ctx, next) => {
  // 登录或注册表单验证合法性
  //合法性：格式必须是对的
  // 获取数据
  const { user_name, password } = ctx.request.body;

  if (!user_name || !password) {
    // 请求格式不正确
    console.error("用户名或密码为空", ctx.request.body);
    ctx.app.emit("error", userFoemateError, ctx);
    // 不会进入到下一个中间件
    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  // 注册表单验证合理性
  // 合理性：用户存在就不注册
  // 获取数据
  const { user_name } = ctx.request.body;
  // 返回的是一个Promise对象，所以需要使用await
  // 调用service层函数最好都使用try/catch语法捕获数据库操作错误
  // if (await getUserInfo({ user_name })) {
  //   // 请求资源与当前状态冲突
  //   ctx.app.emit("error", userExistedError, ctx);
  //   // 不会进入到下一个中间件
  //   return;
  // }
  try {
    const res = await getUserInfo({ user_name });
    if (res) {
      // 请求资源与当前状态冲突
      console.error("用户名已存在", { user_name });
      ctx.app.emit("error", userExistedError, ctx);
      // 不会进入到下一个中间件
      return;
    }
  } catch (error) {
    console.error("获取用户信息错误", error);
    ctx.app.emit("error", userRegisterError, ctx);
    return;
  }
  await next();
};

module.exports = {
  userValidator,
  verifyUser,
};
