const db = require("../../models");
const Config = db.config;
const Op = db.Sequelize.Op;

// Create and Save a new Config
exports.create = (req, res) => {
  // Validate request
  if (!req.body.start_time) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Config
  const config = {
    id: null,
    week_setting: req.body.week_setting,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  };

  console.log("=====");
  console.log(config);

  // Save Config in the database
  Config.create(config)
    .then(data => {
      return res.redirect('/admin/config');
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Config."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

  Config.findAll()
    .then(data => {
      return res.render('admin/config/index', {
        data: data
    })
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving config."
      });
    });
};

// Find a empty User
exports.findEmpty = (req, res) => {
  const id = req.params.id;

   return res.render('admin/config/detail', {
       count: 1,
       data: [],
       config: {},
       id,
     });
};

// Find a single Config with an id
exports.findOne = (req, res) => {
  // const id = req.params.id;
  
  Config.findOne()
    .then(data => {
        return res.render('admin/config/detail', {
                    count: 1,
                    data: data,
                    config: {},
    });
      })
      
    
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Config with id=" + id
      });
    });
};

// Update a Config by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Config.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1 || num == 0) {
        res.redirect('/admin/config/detail/' + id);
      } else {
        res.send({
          message: `Cannot update Config with id=${id}. Maybe Config was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Config with id=" + id
      });
    });
};

// Delete a Config with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Config.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.redirect('/admin/config');
      } else {
        res.send({
          message: `Cannot delete Config with id=${id}. Maybe Config was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Config with id=" + id
      });
    });
};

// Delete all Configs from the database.
exports.deleteAll = (req, res) => {
  Config.destroy({
    where: {},
    truncate: false
  })
    .then(numbers => {
      res.send({ message: `${numbers} Configs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all configs."
      });
    });
};

// find all published Config
exports.findAllPublished = (req, res) => {
  Config.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Configs."
      });
    });
};