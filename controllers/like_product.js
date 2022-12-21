const db = require("../models");
const LikeProduct = db.like_product;
const Op = db.Sequelize.Op;

// Create and Save a new LikeProduct
exports.create = (req, res) => {
  console.log(req);
  console.log(req.query);
  console.log(req.params);
  console.log(req.body);
  console.log(req.query.product_id);
  console.log(req.params.product_id);
  console.log(req.body.product_id);

  // Validate request
  if (!req.body.user_id || !req.body.product_id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a LikeProduct
  const likeProduct = {
    user_id: req.body.user_id,
    product_id: req.body.product_id,
  };

  // Save LikeProduct in the database
  LikeProduct.create(likeProduct)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the LikeProduct.",
      });
    });
};

// Retrieve all Communities from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  LikeProduct.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving likeProduct.",
      });
    });
};

// Find a single LikeProduct with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  LikeProduct.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find LikeProduct with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving LikeProduct with id=" + id,
      });
    });
};

// Update a LikeProduct by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  LikeProduct.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "LikeProduct was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update LikeProduct with id=${id}. Maybe LikeProduct was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating LikeProduct with id=" + id,
      });
    });
};

// Delete a LikeProduct with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  const user_id = req.query.user_id;
  const product_id = req.query.product_id;

  LikeProduct.destroy({
    where: { user_id: user_id, product_id: product_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "LikeProduct was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete LikeProduct with id=${id}. Maybe LikeProduct was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete LikeProduct with id=" + id,
      });
    });
};

// Delete all Communities from the database.
exports.deleteAll = (req, res) => {
  LikeProduct.destroy({
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

// find all published LikeProduct
exports.findAllPublished = (req, res) => {
  LikeProduct.findAll({ where: { published: true } })
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
