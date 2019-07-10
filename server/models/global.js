const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const globalSchema = new Schema({
    type: {
        type: String
    },
    totalRips: {
        type: Number
    },
    todaysRips: {
        type: Number
    },
    ripDateTime: {
        type: String
    }
});

// Create a model
const Global = mongoose.model('global', globalSchema);

// Export the model
module.exports = Global;