// ✅ Keep alive sunucusu
const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("🟢 Bot çalışıyor!");
});
app.listen(3000, () => {
  console.log("🌐 Keep-alive açık!");
});

// ✅ Mineflayer bot
const mineflayer = require("mineflayer");

const host = process.env.smpbabalarbilirolm.aternos.me;
const port = parseInt(process.env.55814); // çünkü string gelir
const username = process.env.b4balarbilirbot;

var lasttime = -1;
var moving = 0;
var connected = 0;
var actions = [ 'forward', 'back', 'left', 'right' ];
var lastaction;
var pi = 3.14159;
var moveinterval = 2;
var maxrandom = 5;

const bot = mineflayer.createBot({
  host: host,
  port: port,
  username: username
});

bot.on('login', () => {
  console.log("✅ Bot sunucuya girdi!");
});

bot.on('spawn', () => {
  connected = 1;
  console.log("🟢 Bot dünyaya spawn oldu!");
});

bot.on('time', () => {
  if (connected < 1) return;

  if (lasttime < 0) {
    lasttime = bot.time.age;
  } else {
    const randomadd = Math.random() * maxrandom * 20;
    const interval = moveinterval * 20 + randomadd;

    if (bot.time.age - lasttime > interval) {
      if (moving === 1) {
        bot.setControlState(lastaction, false);
        moving = 0;
        lasttime = bot.time.age;
      } else {
        const yaw = Math.random() * pi - (0.5 * pi);
        const pitch = Math.random() * pi - (0.5 * pi);
        bot.look(yaw, pitch, false);
        lastaction = actions[Math.floor(Math.random() * actions.length)];
        bot.setControlState(lastaction, true);
        moving = 1;
        lasttime = bot.time.age;
        bot.activateItem();
      }
    }
  }
});
