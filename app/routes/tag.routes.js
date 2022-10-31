module.exports = app => {
    const tags = require("../controllers/tag.controller.js");

    var router = require("express").Router();

    // Create a new Tutorials
    router.post("/", tags.create);

    // Retrieve all Tutorials
    router.get("/", tags.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", tags.findOne);

    // Update a Tutorial with id
    router.put("/:id", tags.update);

    // Delete a Tutorial with id
    router.delete("/:id", tags.delete);

    app.use('/api/tags', router);
};