const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const guildSchema = new Schema({
    method: {
        type: String,
        enum: ['local'],
        required: true
    },
    local: {
        discord_id: {
            type: String
        },
        name: {
            type: String
        },
        prefix: {
            type: String
        },
        modlog: {
            type: Boolean
        },
        modLogChannel: {
            type: String
        },
        modRole: {
            type: String
        },
        adminRole: {
            type: String
        },
        systemNotice: {
            type: Boolean
        },
        welcomeChannel: {
            type: String
        },
        welcomeMessage: {
            type: String
        },
        welcomeEnabled: {
            type: Boolean
        },
        leaveChannel: {
            type: String
        },
        leaveMessage: {
            type: String
        },
        leaveEnabled: {
            type: Boolean
        },
        numberOfWarnings: {
            type: Number
        },
        warningsBan: {
            type: Number
        },
        warningsMute: {
            type: Number
        },
        levelEnabled: {
            type: Boolean
        },
        warnings: {
            type: Object
        },
        greetingImage: {
            type: String
        }
    }
});

// Create a model
const Guild = mongoose.model('guild', guildSchema);

// Export the model
module.exports = Guild;