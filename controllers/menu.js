const db = require("../models");
const Menu = db.menu;
const Op = db.Sequelize.Op;

// Create and Save a new Menu
exports.create = (req, res) => {
  // Validate request
  console.log("req.body");
  console.log(req.body);

  // Create a Menu
  const menu = {
    consultant_id: req.body.consultant_id,
    menu_title: req.body.menu_title,
    menu_amount: req.body.menu_amount,
    menu_content: req.body.menu_content,
    menu_image: req.body.menu_image,
  };

  // Save Menu in the database
  Menu.create(menu)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Menu.",
      });
    });
};

// Retrieve all Menus from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Menu.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving menu.",
      });
    });
};

// Retrieve all Menus from the database.
exports.findAllConsultant = (req, res) => {
  const consultant_id = req.query.consultant_id;

  var condition = consultant_id
    ? { consultant_id: { [Op.eq]: consultant_id } }
    : null;

  Menu.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving menu.",
      });
    });
};

// Find a single Menu with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Menu.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Menu with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Menu with id=" + id,
      });
    });
};

// Update a Menu by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Menu.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Menu was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Menu with id=${id}. Maybe Menu was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Menu with id=" + id,
      });
    });
};

// Delete a Menu with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Menu.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Menu was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Menu with id=${id}. Maybe Menu was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Menu with id=" + id,
      });
    });
};

// Delete all Menus from the database.
exports.deleteAll = (req, res) => {
  Menu.destroy({
    where: {},
    truncate: false,
  })
    .then((numbers) => {
      res.send({ message: `${numbers} Menus were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all menus.",
      });
    });
};

// find all published Menu
exports.findAllPublished = (req, res) => {
  Menu.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving menus.",
      });
    });
};
