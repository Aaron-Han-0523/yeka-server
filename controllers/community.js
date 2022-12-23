const db = require("../models");
const Community = db.community;
const Op = db.Sequelize.Op;

// Create and Save a new Community
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a Community
  const community = {
    community_type: req.body.community_type,
    community_title: req.body.community_title,
    community_content: req.body.community_content,
    community_link: req.body.community_link,
    views: req.body.views,
    writer: req.body.writer,
    create_date: req.body.create_date,
  };

  // Save Community in the database
  Community.create(community)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Community.",
      });
    });
};

// Retrieve all Communities from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Community.findAll({ where: condition, limit: 4, order: [["id", "DESC"]] })
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

// Retrieve all Communities from the database.
exports.findAllNotice = (req, res) => {
  const title = req.query.title;
  const pageNum = req.query.pageNum;
  let offset = 0;

  if (pageNum > 1) {
    offset = 10 * (pageNum - 1);
  }

  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Community.findAndCountAll({
    where: { community_type: 0 },
    offset: offset,
    limit: 10,
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

// Retrieve all Communities from the database.
exports.findAllYoutube = (req, res) => {
  const title = req.query.title;
  const pageNum = req.query.pageNum;
  let offset = 0;

  if (pageNum > 1) {
    offset = 10 * (pageNum - 1);
  }

  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Community.findAndCountAll({
    where: { community_type: 1 },
    offset: offset,
    limit: 10,
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

// Retrieve all Communities from the database.
exports.findYoutubeNews = (req, res) => {
  const title = req.query.title;
  const id = req.params.id;

  var condition = { community_type: { [Op.eq]: 1 }, id: { [Op.lt]: id } };

  Community.findAndCountAll({
    where: condition,
    limit: 4,
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

// Retrieve all Communities from the database.
exports.findAllFreeboard = (req, res) => {
  const title = req.query.title;
  const pageNum = req.query.pageNum;
  let offset = 0;

  if (pageNum > 1) {
    offset = 10 * (pageNum - 1);
  }

  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Community.findAndCountAll({
    where: { community_type: 2 },
    offset: offset,
    limit: 10,
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

// Retrieve all Communities from the database.
exports.findFreeboardNews = (req, res) => {
  const title = req.query.title;
  const id = req.params.id;

  //  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  var condition = { community_type: { [Op.eq]: 2 }, id: { [Op.lt]: id } };

  Community.findAndCountAll({
    where: condition,
    limit: 4,
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

// Find a single Community with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Community.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Community with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Community with id=" + id,
      });
    });
};

// Update a Community by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Community.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Community was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Community with id=${id}. Maybe Community was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Community with id=" + id,
      });
    });
};

// Delete a Community with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Community.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Community was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Community with id=${id}. Maybe Community was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Community with id=" + id,
      });
    });
};

// Delete all Communities from the database.
exports.deleteAll = (req, res) => {
  Community.destroy({
    where: {},
    truncate: false,
  })
    .then((numbers) => {
      res.send({
        message: `${numbers} Communities were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all communities.",
      });
    });
};

// find all published Community
exports.findAllPublished = (req, res) => {
  Community.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving communities.",
      });
    });
};
