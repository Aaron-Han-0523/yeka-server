module.exports = app => {
    const reservation = require("../../controllers/admin/reservation.js");
  
    var router = require("express").Router();
  
    //TODO edit object
    router.post("/", reservation.update);
  
    router.get("/", reservation.findAll); // 컨설턴트 id를 불러옴
  
    // router.get("/add", reservation.findEmpty);
  
    router.post("/add",reservation.create);
  
    router.get("/delete/:id", reservation.delete);
  
    app.use('/admin/reservation', router);
  };
  