const db = require("../../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.index = async (req, res, next) => {
    console.log("index");

    return res.render('admin/user/index', {
        count: 1,
        data: [],
        user: {
                  users_id: 1,
                  userid: 1,
                  password: 1,
                  userName: "이름",
                  phoneNum: "010-1010-1010",
                  email: "ddd@gmail.com",
//                  permission1: 0100,
//                  permission2: 1111,
//                  permission3_1: 15,
//                  permission3_2: 15,
//                  permission4: 15,
//                  permission5: 15,
//                  permission6: 15,
//                  permission7: 15,
                  note: "memo",
                  createUser: "dd",
                  updateUser: "ss",
                  createDate: "",
                  updateDate: "",
                  deleteUser: "",
                  deleteDate: "",
                  custom1: "",
                  custom2: "",
                  custom3: ""
                }
    });
}
