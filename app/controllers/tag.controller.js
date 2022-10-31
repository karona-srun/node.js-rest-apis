const db = require("../models");
const Tutorial = db.tutorials;
const Tag = db.tags;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "name can not be empty!"
        });
        return;
    }
    // Create a Tutorial
    const tag = {
        name: req.body.name
    };

    // Save Tutorial in the database
    Tag.create(tag)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tag."
            });
        });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Tag.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tag.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Tag with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tag with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tag.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tag was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tag with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tag.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tag was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tag with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

// Add a Tutorial to a Tag
exports.addTutorial = (tagId, tutorialId) => {
    return Tag.findByPk(tagId)
        .then((tag) => {
            if (!tag) {
                console.log("Tag not found!");
                return null;
            }
            return Tutorial.findByPk(tutorialId).then((tutorial) => {
                if (!tutorial) {
                    console.log("Tutorial not found!");
                    return null;
                }

                tag.addTutorial(tutorial);
                console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
                return tag;
            });
        })
        .catch((err) => {
            console.log(">> Error while adding Tutorial to Tag: ", err);
        });
};