const db = require("../../models");
const Order = db.order;
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Order
  const order = {
    id: null,
    orderer_name: req.body.orderer_name,
    orderer_phone: req.body.orderer_phone,
    orderer_address1: req.body.orderer_address1,
    orderer_address2: req.body.orderer_address2,
    orderer_address3: req.body.orderer_address3,
    recipient_place: req.body.recipient_place,
    recipient_name: req.body.recipient_name,
    recipient_phone: req.body.recipient_phone,
    recipient_placeaddress1: req.body.recipient_placeaddress1,
    recipient_placeaddress2: req.body.recipient_placeaddress2,
    recipient_placeaddress3: req.body.recipient_placeaddress3,
    image1: req.body.image1,
    title: req.body.title,
    option: req.body.option,
    quantity: req.body.quantity,
    price: req.body.price,
    delivery_fee: req.body.delivery_fee,
  };

  // Save Order in the database
  Order.create(order)
    .then(data => {
      return res.redirect('/admin/order');
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Order.findAll({ where: condition })
    .then(data => {
//      res.send(data);
      return res.render('admin/order/index', {
        count: 1,
        data: data,
        order: {}
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving order."
      });
    });
};

// Find a empty User
exports.findEmpty = (req, res) => {
  const id = req.params.id;

   return res.render('admin/order/detail', {
       count: 1,
       data: {},
       order: {},
       id,
     });
};

// Find a single Order with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
// FE 작업용
return res.render('admin/order/detail', {id:id, data:{}});
  Order.findByPk(id)
    .then(data => {
      if (data) {
        return res.render('admin/order/detail', {
            count: 1,
            data: data,
            order: {},
            id,
          });
      } else {
        res.status(404).send({
          message: `Cannot find Order with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Order with id=" + id
      });
    });
};

// Update a Order by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
          res.redirect('/admin/order/detail/' + id);
      } else {
        res.send({
          message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Order with id=" + id
      });
    });
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.redirect('/admin/order');
      } else {
        res.send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Order with id=" + id
      });
    });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
  Order.destroy({
    where: {},
    truncate: false
  })
    .then(numbers => {
      res.send({ message: `${numbers} Orders were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Orders."
      });
    });
};

// find all published Order
exports.findAllPublished = (req, res) => {
  Order.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orders."
      });
    });
};