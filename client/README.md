# Yazawa-Nico
Yazawa Nico Multipurpose Discord Bot

<p align="center">
    <img src="https://media.giphy.com/media/gQf1tsNi1mG40/source.gif">
</p>

<a href="https://top.gg/bot/506839796921139203">
    <img src="https://top.gg/api/widget/506839796921139203.svg" alt="Yazawa Nico" />
</a>

## About Yazawa Nico
Yazawa Nico is a multipurpose bot with moderation, custom prefix, basic leveling, games and fun commands.

## Invite

<a href="https://discordapp.com/oauth2/authorize?client_id=506839796921139203&scope=bot&permissions=2146827775">Invite Nico</a> <a href="https://discord.gg/cs9Sv8N">Support Server</a>

## Like the bot? Give us a vote!
<a href="https://discordbots.org/bot/506839796921139203">Vote</a>

# [BREAKING CHANGES]

As per Discord's new features and API changes, I will need to update my bot to work with the new changes. As the bot has been dorment for quite a while, I will make the time now to update the bot. I will take this opportunity to also change some much needed issues such as XP gain, no way to spend loveca, roles feature, etc. 

As I hate to continue to reset things, as I've learned more about servers and javascript and coding in general, there is a lot I can do to make this bot better, scalable, faster, and overall, less prone to breaking changes. The major changes that will be affected are related to user profiles as I think they are in much needed updates.

As such, the bot will currently be down until I finish these updates. Sorry for any inconveniences.

## Main Features

* Live 24/7 (except maintance)
* Constant development to add more features and fix bugs
* Ban, kick, warning and message purge moderation
* Custom prefix
* Greet and leave messages with custom channel settings
* Fun image commands; kiss, lick, niconii, pat and many more!
* A leveling and credit system for added fun!
* Marriage system

## Moderation

Mod-log features as follows:

* Channel creation
* Channel deletion
* User ban
* User ban revoke
* Message deletion
* User joined
* User left

Currently working on individual mod-log feature enable and disable each one.

Moderation commands as follows:

* Ban
* Kick
* Warn
* clear (up to 100 at a time)
* Set (Set allows the admin to set guild preferences)

Using Set to set guild preferences

`<prefix>set <action> <value>`

- Prefix is the guild's prefix for the bot
- Action is the key you want to modify. Such as: welcome channel or mod-log channel, etc.
- Value is the value you want to channel the key. Such as: welcome channel to channel ID.

Example: `!set welcomechannel 3492830498249`

For a complete list of set commands, view the help command. `<prefix>help`

## Build Source Code

You will need Node 8 or higher

```
npm install
```
and then you can run it by in the project's root

```
node index.js
```

Now you can edit the config.json file and run the bot locally

### Dependencies

* discord.js
* enmap
* moment
* moment-duration-format
* chalk
* better-sqlite-pool

### Note

This is a fan-made project. All rights to the character Yazawa Nico are owned by the Love Live School Idol Project and parent/affiliate companies.

``(c) Love Live School Idol Project for Yazawa Nico``
