const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

//通常会给数据表添加一个前缀表示项目
// 模型shop_system_user对应数据表shop_system_users
const User = seq.define("shop_system_user", {
  // 在这里定义模型属性
  // id 由sequelize自动创建并管理
  user_name: {
    // 字段类型
    type: DataTypes.STRING,
    // 是否允许为空
    allowNull: false,
    // 是否唯一
    unique: true,
    // 注释
    comment: "用户名，唯一",
  },
  password: {
    // 字段类型
    type: DataTypes.CHAR(64),
    // 是否允许为空
    allowNull: false,
    // 注释
    comment: "密码",
  },
  is_admin: {
    // 字段类型
    type: DataTypes.BOOLEAN,
    // 是否允许为空
    allowNull: false,
    // 默认值设置
    defaultValue: 0,
    // 注释
    comment: "是否为管理员，0：不是（默认），1：是",
  },
});

// 强制同步完了就注释掉（创建数据表）
// User.sync({
//   // 强制删除数据库中已存在的同名数据表，重新创建
//   force: true,
// });

module.exports = User;
