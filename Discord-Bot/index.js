const { Client, GatewayIntentBits } = require("discord.js");
const mongoose = require("mongoose");
const client = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]});
const URL = require("./models/url");


const { connectToMongoDB } = require("./Connection/connect");
connectToMongoDB('mongodb://127.0.0.1:27017/shoer-url').then(()=>console.log("MongoDB Connected"));


client.on("messageCreate",async (message )=> {
    const { nanoid } = await import('nanoid');
    const shortID = nanoid(8);
    const url=message.content.split("create")[1];
    await URL.create({
        shortId:shortID,
        redirectURL:url,
        visitHistory: [],
       })
    if(message.content.startsWith('create')){
        
        return message.reply({
            content:"Generating Short ID For" + url + "\n Short Id is :"+ shortID,
        })
    }
    if(message.author?.bot==false){
        message.reply({
            content:"Hi From Bot"
        })
        console.log("Sent Successfully");
    }
     
})

client.on("interactionCreate",(interaction)=>{
    if (interaction.isCommand()) {
        interaction.reply(`Hello, ${interaction.user.username}`);
    } else {
        interaction.reply("Interaction is not a command.");
    }
})

client.login(
    "MTI2Njk5NTkwMTU4Nzc4Mzc4NA.G9M80J.8BgvX9hrQeZYvnnTHOHsOKBLZltIP7HlycH0yY"
);