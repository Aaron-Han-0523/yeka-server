const db = require("../../models");
const Menu = db.menu;
const Op = db.Sequelize.Op;

// Create and Save a new Menu
exports.create = (req, res) => {
  // Validate request
  if (!req.body.menu_title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Menu
  const menu = {
    id: null,
    consultant_id: req.body.consultant_id,
    menu_title: req.body.menu_title,
    menu_amount: req.body.menu_amount,
    menu_content: req.body.menu_content,
    menu_image: req.body.menu_image,
  };

  // Save Menu in the database
  Menu.create(menu)
    .then(data => {
      return res.redirect('/admin/menu');
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Menu."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.searchWord;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Menu.findAll({ where: condition })
    .then(data => {
//      res.send(data);
      return res.render('admin/menu/index', {
        count: 1,
        data: data,
        menu: {}
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving menu."
      });
    });
};

// Find a empty User
exports.findEmpty = (req, res) => {
  const id = req.params.id;

   return res.render('admin/menu/detail', {
       count: 1,
       data: [],
       menu: {},
       id,
     });
};

// Find a single Menu with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  
  Menu.findByPk(id)
    .then(data => {
      if (data) {
        return res.render('admin/menu/detail', {
                    count: 1,
                    data: data,
                    menu: {},
                    id,
                  });
      } else {
        res.status(404).send({
          message: `Cannot find Menu with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Menu with id=" + id
      });
    });
};

// Update a Menu by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Menu.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1 || num == 0) {
        res.redirect('/admin/menu/detail/' + id);
      } else {
        res.send({
          message: `Cannot update Menu with id=${id}. Maybe Menu was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Menu with id=" + id
      });
    });
};

// Delete a Menu with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Menu.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.redirect('/admin/menu');
      } else {
        res.send({
          message: `Cannot delete Menu with id=${id}. Maybe Menu was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Menu with id=" + id
      });
    });
};

// Delete all Menus from the database.
exports.deleteAll = (req, res) => {
  Menu.destroy({
    where: {},
    truncate: false
  })
    .then(numbers => {
      res.send({ message: `${numbers} Menus were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all menus."
      });
    });
};

// find all published Menu
exports.findAllPublished = (req, res) => {
  Menu.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving menus."
      });
    });
};