const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const QueryTypes = db.Sequelize.QueryTypes;
const sequelize = db.sequelize;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a User
  const user = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// 0 : 사용자
// 1 : 컨설턴트
// 2 : 협력사
// 99 : 관리자
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  sequelize
    .query(
      "SELECT a.*, b.path title_image FROM yeka.user a left join yeka.image b on a.id = b.consultant_id",
      { type: QueryTypes.SELECT }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};

// Retrieve all Products from the database.
exports.findAllConsultant = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const limit = req.query.limit;
  const skip = req.query.skip;

  sequelize
    .query(
      "SELECT a.*, b.path title_image FROM yeka.user a left join (select b1.path, b1.consultant_id from yeka.user a1, yeka.image b1 where a1.id = b1.consultant_id group by consultant_id) b on a.id = b.consultant_id where user_type = 1 limit " +
        skip +
        ", " +
        limit,
      { type: QueryTypes.SELECT }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving product.",
      });
    });
};

// Retrieve all Products from the database.
exports.findAllConsultantWithAddress = (req, res) => {
  const limit = req.query.limit;
  const skip = req.query.skip;
  const sido = req.query.sido;
  const dong = req.query.dong;

  sequelize
    .query(
      "SELECT a.*, b.path title_image FROM yeka.user a left join (select b1.path, b1.consultant_id from yeka.user a1, yeka.image b1 where a1.id = b1.consultant_id limit 1) b on a.id = b.consultant_id where user_type = 1 and a.address2 like '%" +
        sido +
        "%' and a.address2 like '%" +
        dong +
        "%' limit " +
        skip +
        ", " +
        limit,
      { type: QueryTypes.SELECT }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving product.",
      });
    });
};

// Retrieve all Products from the database.
exports.findSuperUser = (req, res) => {
  User.findOne({ where: { user_type: 99 } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving product.",
      });
    });
};

// Retrieve all Products from the database.
exports.findAllThumbnail = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  // SELECT a.*, b.path FROM yeka.product a, yeka.image b where a.id = b.product_id;
  sequelize
    .query(
      "SELECT a.*, b.path title_image FROM yeka.user a left join (select b1.path, b1.consultant_id from yeka.user a1, yeka.image b1 where a1.id = b1.consultant_id limit 1) b on a.id = b.consultant_id",
      { type: QueryTypes.SELECT }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving product.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  console.log(req.body);

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((numbers) => {
      res.send({ message: `${numbers} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

// find all published User
exports.findAllPublished = (req, res) => {
  User.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Login a single User with an username
exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);

  User.findOne({ where: { username: username, password: password } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        console.log("login error");
        res.status(404).send({
          message: `Cannot find User with username=${username}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with username=" + username,
      });
    });
};

// Join a single User with an username
exports.register = (req, res) => {
  var username = req.body.username;

  // Validate request
  if (!req.body.username) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  } else {
    User.findOne({ where: { username: username } })
      .then((data) => {
        if (data) {
          res.status(500).send({
            message: "Exists user is " + data.username + ", user : " + data,
          });
        } else {
          // Create a User
          const user = {
            id: null,
            username: req.body.username,
            password: req.body.password,
            user_type: req.body.user_type,
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            gender: req.body.gender,
            address1: req.body.address1,
            address2: req.body.address2,
            address3: req.body.address3,
            business_registration_number: req.body.business_registration_number,
            business_registration_file: req.body.business_registration_file,
            hashtag: req.body.hashtag,
            resume: req.body.resume,
            working_hour: req.body.working_hour,
            withdrawal: req.body.withdrawal ? req.body.withdrawal : 0,
            bank1: req.body.bank1,
            bank2: req.body.bank2,
            bank3: req.body.bank3,
            create_date: req.body.create_date,
            update_date: req.body.update_date,
            delete_date: req.body.delete_date,
          };

          // Save User in the database
          User.create(user)
            .then((data) => {
              res.send(data);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the User.",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Error retrieving User with username=" + username,
        });
      });
  }
};
