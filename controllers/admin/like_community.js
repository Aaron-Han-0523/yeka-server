const db = require("../../models");
const Like_community = db.like_community;
const Op = db.Sequelize.Op;

// Create and Save a new Like_community
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Like_community
  const like_community = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Like_community in the database
  Like_community.create(like_community)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Like_community."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Like_community.findAll({ where: condition })
    .then(data => {
//      res.send(data);
      return res.render('admin/like_community/index', {
        count: 1,
        data: data,
        like_community: {}
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving like_community."
      });
    });
};

// Find a empty User
exports.findEmpty = (req, res) => {
  const id = req.params.id;

   return res.render('admin/like_community/detail', {
       count: 1,
       data: [],
       like_community: {}
     });
};

// Find a single Like_community with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Like_community.findByPk(id)
    .then(data => {
      if (data) {
        return res.render('admin/like_community/detail', {
                    count: 1,
                    data: data,
                    like_community: {}
                  });
      } else {
        res.status(404).send({
          message: `Cannot find Like_community with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Like_community with id=" + id
      });
    });
};

// Update a Like_community by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Like_community.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Like_community was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Like_community with id=${id}. Maybe Like_community was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Like_community with id=" + id
      });
    });
};

// Delete a Like_community with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Like_community.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Like_community was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Like_community with id=${id}. Maybe Like_community was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Like_community with id=" + id
      });
    });
};

// Delete all Like_communitys from the database.
exports.deleteAll = (req, res) => {
  Like_community.destroy({
    where: {},
    truncate: false
  })
    .then(numbers => {
      res.send({ message: `${numbers} Like_communitys were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all like_communitys."
      });
    });
};

// find all published Like_community
exports.findAllPublished = (req, res) => {
  Like_community.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving like_communitys."
      });
    });
};