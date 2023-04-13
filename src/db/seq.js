//导入Sequelize类
const { Sequelize } = require("sequelize");

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} = require("../config/config.default");

// 创建一个 Sequelize 实例
const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: "mysql",
});

// 连接测试
// sequelize.authenticate().then(
//   () => {
//     console.log("数据库连接成功");
//   },
//   () => {
//     console.log("数据库连接失败");
//   }
// );

module.exports = sequelize;
