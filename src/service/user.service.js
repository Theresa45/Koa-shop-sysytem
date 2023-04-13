// 用户模块数据库操作
// 通过model模块操作数据库

// 导入模型
const User = require("../model/user.model");

class UserService {
  // 注册即向数据库添加一个用户
  async createUser(user_name, password) {
    //增加/插入数据
    //User.create返回的是一个Promise对象
    const res = await User.create({
      //字段:值
      //属性名与属性值一致，使用简写形式
      user_name,
      password,
    });
    // 只要sequelize操作数据库错误和这里的代码错误只要一抛出就会被user.controller.js里的函数捕获到
    return res.dataValues;
  }

  // 查询用户信息
  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {};

    // 短路运算：第一个值存在就执行&&后面的表达式
    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    // 如果is_admin为false，会出错
    is_admin && Object.assign(whereOpt, { is_admin });

    const res = await User.findOne({
      attributes: ["id", "user_name", "password", "is_admin"],
      where: whereOpt,
    });

    return res ? res.dataValues : null;
  }
}

module.exports = new UserService();
