const db = require("../models");
const operation_setting = db.operation_setting;
const Op = db.Sequelize.Op;

// Create and Save a new operation_setting
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  let week_setting = req.body.week_setting;
  let start_time = req.body.start_time;
  let end_time = req.body.end_time;

  // Create a operation_setting
  const operation_setting = {
    week_setting: req.body.week_setting,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  };

  // Save operation_setting in the database
  operation_setting.create(operation_setting)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the operation_setting."
      });
    });
};

// Retrieve all Communities from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  db.user.findAll({ where: {user_type: 1} })
    .then(data => {
      return res.render('admin/operation_setting/index', {
        count: 1,
        data: data,
        image: {}
    })
  })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving operation_setting."
      });
    });
};

// Find a single operation_setting with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  const limit = req.params.limit;
  let offset = 0;

  if (pageNum > 1) {
    offset = 10 * (pageNum - 1);
  }

  operation_setting.findAndCountAll({
    // where: { consultant_id: id },
    offset: offset,
    limit: limit,
    order: [["id", "DESC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving community.",
      });
    });
};

// Update a operation_setting by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  operation_setting.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "operation_setting was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update operation_setting with id=${id}. Maybe operation_setting was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating operation_setting with id=" + id
      });
    });
};

// Delete a operation_setting with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  operation_setting.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "operation_setting was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete operation_setting with id=${id}. Maybe operation_setting was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete operation_setting with id=" + id
      });
    });
};

// Delete all Communities from the database.
exports.deleteAll = (req, res) => {
  operation_setting.destroy({
    where: {},
    truncate: false
  })
    .then(numbers => {
      res.send({ message: `${numbers} Communities were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all communities."
      });
    });
};

// find all published operation_setting
exports.findAllPublished = (req, res) => {
  operation_setting.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving communities."
      });
    });
};