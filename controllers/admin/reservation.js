const db = require("../../models");
const Reservation = db.reservation;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Reservation
exports.create = (req, res) => {
  console.log("???", req.body);

  // TIME
  let timeList = req.body.timeList;
  let time;
  let setTime = [];
    // 
    for (var i = 0; i <= timeList.length; i++) {
      if (timeList[i] == true && i < 3) {
        time = "0" + (i+7) + ":00:00";
        setTime.push(time);
      } else if (timeList[i] == true && i > 2) {
        time = (i+7) + ":00:00";
        setTime.push(time);
      }
    }
  console.log("setTime : ", setTime);

  // CONSULTANT ID
  let consultantIdList = [];
  let tempList = req.body.consultantIdList.split(",");
  
  tempList.forEach( (el) => consultantIdList.push(el));
  console.log("consultantIdList : ", consultantIdList);

  // DATE + TIME
  let setDateTime = [];
  let operationDate = req.body.operationDate;
    for(let i = 0; i < operationDate.length; i++) {
        for(let j = 0; j < setTime.length; j++) {
            setDateTime.push(operationDate[i] + " " + setTime[j]);
            // console.log(operationDate[i] + setTime[j]);
        }
    }
    console.log("setDateTime : ", setDateTime);
  

  //

  // Create a Reservation
  const reservation = {
    id: null,
    consulting_id: req.body.consulting_id,
    reservation_date: req.body.reservation_date,
    state: req.body.state,
  };

  // Save Reservation in the database
  Reservation.create(reservation)
    .then((data) => {
      return res.redirect("/admin/reservation");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Reservation.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

  let condition = { "user_type": 1 };

  User.findAll({ where: condition })
    .then(data => {
      return res.render('admin/reservation', {
        count: 1,
        data: data,
        user: {}
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    });
};

// Find a empty User
// exports.findEmpty = (req, res) => {
//   const id = req.params.id;
//   const product_id = req.query.product_id;

//   return res.render('admin/reservation/detail', {
//     count: 1,
//     data: { product_id: product_id },
//     Reservation: {},
//     id,
//   });
// };

// Update a Reservation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Reservation.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1 || num == 0) {
        res.redirect("/admin/reservation/detail/" + id);
      } else {
        res.send({
          message: `Cannot update Reservation with id=${id}. Maybe Reservation was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Reservation with id=" + id,
      });
    });
};

// Delete a Reservation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Reservation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.redirect("/admin/reservation");
      } else {
        res.send({
          message: `Cannot delete Reservation with id=${id}. Maybe Reservation was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Reservation with id=" + id,
      });
    });
};

// Delete all Reservation from the database.
exports.deleteAll = (req, res) => {
  Reservation.destroy({
    where: {},
    truncate: false,
  })
    .then((numbers) => {
      res.send({
        message: `${numbers} Reservation were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Reservation.",
      });
    });
};

// find all published Reservation
exports.findAllPublished = (req, res) => {
  Reservation.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Reservation.",
      });
    });
};
