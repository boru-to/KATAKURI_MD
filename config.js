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
global.THUMB_IMAGE = process.env.THUMB_IMAGE || process.env.IMAGE || "https://files.catbox.moe/23fcdx.jpg";
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
global.userImages = process.env.USER_IMAGES || "https://files.catbox.moe/23fcdx.jpg";
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
  "Asta;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEgrUE01ajdFV2l4SGIvbkFLa1NPWWpBbXgrM01FYmlQQWdKVEs4dFZsaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEU2M1E3QUNRblN3b3Bvak9FekZ4VTcwYytVcGRxMlBVS0xFTGs2TDBHQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3RXdUUzJackJuMG9SaHNHL0tobWF4bUF2QzJRaDgvWFhFNThQVThpc1hVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwTnA5bEhGeDAxRURvNnA2Wlk3bk9LM1F4TnlZa2Z6aGlFNDhXYURHQjBZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJCc3JLOHhVQTQ5VzhWTitRcFB5YkdzYng2TGxYcTNIaGVaU05aZ3EzV2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkREOVZlMzFmUC9wKzBqMll1V2g1S0Y5eFJISTI5ZTBDZHJIcEVaUHBkaUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUpKZ0gvSTJueDl4UUpGczJyYUcwOHB1R2pPYlBNMjFKcVprNi9XM2FuYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV3dVcVpLUEE4WCtDeDExUmhRclZPdUJDbHFLRVI5ZCtXNHNneHpCSkRsYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhWRDB1ekUzbEszWXEzTDFvY1JrUmJDNEp0M3BnU0hJTTd0cVB6b1JZZ3k0TlpZMExneldPbEFWVnlXY05TWkk4Y21JeklEbUVJUmU0VzlyK29RMUJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI1LCJhZHZTZWNyZXRLZXkiOiJ4NmpOU3g2cFZ1Skt4ajhDSXhZbEpSVjVmSGpOSFNKUHhIdzRGbUhlQTU0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI1QU1zRnVZSVFjdVJXX0piWk5vM3dBIiwicGhvbmVJZCI6ImY0NzE2NzVlLWI1YTktNDExNi1iN2EyLWQxOTVlYWU1OTljYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvVEI5ZGNyS0ZvYm0zRWxwZGUyS0FsN1NRc289In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQWpmeHRRWFVYYjU0U0NnSnA1dFQ2eC9Hdm1rPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkpLUEhMN01DIiwibWUiOnsiaWQiOiIyNzc0NzgxNTMyNjozNkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjY0ODU3ODY1NTAzNzE6MzZAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPZnI3SnNCRUkrYXk3Y0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJHV2ZFRy94N2UwZW00MFVKVG4yU25kbWo5UFVhUHRqTm5yRWxyM1NDZ0dVPSIsImFjY291bnRTaWduYXR1cmUiOiJ0c0UrVCsxdnNQMzdjSVZKb3JTTWEvRjJRVnQ0S3AzQjVzSElsL0IwYzhjcjVLOWRyVXlIcnR0Y3JidjR0UWpiQnRUSEQzZFdudWowTHcwczJIS3RCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoid1RvdEJtRVZWcHJ6UzQwcW12L3hyWHJ6c0pvKzVia2ovejJLQmpTYm9pWWFJUERHaGIxeU9pOHlaMVJLNWRxMGlueVlnYkg5YWZSR3prN0o3aklYQ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzc0NzgxNTMyNjozNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSbG54QnY4ZTN0SHB1TkZDVTU5a3AzWm8vVDFHajdZelo2eEphOTBnb0JsIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI3MTg4MjQyfQ=="
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
