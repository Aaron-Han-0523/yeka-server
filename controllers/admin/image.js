const db = require("../../models");
const Image = db.image;
const Op = db.Sequelize.Op;

// Create and Save a new Image
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Image
  const image = {
    id: null,
    image_type: req.body.image_type,
    product_id: req.body.product_id,
    consultant_id: req.body.consultant_id,
    community_id: req.body.community_id,
    title: req.body.title,
    content: req.body.content,
  };

  // Save Image in the database
  Image.create(image)
    .then(data => {
      return res.redirect('/admin/image');
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Image."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Image.findAll({ where: condition })
    .then(data => {
//      res.send(data);
      return res.render('admin/image/index', {
        count: 1,
        data: data,
        image: {}
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving image."
      });
    });
};

// Find a empty User
exports.findEmpty = (req, res) => {
  const id = req.params.id;

   return res.render('admin/image/detail', {
       count: 1,
       data: [],
       image: {},
       id,
     });
};

// Find a single Image with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Image.findByPk(id)
    .then(data => {
      if (data) {
        return res.render('admin/image/detail', {
                    count: 1,
                    data: data,
                    image: {},
                    id
                  });
      } else {
        res.status(404).send({
          message: `Cannot find Image with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Image with id=" + id
      });
    });
};

// Update a Image by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Image.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.redirect('/admin/image/detail/' + id);
      } else {
        res.send({
          message: `Cannot update Image with id=${id}. Maybe Image was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Image with id=" + id
      });
    });
};

// Delete a Image with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Image.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.redirect('/admin/image');
      } else {
        res.send({
          message: `Cannot delete Image with id=${id}. Maybe Image was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Image with id=" + id
      });
    });
};

// Delete all Images from the database.
exports.deleteAll = (req, res) => {
  Image.destroy({
    where: {},
    truncate: false
  })
    .then(numbers => {
      res.send({ message: `${numbers} Images were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Images."
      });
    });
};

// find all published Image
exports.findAllPublished = (req, res) => {
  Image.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving images."
      });
    });
};