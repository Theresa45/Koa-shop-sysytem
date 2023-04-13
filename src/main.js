// 该入口文件就一个作用：绑定端口号，启动HTTP服务
const app = require("./app");
// 引入端口号
const { APP_PORT } = require("./config/config.default");

//绑定一个端口号
app.listen(APP_PORT, () => {
  console.log(`Server is runing on http://localhost:${APP_PORT}`);
});
