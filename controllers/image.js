const db = require("../models");
const Image = db.image;
const Op = db.Sequelize.Op;

// Create and Save a new Image
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a Image
  const image = {
    product_id: req.body.product_id,
    community_id: req.body.community_id,
    user_id: req.body.user_id,
    consultant_id: req.body.consultant_id,
    create_date: req.body.create_date,
    path: req.file.path,
    image_type: req.body.image_type,
    title: req.body.title,
    content: req.body.content,
  };

  // Save Image in the database
  Image.create(image)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Image.",
      });
    });
};

// Retrieve all Images from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Image.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving image.",
      });
    });
};

// Retrieve all Images from the database.
exports.findAllCommunityId = (req, res) => {
  const community_id = req.params.community_id;
  var condition = community_id
    ? { community_id: { [Op.eq]: community_id } }
    : null;

  Image.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving image.",
      });
    });
};

// Retrieve all Images from the database.
exports.findAllConsultantId = (req, res) => {
  const consultant_id = req.params.consultant_id;
  var condition = consultant_id
    ? { consultant_id: { [Op.eq]: consultant_id } }
    : null;

  Image.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving image.",
      });
    });
};

// Retrieve all Images from the database.
exports.findAllProductId = (req, res) => {
  const product_id = req.params.product_id;
  var condition = product_id ? { product_id: { [Op.eq]: product_id } } : null;

  Image.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving image.",
      });
    });
};

// Find a single Image with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Image.findOne({ where: { user_id: id } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Image with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Image with id=" + id,
      });
    });
};

// Find a single User Image with an id, an image_type
exports.findOneUser = (req, res) => {
  const id = req.params.id;
  const image_type = req.params.image_type;

  Image.findOne({ where: {[Op.and]:[ { user_id: id }, { image_type: image_type} ]} })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Image with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Image with id=" + id,
      });
    });
};

// Update a Image by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Image.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Image was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Image with id=${id}. Maybe Image was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Image with id=" + id,
      });
    });
};

// Delete a Image with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Image.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Image was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Image with id=${id}. Maybe Image was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Image with id=" + id,
      });
    });
};

// Delete all Images from the database.
exports.deleteAll = (req, res) => {
  Image.destroy({
    where: {},
    truncate: false,
  })
    .then((numbers) => {
      res.send({ message: `${numbers} Images were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all images.",
      });
    });
};

// find all published Image
exports.findAllPublished = (req, res) => {
  Image.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving images.",
      });
    });
};
