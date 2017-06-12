var express = require("express"),
    router  = express.Router(),
    Todo    = require("../model/todo.js");

router.get("/todos", function(req, res) {
    Todo.find(function (err, todos) {
        if (err) return err;
        res.json(todos);
    });
});
router.post("/todo", function(req, res) {
    Todo.create(req.body, function (err, todo) {
        if (err) return err;
        res.json(todo);
    });
});
router.get("/todo/:id", function(req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (err) return err;
        res.json(todo);
    });
});
router.put("/todo/:id", function(req, res) {
    Todo.findByIdAndUpdate(req.params.id, req.body, function (err, todo) {
        if (err) return err;
        res.json(todo);
    });
});
router.delete("/todo/:id", function(req, res) {
    Todo.findByIdAndRemove(req.params.id, req.body, function (err) {
        if (err) return err;
        res.json({status: "deleted"});
    });
});

router.delete("/todos", function(req, res) {
    Todo.find().where({ active: false }).remove((err) => {
        if (err) return err;
        res.json({status: "All deleted"});
    }).exec();
});

module.exports = router;