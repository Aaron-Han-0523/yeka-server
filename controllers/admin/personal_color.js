const db = require("../../models");
const PersonalColor = db.personalColor;
const Op = db.Sequelize.Op;

// Create and Save a new PersonalColor
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a PersonalColor
  const personalColor = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save PersonalColor in the database
  PersonalColor.create(personalColor)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the PersonalColor.",
      });
    });
};

// Retrieve all Communities from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  PersonalColor.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving personalColor.",
      });
    });
};

// Find a empty persornal_color
exports.findEmpty = (req, res) => {
  const id = req.params.id;

  return res.render("admin/persornal_color/detail", {
    count: 1,
    data: [],
    product: {},
    id,
  });
};

// Find a single PersonalColor with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PersonalColor.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find PersonalColor with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving PersonalColor with id=" + id,
      });
    });
};

// Update a PersonalColor by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  PersonalColor.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PersonalColor was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update PersonalColor with id=${id}. Maybe PersonalColor was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating PersonalColor with id=" + id,
      });
    });
};

// Delete a PersonalColor with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PersonalColor.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PersonalColor was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete PersonalColor with id=${id}. Maybe PersonalColor was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete PersonalColor with id=" + id,
      });
    });
};

// Delete all Communities from the database.
exports.deleteAll = (req, res) => {
  PersonalColor.destroy({
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

// find all published PersonalColor
exports.findAllPublished = (req, res) => {
  PersonalColor.findAll({ where: { published: true } })
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
