const mongoose   = require("mongoose");

const TodoSchema = mongoose.Schema({
    todo: String,
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Todo", TodoSchema);