const db = require("../../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (req.body.title) {
    res.status(400).send({
      message: "Content have to empty!"
    });
    return;
  }

  // Create a User
  const user = {
    id: null,
    user_type: parseInt(req.body.user_type),
    username: req.body.username,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    gender: parseInt(req.body.gender),
    address1: req.body.address1,
    address2: req.body.address2,
    address3: req.body.address3,
    business_registration_number: req.body.business_registration_number,
    business_registration_file: null,
    hashtag: req.body.hashtag,
    resume: req.body.resume,
    working_hour: req.body.working_hour,
    withdrawal: parseInt(req.body.withdrawal),
    bank1: req.body.bank1,
    bank2: req.body.bank2,
    bank3: req.body.bank3,
    business_registration_file: req.body.business_registration_file,
  };

console.log(user)
  // Save User in the database
  // insert into user values(user);

  User.create(user)
    .then(data => {
      return res.redirect('/admin/user');
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
//      res.send(data);
      return res.render('admin/user/index', {
        count: 1,
        data: data,
        user: {}
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    });
};

// Find a empty User
exports.findEmpty = (req, res) => {
  const id = req.params.id;

   return res.render('admin/user/detail', {
       count: 1,
       data: [],
       user: {},
       id,
     });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        return res.render('admin/user/detail', {
            count: 1,
            data: data,
            user: {},
            id,
          });
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.redirect('/admin/user/detail/' + id);
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.redirect('/admin/user');
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(numbers => {
      res.send({ message: `${numbers} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

// find all published User
exports.findAllPublished = (req, res) => {
  User.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};