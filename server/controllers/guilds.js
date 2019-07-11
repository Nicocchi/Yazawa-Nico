const Guild = require('../models/guild');

createGuild = async guild => {
    // Create a new user
    console.log('[controllers/guilds.js] CREATE NEW GUILD\n', guild.name)
    const newGuild = new Guild({
        method: 'local',
        local: {
            discord_id: guild.discord_id,
            name: guild.name,
            prefix: "!",
            modlog: false,
            modLogChannel: null,
            modRole: null,
            adminRole: null,
            systemNotice: true,
            welcomeChannel: null,
            welcomeMessage: "Welcome <user>, to <guild>! Nico Nico Nii~",
            welcomeEnabled: false,
            leaveChannel: null,
            leaveMessage: "Sorry to see you leave <user>",
            leaveEnabled: false,
            numberOfWarnings: 0,
            warningsBan: 3,
            warningsMute: 2,
            levelEnabled: false,
            warnings: null,
            greetingImage: "https://cdn.discordapp.com/attachments/506868612347199508/595437737234923530/guildGreeting1.png"
        }
    });
    await newGuild.save();
    return newGuild;
}

module.exports = {
    profile: async(req, res, next) => {
        const { guild } = req.value.body;
        // console.log('[controllers/guilds.js] PROFILE\n', guild.name)

        res.status(200).json({ guild });
    },
    setPrefix: async(req, res, next) => {
        const { discord_id, guild, prefix } = req.value.body;
        // console.log('[controllers/guilds.js] SET_PREFIX\n', guild.name)

        Guild.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.prefix': prefix }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ error: e.message })

                return res.status(200).json({ message: `:white_check_mark: Server prefix has been changed to \`${prefix}\`` });
            }
        );

    },
    setGreetingImage: async(req, res, next) => {
        const { discord_id, imageUrl } = req.value.body;

        Guild.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.greetingImage': imageUrl }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ message: e.message })

                return res.status(200).json({ message: 'Greeting image updated!' });
            }
        );
    },
    setBan: async(req, res, next) => {
        const { discord_id, guild, warningsBan } = req.value.body;

        Guild.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.warningsBan': warningsBan }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ error: e.message })

                return res.status(200).json({ message: `:white_check_mark: Server ban amount has been changed to \`${warningsBan}\`` });
            }
        );

    },
    setMute: async(req, res, next) => {
        const { discord_id, guild, warningsMute } = req.value.body;

        Guild.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.warningsMute': warningsMute }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ error: e.message })

                return res.status(200).json({ message: `:white_check_mark: Server mute amount has been changed to \`${warningsMute}\`` });
            }
        );

    },
    setLevel: async(req, res, next) => {
        const { discord_id, guild, levelEnabled } = req.value.body;

        Guild.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.levelEnabled': levelEnabled }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ error: e.message })

                return res.status(200).json({ message: `:white_check_mark: Server level preference has been changed to \`${levelEnabled}\`` });
            }
        );

    },
    setLeave: async(req, res, next) => {
        const { discord_id, guild, leaveEnabled } = req.value.body;

        Guild.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.leaveEnabled': leaveEnabled }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ error: e.message })

                return res.status(200).json({ message: `:white_check_mark: Server leave preference has been changed to \`${leaveEnabled}\`` });
            }
        );

    },
    setLeaveMessage: async(req, res, next) => {
        const { discord_id, guild, leaveMessage } = req.value.body;

        Guild.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.leaveMessage': leaveMessage }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ error: e.message })

                return res.status(200).json({ message: `:white_check_mark: Server leave message has been changed to \`${leaveMessage}\`` });
            }
        );

    },
    setLeaveChannel: async(req, res, next) => {
        const { discord_id, guild, leaveChannel } = req.value.body;

        Guild.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.leaveChannel': leaveChannel }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ error: e.message })

                return res.status(200).json({ message: `:white_check_mark: Server leave channel has been changed to \`${leaveChannel}\`` });
            }
        );

    },
    setWelcome: async(req, res, next) => {
        const { discord_id, guild, welcomeEnabled } = req.value.body;

        Guild.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.welcomeEnabled': welcomeEnabled }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ error: e.message })

                return res.status(200).json({ message: `:white_check_mark: Server welcome preference has been changed to \`${welcomeEnabled}\`` });
            }
        );

    },
    setWelcomeMessage: async(req, res, next) => {
        const { discord_id, guild, welcomeMessage } = req.value.body;

        Guild.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.welcomeMessage': welcomeMessage }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ error: e.message })

                return res.status(200).json({ message: `:white_check_mark: Server welcome message has been changed to \`${welcomeMessage}\`` });
            }
        );

    },
    setWelcomeChannel: async(req, res, next) => {
        const { discord_id, guild, welcomeChannel } = req.value.body;

        Guild.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.welcomeChannel': welcomeChannel }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ error: e.message })

                return res.status(200).json({ message: `:white_check_mark: Server welcome channel has been changed to \`${welcomeChannel}\`` });
            }
        );

    },
    setModlog: async(req, res, next) => {
        const { discord_id, guild, modlog } = req.value.body;

        Guild.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.modlog': modlog }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ error: e.message })

                return res.status(200).json({ message: `:white_check_mark: Server modlog preference has been changed to \`${modlog}\`` });
            }
        );

    },
    setModlogChannel: async(req, res, next) => {
        const { discord_id, guild, modlogChannel } = req.value.body;

        Guild.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.modLogChannel': modlogChannel }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ error: e.message })

                return res.status(200).json({ message: `:white_check_mark: Server modlog channel has been changed to \`${modlogChannel}\`` });
            }
        );

    },
    setModRole: async(req, res, next) => {
        const { discord_id, guild, modrole } = req.value.body;

        Guild.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.modRole': modrole }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ error: e.message })

                return res.status(200).json({ message: `:white_check_mark: Server mod role has been changed to \`${modrole}\`` });
            }
        );

    },
    setAdminRole: async(req, res, next) => {
        const { discord_id, guild, adminrole } = req.value.body;

        Guild.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.adminRole': adminrole }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ error: e.message })

                return res.status(200).json({ message: `:white_check_mark: Server admin role has been changed to \`${adminrole}\`` });
            }
        );

    },
    setWarn: async(req, res, next) => {
        console.log("SET WARNS")
        const { discord_id, guild, warning, warnUser } = req.value.body;

        let warnings = guild.warnings;

        // Check if warnings is null and then create a new warning and add it to warnings
        if (warnings === null) {
            const warn = {
                [warnUser] : {
                    "warns": 0
                }
            };

            warnings = warn;
        }

        // Check if the user is not in the list and add them. If they are on the list,
        // Increase the amount of warnings
        if (!warnings[warnUser]) {
            const warn = {
                ...warnings,
                [warnUser]: {
                    "warns": 1
                }
            };
            warnings = warn;

        } else {
            let amount = warnings[warnUser].warns;
            const warn = {
                ...warnings,
                [warnUser]: {
                    "warns": ++amount
                }
            };
            warnings = warn;
        }


        // Update the guild's warnings
        Guild.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.warnings': warnings }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ error: e.message })

                return res.status(200).json({ message: `:white_check_mark: User has been warned`, warnings: warnings[warnUser].warns });
            }
        );

    },
    savePlaylist: async (req, res, next) => {
        const { discord_id, playlist } = req.value.body;
        console.log(playlist);

        Guild.findOneAndUpdate(
            {'local.discord_id': discord_id},
            {$set: {'local.playlist': playlist }},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ error: e.message })

                return res.status(200).json({ message: `:white_check_mark: Playlist has been saved` });
            }
        );
    },
    getPlaylist: async (req, res, next) => {
        const { discord_id, guild } = req.value.body;

        res.status(200).json({ 'playlist': guild.playlist });
    
    },
    setNewGuild: async (req, res, next) => {
        const { discord_id } = req.value.body;
        
        createUser2 = async user => {
            // Create a new user
            const newUser = new Guild({
                method: 'local',
                local: {
                    discord_id: user.discord_id,
                    name: user.name,
                    prefix: user.prefix,
                    modlog: false,
                    modLogChannel: null,
                    modRole: null,
                    adminRole: null,
                    systemNotice: true,
                    welcomeChannel: null,
                    welcomeMessage: "Welcome <user>, to <guild>! Nico Nico Nii~",
                    welcomeEnabled: false,
                    leaveChannel: null,
                    leaveMessage: "Sorry to see you leave <user>",
                    leaveEnabled: false,
                    numberOfWarnings: 0,
                    warningsBan: 3,
                    warningsMute: 2,
                    levelEnabled: false,
                    warnings: null,
                    greetingImage: "https://cdn.discordapp.com/attachments/506868612347199508/595437737234923530/guildGreeting1.png"
                }
            });
            await newUser.save();
            return newUser;
        }

        const fs = require("fs")
        const path = require('path')
        const filePath = path.join(__dirname, 'datas.json');
        // console.log(filePath);

        let data = fs.readFileSync(filePath, "utf8");
        data = data.trim();
        const arr = JSON.parse(data);

        for (let i = 0; i < 76317; i++) {
            // console.log(arr[i].name);
            const newUser = await createUser2(arr[i]);
            console.log(`Successfully created guild ${newUser.local.name}`)
        }

        return res.status(200).json({ 'message': "Finished" });

    }
};