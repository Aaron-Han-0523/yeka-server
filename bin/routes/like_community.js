module.exports = app => {
  const auto = require("../controllers/auto.js");

  var likeCommunityr = require("express").LikeCommunityr();

  // Create a new Auto
  likeCommunityr.post("/", auto.create);

  // Retrieve all Auto
  likeCommunityr.get("/", auto.findAll);

  // Retrieve all published Auto
  likeCommunityr.get("/published", auto.findAllPublished);

  // Retrieve a single Auto with id
  likeCommunityr.get("/:id", auto.findOne);

  // Update a Auto with id
  likeCommunityr.put("/:id", auto.update);

  // Delete a Auto with id
  likeCommunityr.delete("/:id", auto.delete);

  // Delete all Auto
  likeCommunityr.delete("/", auto.deleteAll);

  app.use('/api/auto', likeCommunityr);
};
