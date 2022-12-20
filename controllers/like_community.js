const db = require("../models");
const LikeCommunity = db.likeCommunity;
const Op = db.Sequelize.Op;

// Create and Save a new LikeCommunity
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a LikeCommunity
  const likeCommunity = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save LikeCommunity in the database
  LikeCommunity.create(likeCommunity)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the LikeCommunity.",
      });
    });
};

// Retrieve all Communities from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  LikeCommunity.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving likeCommunity.",
      });
    });
};

// Find a single LikeCommunity with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  LikeCommunity.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find LikeCommunity with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving LikeCommunity with id=" + id,
      });
    });
};

// Update a LikeCommunity by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  LikeCommunity.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "LikeCommunity was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update LikeCommunity with id=${id}. Maybe LikeCommunity was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating LikeCommunity with id=" + id,
      });
    });
};

// Delete a LikeCommunity with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  LikeCommunity.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "LikeCommunity was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete LikeCommunity with id=${id}. Maybe LikeCommunity was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete LikeCommunity with id=" + id,
      });
    });
};

// Delete all Communities from the database.
exports.deleteAll = (req, res) => {
  LikeCommunity.destroy({
    where: {},
    truncate: false,
  })
    .then((numbers) => {
      res.send({
        message: `${numbers} Communities were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all communities.",
      });
    });
};

// find all published LikeCommunity
exports.findAllPublished = (req, res) => {
  LikeCommunity.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving communities.",
      });
    });
};
