const db = require("../models");
const Config = db.config;
const Op = db.Sequelize.Op;

// Create and Save a new Config
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

  console.log(week_setting, start_time, end_time);
  // Create a Config
  const config = {
    week_setting: req.body.week_setting,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  };

  // Save Config in the database
  Config.create(config)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Config."
      });
    });
};

// Retrieve all Communities from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  db.user.findAll({ where: {user_type: 1} })
    .then(data => {
      return res.render('admin/config/index', {
        count: 1,
        data: data,
        image: {}
    })
  })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving config."
      });
    });
};

// Find a single Config with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  const limit = req.params.limit;
  let offset = 0;

  if (pageNum > 1) {
    offset = 10 * (pageNum - 1);
  }

  Config.findAndCountAll({
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

// Update a Config by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Config.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Config was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Config with id=${id}. Maybe Config was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Config with id=" + id
      });
    });
};

// Delete a Config with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Config.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Config was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Config with id=${id}. Maybe Config was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Config with id=" + id
      });
    });
};

// Delete all Communities from the database.
exports.deleteAll = (req, res) => {
  Config.destroy({
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

// find all published Config
exports.findAllPublished = (req, res) => {
  Config.findAll({ where: { published: true } })
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