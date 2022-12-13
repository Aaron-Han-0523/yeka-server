const db = require("../../models");
const Consulting = db.consulting;
const Op = db.Sequelize.Op;

// Create and Save a new Consulting
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Consulting
  const consulting = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Consulting in the database
  Consulting.create(consulting)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Consulting."
      });
    });
};

// Retrieve all Consulting from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Consulting.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving consulting."
      });
    });
};

// Find a single Consulting with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Consulting.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Consulting with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Consulting with id=" + id
      });
    });
};

// Update a Consulting by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Consulting.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Consulting was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Consulting with id=${id}. Maybe Consulting was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Consulting with id=" + id
      });
    });
};

// Delete a Consulting with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Consulting.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Consulting was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Consulting with id=${id}. Maybe Consulting was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Consulting with id=" + id
      });
    });
};

// Delete all Consulting from the database.
exports.deleteAll = (req, res) => {
  Consulting.destroy({
    where: {},
    truncate: false
  })
    .then(numbers => {
      res.send({ message: `${numbers} Consulting were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all consulting."
      });
    });
};

// find all published Consulting
exports.findAllPublished = (req, res) => {
  Consulting.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving consulting."
      });
    });
};