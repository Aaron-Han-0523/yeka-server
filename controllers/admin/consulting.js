const db = require("../../models");
const Consulting = db.consulting;
const Op = db.Sequelize.Op;

// Create and Save a new Consulting
exports.create = (req, res) => {
  // Validate request
  if (!req.body.consulting_title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Consulting
  const consulting = {
    id: null,
    consultant_id: req.body.consultant_id,
    client_id: req.body.client_id,
    client_name: req.body.client_name,
    client_image: req.body.client_image,
    payment_date: req.body.payment_date,
    consulting_title: req.body.consulting_title,
    payment_status: req.body.payment_status,
    consulting_status: req.body.consulting_status,
    payment_amount: req.body.payment_amount,
    reservation_amount: req.body.reservation_amount,
    commission: req.body.commission,
    final_amount: req.body.final_amount,
  };

  // Save Consulting in the database
  Consulting.create(consulting)
    .then(data => {
      return res.redirect('/admin/consulting');
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Consulting."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const searchWord = req.query.searchWord;
  var condition = searchWord ? { client_name: { [Op.like]: `%${searchWord}%` } } : null;

  Consulting.findAll({ where: condition })
    .then(data => {
      //      res.send(data);
      return res.render('admin/consulting/index', {
        count: 1,
        data: data,
        consulting: {}
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving consulting."
      });
    });
};

// Find a empty User
exports.findEmpty = (req, res) => {
  const id = req.params.id;

  return res.render('admin/consulting/detail', {
    count: 1,
    data: [],
    consulting: {},
    id,
  });
};

// Find a single Consulting with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Consulting.findByPk(id)
    .then(data => {
      if (data) {
        return res.render('admin/consulting/detail', {
          count: 1,
          data: data,
          consulting: {},
          id,
        });
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
        res.redirect('/admin/consulting/detail/' + id);
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
        res.redirect('/admin/consulting');
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
          err.message || "Some error occurred while removing all Consulting."
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
          err.message || "Some error occurred while retrieving Consulting."
      });
    });
};