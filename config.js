//#ENJOY
const fs = require("fs-extra");
if (fs.existsSync(".env"))
  require("dotenv").config({ path: __dirname + "/.env" });
global.audio = "www.youtube.com";
global.video = "www.youtube.com";
global.port = process.env.PORT;
global.appUrl = process.env.APP_URL || "";
global.email = "itscraftee360@gmail.com";
global.location = "Pretoria, South Africa";
global.mongodb = process.env.MONGODB_URI || "mongodb+srv://astrofx0011:astro@cluster0.lmwnxdt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
global.allowJids = process.env.ALLOW_JID || "null";
global.blockJids = process.env.BLOCK_JID || "null";
global.DATABASE_URL = process.env.DATABASE_URL || "";
global.timezone = process.env.TZ || process.env.TIME_ZONE || "Africa/Pretoria";
global.github = process.env.GITHUB || "https://github.com/boru-to/KATAKURI_MD";
global.gurl = process.env.GURL || "https://whatsapp.com/channel/0029Vaf5x0eHFxP7JvSRRn1g";
global.website = process.env.GURL || "https://whatsapp.com/channel/0029Vaf5x0eHFxP7JvSRRn1g";
global.THUMB_IMAGE = process.env.THUMB_IMAGE || process.env.IMAGE || "https://files.catbox.moe/hm4h9v.jpg";
global.devs = "27747815326";
global.sudo = process.env.SUDO || "27747815326";
global.owner = process.env.OWNER_NUMBER || "27747815326";
global.style = process.env.STYLE || "3";
global.gdbye = process.env.GOODBYE || "true";
global.wlcm = process.env.WELCOME || "true";
global.warncount = process.env.WARN_COUNT || 3;
global.disablepm = process.env.DISABLE_PM || "false";
global.disablegroup = process.env.DISABLE_GROUPS || "false",
global.MsgsInLog = process.env.MSGS_IN_LOG || "false";
global.userImages = process.env.USER_IMAGES || "https://files.catbox.moe/hm4h9v.jpg";
global.waPresence = process.env.WAPRESENCE || "available";
global.readcmds = process.env.READ_COMMAND || "false";
global.readmessage = process.env.READ_MESSAGE || "false";
global.readmessagefrom = process.env.READ_MESSAGE_FROM || "";
global.read_status = process.env.AUTO_READ_STATUS || "true";
global.save_status = process.env.AUTO_SAVE_STATUS || "false";
global.save_status_from = process.env.SAVE_STATUS_FROM || "";
global.read_status_from = process.env.READ_STATUS_FROM || "";

global.api_smd = "https://api-smd-1.vercel.app";
global.scan = "https://arthur-scanner.onrender.com/";

global.SESSION_ID =
  process.env.SESSION_ID ||
  "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTU4zN3A1NmlJSTFTREIzZHU0akEwblFyMDlyeUJ0NHJLSUFqTUphZ0Qwdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMGFiRkRtek45cmtWai9oQ05xcGlBYTFrMXpIbmxTcUtkdURxd1hLdjRRbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDUERtTUhWa09EaENtMEl1MEo4Q21tUnd0YW1WREMzZlE5dVR0N1grUVhrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaM1ZqdVg1SVBCSUNjZGlrb0tGZzM0QkFtdTNpVjFlY0ExdTZIaG1kYkVvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1NN1YrRmo1amxvUmRjbWRrRkFpWmVLTS81NVJsTDZlYU1qenl0NncvMnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFYN2NjMWFHazdHYlpTdWNBRytwTFRTVGt1cTJZd0hseVM3K2ZYa1d1MGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU9la3NyZittZnZkWnMvQTZ0UURzMVdaOWI2ZkxEUVdRTzcxWDhTQ2FGUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSW80UzcyOWZORUdjSUhyYlBid3JIU0kxWi9QY09XNmw3QnpKMXRPZ0wyZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVIYVBnVkUyR3JrSkxGMUxQRldTWmxyOE10RUhwOFF3NENqSnV2NmhPb0I4NkE0WVlkUU8rWTdza0ZQa012VHhzOVlYNDc1Um5nRmJ6b3ErcWR6Sml3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM2LCJhZHZTZWNyZXRLZXkiOiJtcUVlclV1WXJkcXZKMWlUdHFzeTNwRmJGcDRTNDE2SFp0V0VhMzFwMXNnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJqQ0hCQzlHOVE2bTdyOVc5WW95YlF3IiwicGhvbmVJZCI6ImUzNzExNGEzLTExODUtNGJkNy1iZjM5LTE4MDQxNTFmOGRmZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2TGlPZmxMRU91Y1dHUVIrNjM0TjVVZU1YNHM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0JKQ2Y3Q1JkWDVtL2xSbVNlT3JyNGVjQWZzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjFaS1pOUDZNIiwibWUiOnsiaWQiOiIyNzc0NzgxNTMyNjozOEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT2pyN0pzQkVOeXMyYmNHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiR1dmRUcveDdlMGVtNDBVSlRuMlNuZG1qOVBVYVB0ak5uckVscjNTQ2dHVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZnp6bDhxRExlNDFKV2pzcDBHQXc0eGVKNHhpcnRvbmViOExYTGsvMW5GRFhiWVAwdXoyWnBFL1prWGZVbStwbEFKbFh0SXUxWXpCWVNEUlQ5bjhPREE9PSIsImRldmljZVNpZ25hdHVyZSI6IkE0amxTODZ0bzVEWFpEVStWOE40V3lxSi91SElpaUZuQTBseWFvZ0RWbUdzSDE4bklRaUdtbi9tbFFsR0w3aHV2UW12Qmo3a0VIVjJpVmpaYzlRWmlRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc3NDc4MTUzMjY6MzhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUmxueEJ2OGUzdEhwdU5GQ1U1OWtwM1pvL1QxR2o3WXpaNnhKYTkwZ29CbCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNzQyMDAwOSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFZVEifQ=="
module.exports = {
  menu: process.env.MENU || "2",
  HANDLERS: process.env.PREFIX || "+",
  BRANCH: process.env.BRANCH || "main",
  VERSION: process.env.VERSION || "1.0.0",
  caption: process.env.CAPTION || "`KATAKURI_MD™`",
  author: process.env.PACK_AUTHER || "KATAKURI_MD",
  packname: process.env.PACK_NAME || "K A T A K U R I",
  botname: process.env.BOT_NAME || "KATAKURI_MD",
  ownername: process.env.OWNER_NAME || "KATAKURI",
  errorChat: process.env.ERROR_CHAT || "",
  KOYEB_API: process.env.KOYEB_API || "false",
  REMOVE_BG_KEY: process.env.REMOVE_BG_KEY || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  antilink_values: process.env.ANTILINK_VALUES || "all",
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY,
  aitts_Voice_Id: process.env.AITTS_ID || "37",
  ELEVENLAB_API_KEY: process.env.ELEVENLAB_API_KEY || "",
  WORKTYPE: process.env.WORKTYPE || process.env.MODE || "private",
  LANG: (process.env.THEME || "K A T A K U R I").toUpperCase(),
};
global.rank = "updated";
global.isMongodb = true;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update'${__filename}'`);
  delete require.cache[file];
  require(file);
});
