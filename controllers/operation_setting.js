const db = require("../models");
const OperationSetting = db.operation_setting;
const Op = db.Sequelize.Op;

// Create and Save a new OperationSetting
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  let week_setting = req.body.week_setting;
  let start_time = req.body.start_time;
  let end_time = req.body.end_time;

  // Create a OperationSetting
  const operation_setting = {
    week_setting: req.body.week_setting,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  };

  // Save OperationSetting in the database
  OperationSetting.create(operation_setting)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the OperationSetting."
      });
    });
};

// Retrieve all Communities from the database.
exports.findAll = (req, res) => {
    OperationSetting.findOne({
      order: [['id', 'desc']],
    }
    )
      .then(data => {
        return res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving OperationSetting."
      });
    });
};

// Find a single OperationSetting with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  const limit = req.params.limit;
  let offset = 0;

  if (pageNum > 1) {
    offset = 10 * (pageNum - 1);
  }

  OperationSetting.findAndCountAll({
    // where: { consultant_id: id },
    offset: offset,
    limit: limit,
    order: [["id", "DESC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving community.",
      });
    });
};

// Update a operation_setting by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  OperationSetting.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "OperationSetting was updated successfully."
        });
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
        res.send({
          message: "OperationSetting was deleted successfully!"
        });
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

// Delete all Communities from the database.
exports.deleteAll = (req, res) => {
  OperationSetting.destroy({
    where: {},
    truncate: false
  })
    .then(numbers => {
      res.send({ message: `${numbers} Communities were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all communities."
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
          err.message || "Some error occurred while retrieving communities."
      });
    });
};