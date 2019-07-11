const User = require('../models/user');
const moment = require('moment');

createUser = async user => {
    // Create a new user
    const newUser = new User({
        method: 'local',
        local: {
            discord_id: user.discord_id,
            name: user.name,
            loveGems: 0,
            experience: 0,
            level: 1,
            dailyTimestamp: null,
            isMuted: false,
            afk: false,
            afkMessage: 'I am AFK right now',
            gambleAmount: 0,
            marriageProposals: [],
            sentMarriageProposals: [],
            marriages: [],
            marriageSlots: 5,
            profileImage: 'https://cdn.discordapp.com/attachments/506868612347199508/595431597914849309/Wallpaper.jpg',
            cards: [],
            profileMessage: '#1 idol in the universe!',
            profileBG: ''
        }
    });
    await newUser.save();
    return newUser;
}

module.exports = {
    profile: async(req, res, next) => {
        const { user } = req.value.body;

        res.status(200).json({ user });
    },
    setProfileImage: async(req, res, next) => {
        const { discord_id, imageUrl } = req.value.body;

        User.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.profileImage': imageUrl }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ message: e.message })

                return res.status(200).json({ message: 'Profile image updated!' });
            }
        );
    },
    gainXP: async(req, res, next) => {
        const { discord_id, user, name } = req.value.body;
        // console.log('[users.js] NAME\n', name);

        const xpToAdd = Math.floor(Math.random() * 2) + 1;
        const curXP = user.experience;
        const curLvl = user.level;
        let newLvl = user.level
        const nxtLvl = curLvl * 600;
        const newXP = curXP + xpToAdd;

        if (newXP >= nxtLvl) {
            newLvl++;
        }
        

        User.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.experience': newXP, 'local.level': newLvl}},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ message: e.message })

                return res.status(200).json({ message: `Experience has been increased!`, previousLevel: curLvl, newLevel: newLvl });
            }
        );
    },
    setAFK: async(req, res, next) => {
        const { discord_id, afk_value } = req.value.body;

        User.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {'local.afk': afk_value},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ message: e.message });

                return res.status(200).json({ message: `AFK has been updated.` });
            }
        )
    },
    setAFKMessage: async(req, res, next) => {
        const { discord_id, afkMessage } = req.value.body;

        User.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {'local.afk': true, 'local.afkMessage': afkMessage},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ message: e.message });

                return res.status(200).json({ message: `AFK has been updated.` });
            }
        )
    },
    daily: async (req, res, next) => {
        const { discord_id, user } = req.value.body;

        // Get the user's love gems
        let loveGems = user.loveGems;

        // Define the current day in UTC format
        let m = moment().utc();

        // Define the difference for comparing the current and user's last daily date
        let diff = 0;

        // Get the last daily date from the user
        let dailyTimestamp = user.dailyTimestamp;

        // Get the difference
        const dff = moment(dailyTimestamp).utc();

        // If the user is not using the command for the first time, set the difference for comparison
        if (dailyTimestamp != null) {
            diff = m.diff(dff, "hours");
        }

        // Compare the dates and add the love gems, if already claimed, return message stating user has already claimed
        // If the user is using the command for the first time or 24 hours have passed since their last time using the
        // command
        if (dailyTimestamp === null || diff >= 24) {
            dailyTimestamp = m;
            loveGems += 200;
            User.findOneAndUpdate(
                { 'local.discord_id': discord_id },
                { 'local.loveGems': loveGems, 'local.dailyTimestamp': dailyTimestamp },
                {},
                function(e, object) {
                    if (e) return res.status(500).json({ message: `[${moment().utc()}] Daily | ${e.message}` });

                    return res.status(200).json({ message: `:white_check_mark: You received 200 Love Gems! You now have \`${loveGems}\` Love Gems.` });
                }
            );
        } else {
            return res.status(200).json({ message: `:negative_squared_cross_mark: You have already received your daily Love Gems!` });
        }
    },
    sendLoveGems: async (req, res, next) => {
        const { discord_id, user, mentioned_id, sendAmount, mentioned_name } = req.value.body;

        // Gather the mentioned user from the database
        let foundUser = await User.findOne({ "local.discord_id": mentioned_id });

        // If no user, return error
        if (!foundUser) {
            return res.status(200).json({ message: `:negative_squared_cross_mark: Mentioned user does not exist.` });
        }

        // Set love gems
        let mentionedLoveGems = Number(foundUser.local.loveGems);
        let userLoveGems = Number(user.loveGems);

        // If the current sender does not have the right amount to send, return error
        if (user.loveGems < sendAmount) {
            return res.status(200).json({ message: `:negative_squared_cross_mark: You do not have enought Love Gems.` });
        }

        // Change amounts
        mentionedLoveGems += Number(sendAmount);
        userLoveGems -= Number(sendAmount);

        // Should never get below 0, but in case of some margin of error, set to 0
        if (userLoveGems <= 0) {
            userLoveGems = 0;
        }

        // Update the database
        User.findOneAndUpdate(
            { 'local.discord_id': discord_id },
            { 'local.loveGems': userLoveGems },
            {},
            function(e, object) {
                if (e) return res.status(500).json({ message: `[${moment().utc()}] Daily | ${e.message}` });
                // Update the mentioned user's love gems
                User.findOneAndUpdate(
                    { 'local.discord_id': mentioned_id },
                    { 'local.loveGems': mentionedLoveGems },
                    {},
                    function(e, object) {
                        if (e) return res.status(500).json({ message: `[${moment().utc()}] Daily | ${e.message}` });

                        return res.status(200).json({ message: `:white_check_mark: You sent 200 Love Gems to **${mentioned_name}**! You now have \`${userLoveGems}\` Love Gems.` });
                    }
                );
            }
        );
    },
    marry: async (req, res, next) => {
        const { discord_id, user, name, mentioned_id, mentioned_name } = req.value.body;

        // Gather the mentioned user from the database
        let foundUser = await User.findOne({ "local.discord_id": mentioned_id });

        // If no user, return error
        if (!foundUser) {
            return res.status(200).json({ message: `:negative_squared_cross_mark: Mentioned user does not exist.` });
        }

        let isMarried = false;

        // Checks to see if user id is in the author's marriages and sets isMarried appropriately
        user.marriages.forEach(usr => {
            if (usr === mentioned_id) return (isMarried = true);
        });

        // If the two users are already married, return error
        if (isMarried) {
            return res.status(200).json({ message: `:negative_squared_cross_mark: You are already married to this user` });
        }

        // If the user's aren't married and the user has available marriage slots, send proposals,
        // return error if no available marriage slots
        if (user.marriages.length <= user.marriageSlots - 1) {
            // Point proposals to new arrays
            let authorSentProposals = user.sentMarriageProposals;
            let userProposals = foundUser.local.marriageProposals;

            if (authorSentProposals.includes(mentioned_id)) {
                return res.status(200).json({ message: 'You have already sent a proposal to this user~' });
            }

            if (userProposals.includes(discord_id)) {
                return res.status(200).json({ message: 'You have already been proposed by this user~' });
            }

            // Set the new proposals
            authorSentProposals.push(mentioned_id);
            userProposals.push(discord_id);

            console.log(authorSentProposals);
            console.log(userProposals);

            // Update the database
            User.findOneAndUpdate(
                { 'local.discord_id': discord_id },
                { 'local.sentMarriageProposals': authorSentProposals },
                {},
                function(e, object) {
                    if (e) return res.status(500).json({ message: `[${moment().utc()}] Daily | ${e.message}` });

                    User.findOneAndUpdate(
                        { 'local.discord_id': mentioned_id },
                        { 'local.marriageProposals': userProposals },
                        {},
                        function(e, object) {
                            if (e) return res.status(500).json({ message: `[${moment().utc()}] Daily | ${e.message}` });

                            // Set msg and show to user
                            const msg = `A marriage is a voluntary and full commitment. It is made in the deepest sense to the exclusion of all others. Before you declare your vows to on another, I want to confirm that it is your intention to be married today. **${
                                mentioned_name
                            }**, do you come here freely to give yourself to **${
                                name
                            }** in marriage?`;

                            return res.status(200).json({ message: msg });
                        }
                    );
                }
            );
        } else {
            return res.status(200).json({ message: `:negative_squared_cross_mark: You do not have enough marriage slots~` });
        }

    },
    acceptMarriage: async (req, res, next) => {
        const { discord_id, user, name, mentioned_id, mentioned_name } = req.value.body;

        // Gather the mentioned user from the database
        let foundUser = await User.findOne({ "local.discord_id": mentioned_id });

        // If no user, return error
        if (!foundUser) {
            return res.status(200).json({ message: `:negative_squared_cross_mark: Mentioned user does not exist.` });
        }

        // Point proposals to new arrays
        let authorProposals = user.sentMarriageProposals;
        let userSentProposals = foundUser.local.marriageProposals;

        // Bool to determine if accepted or not
        let accepted = false;
        let isMarried = false;

        // Checks to see if user id is in the author's marriages and sets isMarried appropriately
        user.marriages.forEach(usr => {
            if (usr === mentioned_id) return (isMarried = true);
        });

        // If the two users are already married, return error
        if (isMarried) {
            return res.status(200).json({ message: `:negative_squared_cross_mark: You are already married to this user` });
        }

        // Loop through the proposals to check if user is in there
        authorProposals.forEach(usr => {
            if (usr === mentioned_id) return (accepted = true);
        });

        if (!accepted) {
            return res.status(200).json({ message: `:negative_squared_cross_mark: You have not proposed or you are waiting for a reply to/from this user` });
        }

        // Remove proposals and add to marriage lists
        let authorMarriages = user.marriages;
        let userMarriages = foundUser.local.marriages;

        authorMarriages.push(mentioned_id);
        userMarriages.push(discord_id);

        const newAuthorProposals = authorProposals.filter(val => {
            return val !== mentioned_id;
        });

        const newUserProposals = userSentProposals.filter(val => {
            return val !== discord_id;
        });

        // Update the database
        User.findOneAndUpdate(
            { 'local.discord_id': discord_id },
            { 'local.sentMarriageProposals': newAuthorProposals, 'local.marriages': authorMarriages },
            {},
            function(e, object) {
                if (e) return res.status(500).json({ message: `[${moment().utc()}] Daily | ${e.message}` });

                User.findOneAndUpdate(
                    { 'local.discord_id': mentioned_id },
                    { 'local.marriageProposals': newUserProposals, 'local.marriages': userMarriages },
                    {},
                    function(e, object) {
                        if (e) return res.status(500).json({ message: `[${moment().utc()}] Daily | ${e.message}` });

                        // Set msg and show to user
                        const msg = `:tada: Congratulations! You and ${mentioned_name} are now married!`;

                        return res.status(200).json({ message: msg });
                    }
                );
            }
        );

    },
    declineMarriage: async (req, res, next) => {
        const { discord_id, user, name, mentioned_id, mentioned_name } = req.value.body;

        // Gather the mentioned user from the database
        let foundUser = await User.findOne({ "local.discord_id": mentioned_id });

        // If no user, return error
        if (!foundUser) {
            return res.status(200).json({ message: `:negative_squared_cross_mark: Mentioned user does not exist.` });
        }

        // Point proposals to new arrays
        let authorProposals = user.marriageProposals;
        let userSentProposals = foundUser.local.sentMarriageProposals;

        // Bool to determine if accepted or not
        let accepted = false;
        let isMarried = false;

        // Checks to see if user id is in the author's marriages and sets isMarried appropriately
        user.marriages.forEach(usr => {
            if (usr === mentioned_id) return (isMarried = true);
        });

        // If the two users are already married, return error
        if (isMarried) {
            return res.status(200).json({ message: `:negative_squared_cross_mark: You are already married to this user` });
        }

        // Loop through the proposals to check if user is in there
        authorProposals.forEach(usr => {
            if (usr === mentioned_id) return (accepted = true);
        });

        if (!accepted) {
            return res.status(200).json({ message: `:negative_squared_cross_mark: You have not proposed or you are waiting for a reply to/from this user` });
        }

        // Remove proposals and don't add to marriage lists
        const newAuthorProposals = authorProposals.filter(val => {
            return val !== mentioned_id;
        });

        const newUserProposals = userSentProposals.filter(val => {
            return val !== discord_id;
        });

        // Update the database
        User.findOneAndUpdate(
            { 'local.discord_id': discord_id },
            { 'local.marriageProposals': newAuthorProposals },
            {},
            function(e, object) {
                if (e) return res.status(500).json({ message: `[${moment().utc()}] Daily | ${e.message}` });

                User.findOneAndUpdate(
                    { 'local.discord_id': mentioned_id },
                    { 'local.sentMarriageProposals': newUserProposals },
                    {},
                    function(e, object) {
                        if (e) return res.status(500).json({ message: `[${moment().utc()}] Daily | ${e.message}` });

                        // Set msg and show to user
                        const msg = `You have declined ${mentioned_name} marriage proposal.`;

                        return res.status(200).json({ message: msg });
                    }
                );
            }
        );

    },
    divorce: async (req, res, next) => {
        const { discord_id, user, name, mentioned_id, mentioned_name } = req.value.body;

        // Gather the mentioned user from the database
        let foundUser = await User.findOne({ "local.discord_id": mentioned_id });

        // If no user, return error
        if (!foundUser) {
            return res.status(200).json({ message: `:negative_squared_cross_mark: Mentioned user does not exist.` });
        }

        // Point proposals to new arrays
        let authorProposals = user.sentMarriageProposals;
        let userSentProposals = foundUser.local.marriageProposals;

        // Bool to determine if accepted or not
        let accepted = false;
        let isMarried = false;

        // Checks to see if user id is in the author's marriages and sets isMarried appropriately
        user.marriages.forEach(usr => {
            if (usr === mentioned_id) return (isMarried = true);
        });

        // If the two users are already married, return error
        if (!isMarried) {
            return res.status(200).json({ message: `:negative_squared_cross_mark: You are not married to this user` });
        }

        // Remove users from marriage lists
        let authorMarriages = user.marriages.filter(usr => {
            return usr !== mentioned_id
        });

        let userMarriages = foundUser.local.marriages.filter(usr => {
            return usr !== discord_id
        });

        // Update the database
        User.findOneAndUpdate(
            { 'local.discord_id': discord_id },
            { 'local.marriages': authorMarriages },
            {},
            function(e, object) {
                if (e) return res.status(500).json({ message: `[${moment().utc()}] Daily | ${e.message}` });

                User.findOneAndUpdate(
                    { 'local.discord_id': mentioned_id },
                    { 'local.marriages': userMarriages },
                    {},
                    function(e, object) {
                        if (e) return res.status(500).json({ message: `[${moment().utc()}] Daily | ${e.message}` });

                        // Set msg and show to user
                        const msg = `:tada: Congratulations! You and ${mentioned_name} are now divorced!`;

                        return res.status(200).json({ message: msg });
                    }
                );
            }
        );

    },
    buyMarriageSlot: async (req, res, next) => {
        const { discord_id, user } = req.value.body;

        let marriageSlots = user.marriageSlots;
        let amount = 0;

        switch(marriageSlots) {
            case 5:
                amount = 2500;
                break;
            case 6:
                amount = 4500;
                break;
            case 7:
                amount = 6500;
                break;
            case 8:
                amount = 8500;
                break;
            case 9:
                amount = 10500;
                break;
            case 10:
                return res.status(200).json({ message: "You have reached the maximum number of marriage slots~"});
            default:
                break;
        }

        if (user.loveGems < amount) return res.status(200).json({ message: "You do not have enough Love Gems"});

        const loveGems = user.loveGems -= amount;
        marriageSlots += 1;

        User.findOneAndUpdate(
            { 'local.discord_id': discord_id },
            { 'local.loveGems': loveGems, 'local.marriageSlots': marriageSlots },
            {},
            function(e, object) {
                if (e) return res.status(500).json({ message: `[${moment().utc()}] BuyMarriageSlots | ${e.message}` });

                // Set msg and show to user
                const msg = `:white_check_mark: You bought a marriage slot. You now have ${marriageSlots} / 10 slots.`;

                return res.status(200).json({ message: msg });
            }
        );
    },
    setProfileText: async(req, res, next) => {
        const { discord_id, user, pfinfo } = req.value.body;
        console.log(pfinfo);

        User.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.profileMessage': pfinfo}},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ message: e.message })

                return res.status(200).json({ message: `Profile text has been updated to \`${pfinfo}\`` });
            }
        );
    },
};