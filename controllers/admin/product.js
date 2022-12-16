const db = require("../../models");
const Product = db.product;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Product
  const product = {
    id: null,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    delivery_fee: req.body.delivery_fee,
    tag: req.body.tag,
  };

  // Save Product in the database
  Product.create(product)
    .then(data => {
      return res.redirect('/admin/product');
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Product.findAll({ where: condition })
    .then(data => {
//      res.send(data);
      return res.render('admin/product/index', {
        count: 1,
        data: data,
        product: {}
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving product."
      });
    });
};

// Find a empty User
exports.findEmpty = (req, res) => {
  const id = req.params.id;

   return res.render('admin/product/detail', {
       count: 1,
       data: [],
       product: {},
       id,
     });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
// FE 작업용
return res.render('admin/product/detail', {id:id, data:{}});
  Product.findByPk(id)
    .then(data => {
      if (data) {
        return res.render('admin/product/detail', {
                    count: 1,
                    data: data,
                    user: {},
                    id,
                  });
      } else {
        res.status(404).send({
          message: `Cannot find Product with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.redirect('/admin/product/detail/' + id);
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.redirect('/admin/product');
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false
  })
    .then(numbers => {
      res.send({ message: `${numbers} Products were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    });
};

// find all published Product
exports.findAllPublished = (req, res) => {
  Product.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};