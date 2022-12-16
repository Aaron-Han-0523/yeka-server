const db = require("../../models");
const Option = db.option;
const Op = db.Sequelize.Op;

// Create and Save a new Option
exports.create = (req, res) => {
  // Validate request
  if (!req.body.product_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Option
  const option = {
    id: null,
    product_id: req.body.product_id,
    option_title: req.body.option_title,
    option_content: req.body.option_content,
  };

  // Save Option in the database
  Option.create(option)
    .then(data => {
      return res.redirect('/admin/option');
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Option."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Option.findAll({ where: condition })
    .then(data => {
//      res.send(data);
      return res.render('admin/option/index', {
        count: 1,
        data: data,
        option: {}
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving option."
      });
    });
};

// Find a empty User
exports.findEmpty = (req, res) => {
  const id = req.params.id;

   return res.render('admin/option/detail', {
       count: 1,
       data: [],
       option: {},
       id,
     });
};

// Find a single Option with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
// FE 작업용
return res.render('admin/option/detail', {id:id, data:{}});
  Option.findByPk(id)
    .then(data => {
      if (data) {
        return res.render('admin/option/detail', {
                    count: 1,
                    data: data,
                    user: {},
                    id,
                  });
      } else {
        res.status(404).send({
          message: `Cannot find Option with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Option with id=" + id
      });
    });
};

// Update a Option by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Option.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.redirect('/admin/option/detail/' + id);
      } else {
        res.send({
          message: `Cannot update Option with id=${id}. Maybe Option was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Option with id=" + id
      });
    });
};

// Delete a Option with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Option.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.redirect('/admin/option');
      } else {
        res.send({
          message: `Cannot delete Option with id=${id}. Maybe Option was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Option with id=" + id
      });
    });
};

// Delete all Options from the database.
exports.deleteAll = (req, res) => {
  Option.destroy({
    where: {},
    truncate: false
  })
    .then(numbers => {
      res.send({ message: `${numbers} Options were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all options."
      });
    });
};

// find all published Option
exports.findAllPublished = (req, res) => {
  Option.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving options."
      });
    });
};