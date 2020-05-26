const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const axios = require("axios");
const btoa = require('btoa');
const redirect = encodeURIComponent(`${process.env.REDIRECT_URL}`);

const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();

module.exports = {
    login: async (req, res, next) => {
        res.redirect(
            `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect}&response_type=code&scope=identify%20guilds`
        );
        // console.log("========LOGIN")
        // oauth.tokenRequest({
        //     clientId: CLIENT_ID,
        //     clientSecret: CLIENT_SECRET,
         
        //     code: "query code",
        //     scope: "identify guilds",
        //     grantType: "authorization_code",
            
        //     redirectUri: "http://localhost:8000/api/discord/callback",
        // }).then(console.log)
    },
    callback: async (req, res, next) => {
        if (!req.query.code) res.status(400).send({error: "No code provided"})
        const code = req.query.code;
        const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
        const jwt = require('jsonwebtoken');
        axios({
                method: 'POST',
                url: `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
                headers: { Authorization: `Basic ${creds}` }}
            )
            .then(response => {
                // const json = res.json();
                // console.log(response.data.access_token);
                const token = jwt.sign(response.data.access_token, process.env.JWT_SECRET)
                res.redirect(`http://localhost:3000/?token=${token}`);
            }).catch(err => {
                console.log(err);
            })
    },
};
