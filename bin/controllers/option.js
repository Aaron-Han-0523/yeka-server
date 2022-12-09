const db = require("../models");
const Auto = db.auto;
const Op = db.Sequelize.Op;

// Create and Save a new Auto
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Auto
  const auto = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Auto in the database
  Auto.create(auto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Auto."
      });
    });
};

// Retrieve all Communities from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Auto.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving auto."
      });
    });
};

// Find a single Auto with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Auto.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Auto with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Auto with id=" + id
      });
    });
};

// Update a Auto by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Auto.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Auto was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Auto with id=${id}. Maybe Auto was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Auto with id=" + id
      });
    });
};

// Delete a Auto with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Auto.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Auto was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Auto with id=${id}. Maybe Auto was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Auto with id=" + id
      });
    });
};

// Delete all Communities from the database.
exports.deleteAll = (req, res) => {
  Auto.destroy({
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

// find all published Auto
exports.findAllPublished = (req, res) => {
  Auto.findAll({ where: { published: true } })
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