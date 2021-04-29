const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
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
        loveGems: {
            type: Number
        },
        experience: {
            type: Number
        },
        level: {
            type: Number
        },
        dailyTimestamp: {
            type: String
        },
        isMuted: {
            type: Boolean
        },
        afk: {
            type: Boolean
        },
        afkMessage: {
            type: String
        },
        gambleAmount: {
            type: Number
        },
        marriageProposals: {
            type: Array
        },
        sentMarriageProposals: {
            type: Array
        },
        marriages: {
            type: Array
        },
        marriageSlots: {
            type: Number
        },
        profileImage: {
            type: String
        },
        cards: {
            type: Array
        },
        profileMessage: {
            type: String
        },
        profileBG: {
            type: String
        }
    }
});

// Encrypt/hash the password before saving to the database
// userSchema.pre('save', async function(next) {
//    try {
//        if (this.method !== 'local') {
//            next();
//        }

//        // Generate a salt
//        const salt = await bcrypt.genSalt(10);

//        // Generate a password hash (salt + hash)
//        const passwordHash = await bcrypt.hash(this.local.password, salt);

//        // Re-assign hashed version over plain text password
//        this.local.password = passwordHash;
//        next();
//    }  catch (e) {
//        next(e);
//    }
// });

// Check if given password is valid against the user's stored hashed password
// userSchema.methods.isValidPassword = async function(password) {
//     try {
//         return await bcrypt.compare(password, this.local.password);
//     } catch (e) {
//         throw new Error(e);
//     }
// };

// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;