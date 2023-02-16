const db = require("../../models");
const OperationSetting = db.operation_setting;
const Op = db.Sequelize.Op;

// Create and Save a new OperationSetting
exports.create = (req, res) => {
  // Validate request
  if (!req.body.start_time) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a OperationSetting
  const operation_setting = {
    id: null,
    week_setting: req.body.week_setting,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  };

  // Save operation_setting in the database
  OperationSetting.create(operation_setting)
    .then(data => {
      return res.redirect('/admin/operation_setting');
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the OperationSetting."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

  OperationSetting.findAll()
    .then(data => {
      return res.render('admin/operation_setting/index', {
        data: data
    })
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving operation_setting."
      });
    });
};

// Find a empty User
exports.findEmpty = (req, res) => {
  const id = req.params.id;

   return res.render('admin/operation_setting/detail', {
       count: 1,
       data: [],
       operation_setting: {},
       id,
     });
};

// Find a single OperationSetting with an id
exports.findOne = (req, res) => {
  // const id = req.params.id;
  
  OperationSetting.findOne()
    .then(data => {
        return res.render('admin/operation_setting/detail', {
                    count: 1,
                    data: data,
                    operation_setting: {},
    });
      })
      
    
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving OperationSetting with id=" + id
      });
    });
};

// Update a OperationSetting by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  OperationSetting.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1 || num == 0) {
        res.redirect('/admin/operation_setting/detail/' + id);
      } else {
        res.send({
          message: `Cannot update OperationSetting with id=${id}. Maybe OperationSetting was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating OperationSetting with id=" + id
      });
    });
};

// Delete a OperationSetting with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  OperationSetting.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.redirect('/admin/operation_setting');
      } else {
        res.send({
          message: `Cannot delete OperationSetting with id=${id}. Maybe OperationSetting was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete OperationSetting with id=" + id
      });
    });
};

// Delete all OperationSettings from the database.
exports.deleteAll = (req, res) => {
  OperationSetting.destroy({
    where: {},
    truncate: false
  })
    .then(numbers => {
      res.send({ message: `${numbers} OperationSettings were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all operation_settings."
      });
    });
};

// find all published OperationSetting
exports.findAllPublished = (req, res) => {
  OperationSetting.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving OperationSettings."
      });
    });
};