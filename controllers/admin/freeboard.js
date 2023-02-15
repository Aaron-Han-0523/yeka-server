const db = require("../../models");
const Community = db.community;
const Op = db.Sequelize.Op;
const QueryTypes = db.Sequelize.QueryTypes;
const sequelize = db.sequelize;

// Create and Save a new Community
exports.create = (req, res) => {
  // Validate request
  if (!req.body.community_type) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Community
  const community = {
    id: null,
    community_type: req.body.community_type,
    community_title: req.body.community_title,
    community_content: req.body.community_content,
    community_link: req.body.community_link,
    writer: req.body.writer,
  };

  // Save Community in the database
  Community.create(community)
    .then(data => {
      return res.redirect('/admin/freeboard');
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Community."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const searchWord = req.query.searchWord;
  let condition = { "community_type": 2 }
  if (searchWord) {
    condition[Op.or] = [
      { community_title: { [Op.like]: `%${searchWord}%` } },
      { community_content: { [Op.like]: `%${searchWord}%` } }
    ]
  }

  // "community_type": 0 (공지사항)
  // "community_type": 1 (유튜브)
  // "community_type": 2 (자유게시판)
  Community.findAll({ where: condition })
    .then(data => {
      //      res.send(data);
      return res.render('admin/freeboard/index', {
        count: 1,
        data: data,
        community: {}
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Community."
      });
    });
};

// Find a empty User
exports.findEmpty = (req, res) => {
  const id = req.params.id;

  return res.render('admin/freeboard/detail', {
    count: 1,
    data: [],
    community: {},
    id
  });
};

// Find a single Community with an id
exports.findOne = (req, res) => {
  // User.findByPk(id)
  //   .then(data => {
  //     if (data) {
  //       const menu = db.menu.findAll({ where: { consultant_id: id } });
  //       const portfolio = db.image.findAll({ where: { image_type: 3, consultant_id: id } });
  //       const total_sales_amount = db.consulting.sum("final_amount", { where: { consultant_id: id } });

  //       Promise.all([menu, portfolio, total_sales_amount]).then(([menu, portfolio, total_sales_amount]) => {
  //         data.total_sales_amount = total_sales_amount;
  //         return res.render('admin/consultant/detail', {
  //           data: data,
  //           portfolio: portfolio || [],
  //           menu: menu || [],
  //           id: id,
  //         });
  //       })
  const id = req.params.id;

  sequelize.query(
    "select * from yeka.community a left join yeka.image b on a.id = b.community_id where a.id = "
    + 
    id,
    { type: QueryTypes.SELECT}
  )
    .then(data => {
      console.log
      if (data) {
        console.log(data)
        return res.render('admin/freeboard/detail', {
          count: 1,
          data: data[0],
          community: {},
          id
        });
      } else {
        res.status(404).send({
          message: `Cannot find Community with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Community with id=" + id
      });
    });
};

// Update a Community by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Community.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1 || num == 0) {
        res.redirect('/admin/freeboard/detail/' + id);
      } else {
        res.send({
          message: `Cannot update Community with id=${id}. Maybe Community was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Community with id=" + id
      });
    });
};

// Delete a Community with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Community.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.redirect('/admin/freeboard');
      } else {
        res.send({
          message: `Cannot delete Community with id=${id}. Maybe Community was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Community with id=" + id
      });
    });
};

// Delete all Community from the database.
exports.deleteAll = (req, res) => {
  Community.destroy({
    where: {},
    truncate: false
  })
    .then(numbers => {
      res.send({ message: `${numbers} Community were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Community."
      });
    });
};

// find all published Community
exports.findAllPublished = (req, res) => {
  Community.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Community."
      });
    });
};