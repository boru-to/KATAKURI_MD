const {
  smd,
  fetchJson,
  astroJson,
  fancytext,
  yt,
  getBuffer,
  smdBuffer,
  prefix,
  Config,
} = require("../lib");
const { search, download } = require("aptoide-scraper");
const googleTTS = require("google-tts-api");
const ytdl = require("katakuri");
const yts = require("secktor-pack");
const fs = require("fs-extra");
const axios = require("axios");
const fetch = require("node-fetch");
var videotime = 2000;
const { cmd } = require("../lib/plugins");
const path = require ("path");
 smd(
  {
    pattern: "igstalk",
    desc: "Get information about an Instagram user.",
    category: "stalker",
    filename: __filename,
    use: "<username>",
  },
  async (m, username) => {
    try {
      if (!username) {
        return await m.send("*_Please provide an Instagram username!_*");
      }

      const apiUrl = `https://api.giftedtechnexus.co.ke/api/stalk/igstalk?username=${encodeURIComponent(
        username
      )}&apikey=gifteddevskk`;
      const response = await axios.get(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      const {
        photo_profile,
        username: igUsername,
        fullname,
        posts,
        followers,
        following,
        bio,
      } = data.result;

      const caption = `
*Instagram User Information*

*Username:* ${igUsername}
*Full Name:* ${fullname}
*Bio:* ${bio || "NO BIO"}

*Posts:* ${posts}
*Followers:* ${followers}
*Following:* ${following}

\t*KATAKURI_MD IG STALKER*
`;

      await m.bot.sendFromUrl(m.from, photo_profile, caption, m, {}, "image");
    } catch (e) {
      await m.error(`${e}\n\ncommand: igstalk`, e);
    }
  }
);
smd(
  {
    pattern: "wastalk",
    desc: "Get information about a WhatsApp channel.",
    category: "stalker",
    filename: __filename,
    use: "<channel_url>",
  },
  async (m, channelUrl) => {
    try {
      if (!channelUrl) {
        return await m.send("*_Please provide a WhatsApp channel URL!_*");
      }

      const apiUrl = `https://api.giftedtechnexus.co.ke/api/stalk/wachannel?url=${encodeURIComponent(
        channelUrl
      )}&apikey=gifteddevskk`;
      
      const response = await axios.get(apiUrl);

      if (response.status !== 200 || !response.data.success) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = response.data.result;

      if (!data) {
        return await m.send("*_No channel information found!_*");
      }

      const {
        img,
        title,
        followers,
        description,
      } = data;

      const caption = `
*WhatsApp Channel Information*

*Channel Name:* ${title}
*Followers:* ${followers}
*Description:* ${description}
`;

      await m.bot.sendFromUrl(
        m.from,
        img,
        caption,
        m,
        {},
        "image"
      );
    } catch (e) {
      await m.error(`${e}\n\ncommand: wachannelstalk`, e);
    }
  }
);
smd(
  {
    pattern: "gitstalk",
    desc: "Get information about a GitHub user.",
    category: "stalker",
    filename: __filename,
    use: "<username>",
  },
  async (m, username) => {
    try {
      if (!username) {
        return await m.send("*_Please provide a GitHub username!_*");
      }

      const apiUrl = `https://api.giftedtechnexus.co.ke/api/stalk/gitstalk?username=${encodeURIComponent(
        username
      )}&apikey=gifteddevskk`;
      const response = await axios.get(apiUrl);

      if (response.status !== 200) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = response.data;

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      const {
        login,
        id,
        avatar_url,
        name,
        company,
        blog,
        location,
        bio,
        public_repos,
        public_gists,
        followers,
        following,
        created_at,
        updated_at,
      } = data.result;

      const caption = `
*GitHub User Information*

*Username:* ${login}
*Name:* ${name || "N/A"}
*ID:* ${id}
*Bio:* ${bio || "N/A"}
*Company:* ${company || "N/A"}
*Blog:* ${blog || "N/A"}
*Location:* ${location || "N/A"}

*Public Repositories:* ${public_repos}
*Public Gists:* ${public_gists}
*Followers:* ${followers}
*Following:* ${following}

*Account Created:* ${new Date(created_at).toLocaleString()}
*Last Updated:* ${new Date(updated_at).toLocaleString()}

*Avatar:*
`;

      await m.bot.sendFromUrl(m.from, avatar_url, caption, m, {}, "image");
    } catch (e) {
      await m.error(`${e}\n\ncommand: gitstalk`, e);
    }
  }
);
smd(
  {
    pattern: "ipstalk",
    desc: "Get information about an IP address.",
    category: "misc",
    filename: __filename,
    use: "<ip_address>",
  },
  async (m, ipAddress) => {
    try {
      if (!ipAddress) {
        return await m.send("*_Please provide an IP address!_*");
      }

      const apiUrl = `https://api.giftedtechnexus.co.ke/api/stalk/ipstalk?address=${encodeURIComponent(
        address
      )}&apikey=gifteddevskk`;
      const response = await axios.get(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      const {
        continent,
        country,
        countryCode,
        regionName,
        city,
        zip,
        lat,
        lon,
        timezone,
        currency,
        isp,
        org,
        as,
        reverse,
        mobile,
        proxy,
        hosting,
        ip,
      } = data.result;

      const caption = `
*IP Address Information*

*IP Address:* ${ip}
*Reverse DNS:* ${reverse}
*Continent:* ${continent}
*Country:* ${country} (${countryCode})
*Region:* ${regionName}
*City:* ${city}
*ZIP Code:* ${zip}
*Latitude:* ${lat}
*Longitude:* ${lon}
*Timezone:* ${timezone}
*Currency:* ${currency}
*ISP:* ${isp}
*Organization:* ${org}
*AS:* ${as}
*Mobile:* ${mobile ? "Yes" : "No"}
*Proxy:* ${proxy ? "Yes" : "No"}
*Hosting:* ${hosting ? "Yes" : "No"}
`;

      await m.send(caption);
    } catch (e) {
      await m.error(`${e}\n\ncommand: ipstalk`, e);
    }
  }
);
 smd({
   pattern: "tgs",
   desc: "Downloads telegram stickers.",
   category: "downloader",
   filename: __filename,
   use: "<add sticker url.>"
 }, async (_0x19df48, _0x155c01) => {
   try {
     if (!_0x155c01) {
       return await _0x19df48.reply("_Enter a tg sticker url_\nEg: .tgs https://t.me/addstickers/Oldboyfinal\nKeep in mind that there is a chance of ban if used frequently");
     }
     if (!_0x155c01.includes("addstickers")) {
       return await _0x19df48.reply("_Uhh Please Enter a Valid tg sticker url_\nEg: .tgs https://t.me/addstickers/Oldboyfinal");
     }
     let _0x2a4fb1 = _0x155c01.split("|")[0];
     let _0x27aa70 = _0x2a4fb1.split("/addstickers/")[1];
     let {
       result: _0x4a601d
     } = await axios.getJson("https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=" + encodeURIComponent(_0x27aa70) + " ");
     let _0x54b45a = _0x155c01.split("|")[1] || "";
     let _0x56bec3 = "Total stickers: " + _0x4a601d.stickers.length + "\n*Estimated complete in:* " + _0x4a601d.stickers.length * 1.5 + " seconds\nKeep in mind that there is a chance of a ban if used frequently";
     if (_0x4a601d.is_animated) {
       return await _0x19df48.reply("Animated stickers are not supported");
     } else if (_0x54b45a.startsWith("info")) {
       return await _0x19df48.reply(_0x56bec3);
     }
     let _0x26c3a3 = parseInt(_0x54b45a.split(",")[0]) || 10;
     let _0x33784b = parseInt(_0x54b45a.split(",")[1]) || 0;
     let _0x4cca92 = _0x54b45a.split(";")[1] || "Sticker";
     let _0x3a6ece = true;
     if (_0x4cca92.includes("photo")) {
       _0x3a6ece = false;
       _0x4cca92 = "Photo";
     }
     if (_0x26c3a3 > _0x4a601d.stickers.length) {
       _0x26c3a3 = _0x4a601d.stickers.length;
     }
     if (_0x33784b > _0x4a601d.stickers.length) {
       _0x33784b = _0x4a601d.stickers.length - 5;
     }
     if (_0x33784b > _0x26c3a3) {
       let _0xe6592a = _0x26c3a3;
       _0x26c3a3 = _0x33784b;
       _0x33784b = _0xe6592a;
     }
     await _0x19df48.reply(_0x56bec3 + "\n\n_Downloading as " + _0x4cca92 + " From index *" + _0x33784b + "* to *" + _0x26c3a3 + "*._\nIf you wants more to download then use Like \n\n .tgs " + _0x2a4fb1 + " |  10 ,  20 ; photo");
     for (_0x33784b; _0x33784b < _0x26c3a3; _0x33784b++) {
       let _0x4de16f = await axios.getJson("https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=" + _0x4a601d.stickers[_0x33784b].file_id);
       let _0x3c2608 = "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + _0x4de16f.result.file_path;
       if (_0x3a6ece) {
         let _0x13ee38 = await getBuffer(_0x3c2608);
         await _0x19df48.reply(_0x13ee38, {
           packname: Config.packname,
           author: "Queen_Alya-Md"
         }, "sticker");
       } else {
         await _0x19df48.bot.sendMessage(_0x19df48.chat, {
           image: {
             url: _0x3c2608
           },
           caption: "*_Telegram Sticker At Index " + (_0x33784b + 1) + " Downloaded_*"
         });
       }
     }
   } catch (_0x5a840a) {
     await _0x19df48.error(_0x5a840a + "\n\ncommand: tgs", _0x5a840a, "*_Error Sending telegram stickers!!!_*");
   }
 });
 smd({
  pattern: "instagram2",
  alias: ["insta", "ig"],
  desc: "Download media from Instagram.",
  category: "downloader",
  filename: __filename,
  use: "<url>",
}, async (m, providedUrl = "") => {
  try {
    const url = providedUrl.trim(); // Trim any leading/trailing whitespace
    if (!url) {
      return await m.send("*_Please provide an Instagram URL!_*");
    }

    const apiUrl = `https://api.neoxr.eu/api/insta?url=${encodeURIComponent(url)}&apikey=mcandy`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();
    
    if (!data.status || data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.message || "Unknown error"}_*`);
    }

    const mediaData = data.data;  // Assuming the API response contains media data in 'data'
    
    if (!mediaData) {
      return await m.send("*_No media found!_*");
    }

    const { thumbnail, url: mediaUrl, watermark } = mediaData; // Adjust keys based on API response structure
    const caption = `*Watermark:* ${watermark ? watermark : "No watermark"}\n\n_Note: This media may have a watermark._`;

    await m.bot.sendFromUrl(m.from, thumbnail, caption, m, {}, "image");
    await m.bot.sendFromUrl(m.from, mediaUrl, "", m, {}, "video");
  } catch (e) {
    await m.error(`${e}\n\ncommand: instagram2`, e);
  }
});
 smd(
   {
     pattern: "wikimedia",
     desc: "Downloads wikimedia images.",
     category: "downloader",
     filename: __filename,
     use: "<text|search.>",
   },
   async (m, query) => {
     try {
       if (!query) {
         return await m.send("*_Please Give me search query!_*");
       }
 
       const { wikimedia } = require("../lib");
       const results = (await wikimedia(query)) || [];
 
       if (!results || !results[0]) {
         return await m.send("*_No Results Found!_*");
       }
 
       const maxResults =
         m.iscreator && query.split("|")[1] === "all"
           ? results.length
           : results.length > 5
           ? 5
           : results.length;
 
       for (let i = 0; i < maxResults; i++) {
         try {
           m.bot.sendFromUrl(
             m.from,
             results[i].image,
             `Title: ${results[i].title}\n*Source:* ${results[i].source}`,
             m,
             {},
             "image"
           );
         } catch {}
       }
     } catch (e) {
       await m.error(`${e}\n\ncommand: insta`, e);
     }
   }
 );
smd({
  pattern: "fb", // Command name remains 'tyu'
  alias: ["fbdl"],
  desc: "Downloads video from a Facebook link.",
  category: "downloader",
  filename: __filename,
  use: "<Facebook video URL>"
}, async (_0x2c2023, _0x4ec99f) => {
  try {
    if (!_0x4ec99f) {
      return await _0x2c2023.reply("*_Provide a Facebook video URL_*");
    }

    const videoUrl = _0x4ec99f; // Facebook video URL

    // Call the Facebook downloader API
    const apiUrl = `https://api.giftedtechnexus.co.ke/api/download/facebook?url=${videoUrl}&apikey=gifteddevskk`;

    const response = await axios.get(apiUrl);
    const data = response.data;

    console.log("API Response:", data); // Log the API response for debugging

    if (data.success && data.download_url) {
      const videoDownloadUrl = data.download_url; // Extract the video URL from the 'download_url' response

      // Download the video file
      const videoResponse = await axios({
        url: videoDownloadUrl,
        method: 'GET',
        responseType: 'stream'
      });

      // Create a temporary file path for the video
      const tempFilePath = path.join(__dirname, `${Date.now()}.mp4`);
      const writer = fs.createWriteStream(tempFilePath);

      // Pipe the video stream to the file
      videoResponse.data.pipe(writer);

      // Handle completion of file writing
      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      console.log(`Video saved to ${tempFilePath}`);

      // Send the video file to the user in normal quality
      await _0x2c2023.bot.sendMessage(_0x2c2023.jid, {
        video: { url: tempFilePath },
        caption: 'Here is your downloaded video',
        fileName: `${Date.now()}.mp4`,
        mimetype: "video/mp4"
      }, { quoted: _0x2c2023 });

      // Optionally, delete the temporary file after sending
      fs.unlinkSync(tempFilePath);
      
    } else {
      console.log("Error: Could not retrieve the video download URL, API response:", data);
      await _0x2c2023.reply("*_Error: Could not retrieve the video download URL. Please try again later!_*");
    }
  } catch (_0x86b411) {
    console.error("Caught Error:", _0x86b411); // Log any caught errors
    return _0x2c2023.error(_0x86b411 + "\n\ncommand: tyu", _0x86b411, "*_Error occurred while processing the command!!_*");
  }
});
smd(
  {
    pattern: "gitclone",
    desc: "Downloads repositories as zip files directly from GitHub.",
    category: "downloader",
    filename: __filename,
    use: "<add repository URL.>",
  },
  async (_0x1ae8f8, _0x1c586e) => {
    try {
      let repoUrl = _0x1c586e
        ? _0x1c586e
        : _0x1ae8f8.reply_message
        ? _0x1ae8f8.reply_message.text
        : "";

      if (!repoUrl) {
        return await _0x1ae8f8.reply(
          "*Provide Repo URL, e.g., .git https://github.com/boru-to/KATAKURI_MD_*"
        );
      }

      const githubRegex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;

      if (!githubRegex.test(repoUrl)) {
        return await _0x1ae8f8.reply("*Provide a valid GitHub Repository URL*");
      }

      let [, owner, repo] = repoUrl.match(githubRegex) || [];
      repo = repo.replace(/.git$/, "");

      // Construct the GitHub API URL for downloading the repository as a zip
      const githubApiUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`;

      // Fetch the repository zip file
      let response = await axios.get(githubApiUrl, { responseType: "arraybuffer" });

      // Check if the response is valid
      if (response.status !== 200 || response.data.length === 0) {
        return await _0x1ae8f8.reply(
          "*Error: Unable to fetch the repository. Check the repository URL.*"
        );
      }

      const zipFileName = `${repo}.zip`;

      // Send the zip file to the user
      await _0x1ae8f8.bot.sendMessage(_0x1ae8f8.jid, {
        document: Buffer.from(response.data),
        fileName: zipFileName,
        mimetype: "application/zip",
      });

    } catch (error) {
      console.error(error); // Log error for debugging
      return _0x1ae8f8.error(
        "Error: " + error.message + "\n\ncommand: git",
        error,
        "*_Failed to fetch the repository!!!_*"
      );
    }
  }
);
 const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;
 smd({
   pattern: "tts",
   desc: "text to speech.",
   category: "downloader",
   filename: __filename,
   use: "<Hii,this is katakuri>"
 }, async (_0x55aba2, _0x56da6b) => {
   try {
     let _0x204f81 = _0x55aba2.reply_text ? _0x55aba2.reply_text : _0x56da6b;
     if (!_0x204f81) {
       return _0x55aba2.reply("*_Example : .tts Yo,I am KATAKURI-Md whatsapp bot ARISED by Arsene._*");
     }
     try {
       let _0x1974d5 = _0x56da6b ? _0x56da6b.split(" ")[0].toLowerCase() : "en";
       const _0x18d003 = googleTTS.getAudioUrl(_0x204f81, {
         lang: _0x1974d5,
         slow: true,
         host: "https://translate.google.com"
       });
       await _0x55aba2.bot.sendMessage(_0x55aba2.jid, {
         audio: {
           url: _0x18d003
         },
         mimetype: "audio/mpeg",
         ptt: true,
         fileName: "KATAKURI-Md-tts.m4a"
       }, {
         quoted: _0x55aba2
       });
     } catch (_0x3537cb) {
       const _0x5596bc = googleTTS.getAudioUrl(_0x204f81, {
         lang: "en",
         slow: true,
         host: "https://translate.google.com"
       });
       await _0x55aba2.bot.sendMessage(_0x55aba2.jid, {
         audio: {
           url: _0x5596bc
         },
         mimetype: "audio/mpeg",
         ptt: true,
         fileName: "KATAKURI_MD-Md-tts.m4a"
       }, {
         quoted: _0x55aba2
       });
     }
   } catch (_0x1313db) {
     return _0x55aba2.error(_0x1313db + "\n\ncommand: tts", _0x1313db, false);
   }
 });
 smd({
   pattern: "sound",
    alias: ["KATAKURI_MDai", "aine","mentalism","alive","waso"],
   desc: "Downloads ringtone.",
   category: "downloader",
   filename: __filename,
   use: "<Dowanload Tiktok Sounds>"
 }, async (_0x2ee3dd, _0x20a520) => {
   try {
     if (!_0x20a520) {
       return _0x2ee3dd.reply("*Give A Number Example: " + prefix + "sound 5*");
     }
     const _0x19c223 = parseInt(_0x20a520);
     if (_0x19c223.toString() == "NaN" || _0x19c223 < 1 || _0x19c223 > 160) {
       return _0x2ee3dd.reply("*_❌ Give a number between 1 to 160_*");
     }
     let _0xf0331a = "https://github.com/Itxxwasi/Tiktokmusic-API/raw/master/tiktokmusic/sound" + _0x19c223.toString() + ".mp3";
     let _0x2ba501 = await getBuffer(_0xf0331a);
     var _0x29fdd9 = {
       ...(await _0x2ee3dd.bot.contextInfo(Config.botname, "ᴛɪᴋᴛᴏᴋ ꜱᴏᴜɴᴅ " + _0x19c223))
     };
     let _0x4737bb = {
       audio: _0x2ba501,
       fileName: "alya-Md tiktok Sound" + _0x19c223 + ".m4a",
       mimetype: "audio/mpeg",
       ptt: true,
       contextInfo: _0x29fdd9
     };
     return _0x2ee3dd.bot.sendMessage(_0x2ee3dd.chat, _0x4737bb, {
       quoted: _0x2ee3dd
     });
   } catch (_0x223ebb) {
     return _0x2ee3dd.error(_0x223ebb + "\n\ncommand: sound", _0x223ebb, false);
   }
 });
smd({
  pattern: "tkdl", // Command name
  alias: ["tiktokdl"],
  desc: "Downloads video from a TikTok link.",
  category: "downloader",
  filename: __filename,
  use: "<TikTok video URL>"
}, async (_0x2c2023, _0x4ec99f) => {
  try {
    if (!_0x4ec99f) {
      return await _0x2c2023.reply("*_Provide a TikTok video URL_*");const {
  smd,
  fetchJson,
  astroJson,
  fancytext,
  yt,
  getBuffer,
  smdBuffer,
  prefix,
  Config,
} = require("../lib");
const { search, download } = require("aptoide-scraper");
const googleTTS = require("google-tts-api");
const ytdl = require("katakuri");
const yts = require("secktor-pack");
const fs = require("fs-extra");
const axios = require("axios");
const fetch = require("node-fetch");
var videotime = 2000;
const { cmd } = require("../lib/plugins");
const path = require ("path");
 smd(
  {
    pattern: "igstalk",
    desc: "Get information about an Instagram user.",
    category: "stalker",
    filename: __filename,
    use: "<username>",
  },
  async (m, username) => {
    try {
      if (!username) {
        return await m.send("*_Please provide an Instagram username!_*");
      }

      const apiUrl = `https://api.giftedtechnexus.co.ke/api/stalk/igstalk?username=${encodeURIComponent(
        username
      )}&apikey=gifteddevskk`;
      const response = await axios.get(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      const {
        photo_profile,
        username: igUsername,
        fullname,
        posts,
        followers,
        following,
        bio,
      } = data.result;

      const caption = `
*Instagram User Information*

*Username:* ${igUsername}
*Full Name:* ${fullname}
*Bio:* ${bio || "NO BIO"}

*Posts:* ${posts}
*Followers:* ${followers}
*Following:* ${following}

\t*KATAKURI_MD IG STALKER*
`;

      await m.bot.sendFromUrl(m.from, photo_profile, caption, m, {}, "image");
    } catch (e) {
      await m.error(`${e}\n\ncommand: igstalk`, e);
    }
  }
);
smd(
  {
    pattern: "wastalk",
    desc: "Get information about a WhatsApp channel.",
    category: "stalker",
    filename: __filename,
    use: "<channel_url>",
  },
  async (m, channelUrl) => {
    try {
      if (!channelUrl) {
        return await m.send("*_Please provide a WhatsApp channel URL!_*");
      }

      const apiUrl = `https://api.giftedtechnexus.co.ke/api/stalk/wachannel?url=${encodeURIComponent(
        channelUrl
      )}&apikey=gifteddevskk`;
      
      const response = await axios.get(apiUrl);

      if (response.status !== 200 || !response.data.success) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = response.data.result;

      if (!data) {
        return await m.send("*_No channel information found!_*");
      }

      const {
        img,
        title,
        followers,
        description,
      } = data;

      const caption = `
*WhatsApp Channel Information*

*Channel Name:* ${title}
*Followers:* ${followers}
*Description:* ${description}
`;

      await m.bot.sendFromUrl(
        m.from,
        img,
        caption,
        m,
        {},
        "image"
      );
    } catch (e) {
      await m.error(`${e}\n\ncommand: wachannelstalk`, e);
    }
  }
);
smd(
  {
    pattern: "gitstalk",
    desc: "Get information about a GitHub user.",
    category: "stalker",
    filename: __filename,
    use: "<username>",
  },
  async (m, username) => {
    try {
      if (!username) {
        return await m.send("*_Please provide a GitHub username!_*");
      }

      const apiUrl = `https://api.giftedtechnexus.co.ke/api/stalk/gitstalk?username=${encodeURIComponent(
        username
      )}&apikey=gifteddevskk`;
      const response = await axios.get(apiUrl);

      if (response.status !== 200) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = response.data;

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      const {
        login,
        id,
        avatar_url,
        name,
        company,
        blog,
        location,
        bio,
        public_repos,
        public_gists,
        followers,
        following,
        created_at,
        updated_at,
      } = data.result;

      const caption = `
*GitHub User Information*

*Username:* ${login}
*Name:* ${name || "N/A"}
*ID:* ${id}
*Bio:* ${bio || "N/A"}
*Company:* ${company || "N/A"}
*Blog:* ${blog || "N/A"}
*Location:* ${location || "N/A"}

*Public Repositories:* ${public_repos}
*Public Gists:* ${public_gists}
*Followers:* ${followers}
*Following:* ${following}

*Account Created:* ${new Date(created_at).toLocaleString()}
*Last Updated:* ${new Date(updated_at).toLocaleString()}

*Avatar:*
`;

      await m.bot.sendFromUrl(m.from, avatar_url, caption, m, {}, "image");
    } catch (e) {
      await m.error(`${e}\n\ncommand: gitstalk`, e);
    }
  }
);
smd(
  {
    pattern: "ipstalk",
    desc: "Get information about an IP address.",
    category: "misc",
    filename: __filename,
    use: "<ip_address>",
  },
  async (m, ipAddress) => {
    try {
      if (!ipAddress) {
        return await m.send("*_Please provide an IP address!_*");
      }

      const apiUrl = `https://api.giftedtechnexus.co.ke/api/stalk/ipstalk?address=${encodeURIComponent(
        address
      )}&apikey=gifteddevskk`;
      const response = await axios.get(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      const {
        continent,
        country,
        countryCode,
        regionName,
        city,
        zip,
        lat,
        lon,
        timezone,
        currency,
        isp,
        org,
        as,
        reverse,
        mobile,
        proxy,
        hosting,
        ip,
      } = data.result;

      const caption = `
*IP Address Information*

*IP Address:* ${ip}
*Reverse DNS:* ${reverse}
*Continent:* ${continent}
*Country:* ${country} (${countryCode})
*Region:* ${regionName}
*City:* ${city}
*ZIP Code:* ${zip}
*Latitude:* ${lat}
*Longitude:* ${lon}
*Timezone:* ${timezone}
*Currency:* ${currency}
*ISP:* ${isp}
*Organization:* ${org}
*AS:* ${as}
*Mobile:* ${mobile ? "Yes" : "No"}
*Proxy:* ${proxy ? "Yes" : "No"}
*Hosting:* ${hosting ? "Yes" : "No"}
`;

      await m.send(caption);
    } catch (e) {
      await m.error(`${e}\n\ncommand: ipstalk`, e);
    }
  }
);
 smd({
   pattern: "tgs",
   desc: "Downloads telegram stickers.",
   category: "downloader",
   filename: __filename,
   use: "<add sticker url.>"
 }, async (_0x19df48, _0x155c01) => {
   try {
     if (!_0x155c01) {
       return await _0x19df48.reply("_Enter a tg sticker url_\nEg: .tgs https://t.me/addstickers/Oldboyfinal\nKeep in mind that there is a chance of ban if used frequently");
     }
     if (!_0x155c01.includes("addstickers")) {
       return await _0x19df48.reply("_Uhh Please Enter a Valid tg sticker url_\nEg: .tgs https://t.me/addstickers/Oldboyfinal");
     }
     let _0x2a4fb1 = _0x155c01.split("|")[0];
     let _0x27aa70 = _0x2a4fb1.split("/addstickers/")[1];
     let {
       result: _0x4a601d
     } = await axios.getJson("https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=" + encodeURIComponent(_0x27aa70) + " ");
     let _0x54b45a = _0x155c01.split("|")[1] || "";
     let _0x56bec3 = "Total stickers: " + _0x4a601d.stickers.length + "\n*Estimated complete in:* " + _0x4a601d.stickers.length * 1.5 + " seconds\nKeep in mind that there is a chance of a ban if used frequently";
     if (_0x4a601d.is_animated) {
       return await _0x19df48.reply("Animated stickers are not supported");
     } else if (_0x54b45a.startsWith("info")) {
       return await _0x19df48.reply(_0x56bec3);
     }
     let _0x26c3a3 = parseInt(_0x54b45a.split(",")[0]) || 10;
     let _0x33784b = parseInt(_0x54b45a.split(",")[1]) || 0;
     let _0x4cca92 = _0x54b45a.split(";")[1] || "Sticker";
     let _0x3a6ece = true;
     if (_0x4cca92.includes("photo")) {
       _0x3a6ece = false;
       _0x4cca92 = "Photo";
     }
     if (_0x26c3a3 > _0x4a601d.stickers.length) {
       _0x26c3a3 = _0x4a601d.stickers.length;
     }
     if (_0x33784b > _0x4a601d.stickers.length) {
       _0x33784b = _0x4a601d.stickers.length - 5;
     }
     if (_0x33784b > _0x26c3a3) {
       let _0xe6592a = _0x26c3a3;
       _0x26c3a3 = _0x33784b;
       _0x33784b = _0xe6592a;
     }
     await _0x19df48.reply(_0x56bec3 + "\n\n_Downloading as " + _0x4cca92 + " From index *" + _0x33784b + "* to *" + _0x26c3a3 + "*._\nIf you wants more to download then use Like \n\n .tgs " + _0x2a4fb1 + " |  10 ,  20 ; photo");
     for (_0x33784b; _0x33784b < _0x26c3a3; _0x33784b++) {
       let _0x4de16f = await axios.getJson("https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=" + _0x4a601d.stickers[_0x33784b].file_id);
       let _0x3c2608 = "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + _0x4de16f.result.file_path;
       if (_0x3a6ece) {
         let _0x13ee38 = await getBuffer(_0x3c2608);
         await _0x19df48.reply(_0x13ee38, {
           packname: Config.packname,
           author: "Queen_Alya-Md"
         }, "sticker");
       } else {
         await _0x19df48.bot.sendMessage(_0x19df48.chat, {
           image: {
             url: _0x3c2608
           },
           caption: "*_Telegram Sticker At Index " + (_0x33784b + 1) + " Downloaded_*"
         });
       }
     }
   } catch (_0x5a840a) {
     await _0x19df48.error(_0x5a840a + "\n\ncommand: tgs", _0x5a840a, "*_Error Sending telegram stickers!!!_*");
   }
 });
 smd({
  pattern: "instagram2",
  alias: ["insta", "ig"],
  desc: "Download media from Instagram.",
  category: "downloader",
  filename: __filename,
  use: "<url>",
}, async (m, providedUrl = "") => {
  try {
    const url = providedUrl.trim(); // Trim any leading/trailing whitespace
    if (!url) {
      return await m.send("*_Please provide an Instagram URL!_*");
    }

    const apiUrl = `https://api.neoxr.eu/api/insta?url=${encodeURIComponent(url)}&apikey=mcandy`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();
    
    if (!data.status || data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.message || "Unknown error"}_*`);
    }

    const mediaData = data.data;  // Assuming the API response contains media data in 'data'
    
    if (!mediaData) {
      return await m.send("*_No media found!_*");
    }

    const { thumbnail, url: mediaUrl, watermark } = mediaData; // Adjust keys based on API response structure
    const caption = `*Watermark:* ${watermark ? watermark : "No watermark"}\n\n_Note: This media may have a watermark._`;

    await m.bot.sendFromUrl(m.from, thumbnail, caption, m, {}, "image");
    await m.bot.sendFromUrl(m.from, mediaUrl, "", m, {}, "video");
  } catch (e) {
    await m.error(`${e}\n\ncommand: instagram2`, e);
  }
});
 smd(
   {
     pattern: "wikimedia",
     desc: "Downloads wikimedia images.",
     category: "downloader",
     filename: __filename,
     use: "<text|search.>",
   },
   async (m, query) => {
     try {
       if (!query) {
         return await m.send("*_Please Give me search query!_*");
       }
 
       const { wikimedia } = require("../lib");
       const results = (await wikimedia(query)) || [];
 
       if (!results || !results[0]) {
         return await m.send("*_No Results Found!_*");
       }
 
       const maxResults =
         m.iscreator && query.split("|")[1] === "all"
           ? results.length
           : results.length > 5
           ? 5
           : results.length;
 
       for (let i = 0; i < maxResults; i++) {
         try {
           m.bot.sendFromUrl(
             m.from,
             results[i].image,
             `Title: ${results[i].title}\n*Source:* ${results[i].source}`,
             m,
             {},
             "image"
           );
         } catch {}
       }
     } catch (e) {
       await m.error(`${e}\n\ncommand: insta`, e);
     }
   }
 );
smd({
  pattern: "fb", // Command name remains 'tyu'
  alias: ["fbdl"],
  desc: "Downloads video from a Facebook link.",
  category: "downloader",
  filename: __filename,
  use: "<Facebook video URL>"
}, async (_0x2c2023, _0x4ec99f) => {
  try {
    if (!_0x4ec99f) {
      return await _0x2c2023.reply("*_Provide a Facebook video URL_*");
    }

    const videoUrl = _0x4ec99f; // Facebook video URL

    // Call the Facebook downloader API
    const apiUrl = `https://api.giftedtechnexus.co.ke/api/download/facebook?url=${videoUrl}&apikey=gifteddevskk`;

    const response = await axios.get(apiUrl);
    const data = response.data;

    console.log("API Response:", data); // Log the API response for debugging

    if (data.success && data.download_url) {
      const videoDownloadUrl = data.download_url; // Extract the video URL from the 'download_url' response

      // Download the video file
      const videoResponse = await axios({
        url: videoDownloadUrl,
        method: 'GET',
        responseType: 'stream'
      });

      // Create a temporary file path for the video
      const tempFilePath = path.join(__dirname, `${Date.now()}.mp4`);
      const writer = fs.createWriteStream(tempFilePath);

      // Pipe the video stream to the file
      videoResponse.data.pipe(writer);

      // Handle completion of file writing
      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      console.log(`Video saved to ${tempFilePath}`);

      // Send the video file to the user in normal quality
      await _0x2c2023.bot.sendMessage(_0x2c2023.jid, {
        video: { url: tempFilePath },
        caption: 'Here is your downloaded video',
        fileName: `${Date.now()}.mp4`,
        mimetype: "video/mp4"
      }, { quoted: _0x2c2023 });

      // Optionally, delete the temporary file after sending
      fs.unlinkSync(tempFilePath);
      
    } else {
      console.log("Error: Could not retrieve the video download URL, API response:", data);
      await _0x2c2023.reply("*_Error: Could not retrieve the video download URL. Please try again later!_*");
    }
  } catch (_0x86b411) {
    console.error("Caught Error:", _0x86b411); // Log any caught errors
    return _0x2c2023.error(_0x86b411 + "\n\ncommand: tyu", _0x86b411, "*_Error occurred while processing the command!!_*");
  }
});
smd(
  {
    pattern: "gitclone",
    desc: "Downloads repositories as zip files directly from GitHub.",
    category: "downloader",
    filename: __filename,
    use: "<add repository URL.>",
  },
  async (_0x1ae8f8, _0x1c586e) => {
    try {
      let repoUrl = _0x1c586e
        ? _0x1c586e
        : _0x1ae8f8.reply_message
        ? _0x1ae8f8.reply_message.text
        : "";

      if (!repoUrl) {
        return await _0x1ae8f8.reply(
          "*Provide Repo URL, e.g., .git https://github.com/boru-to/KATAKURI_MD_*"
        );
      }

      const githubRegex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;

      if (!githubRegex.test(repoUrl)) {
        return await _0x1ae8f8.reply("*Provide a valid GitHub Repository URL*");
      }

      let [, owner, repo] = repoUrl.match(githubRegex) || [];
      repo = repo.replace(/.git$/, "");

      // Construct the GitHub API URL for downloading the repository as a zip
      const githubApiUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`;

      // Fetch the repository zip file
      let response = await axios.get(githubApiUrl, { responseType: "arraybuffer" });

      // Check if the response is valid
      if (response.status !== 200 || response.data.length === 0) {
        return await _0x1ae8f8.reply(
          "*Error: Unable to fetch the repository. Check the repository URL.*"
        );
      }

      const zipFileName = `${repo}.zip`;

      // Send the zip file to the user
      await _0x1ae8f8.bot.sendMessage(_0x1ae8f8.jid, {
        document: Buffer.from(response.data),
        fileName: zipFileName,
        mimetype: "application/zip",
      });

    } catch (error) {
      console.error(error); // Log error for debugging
      return _0x1ae8f8.error(
        "Error: " + error.message + "\n\ncommand: git",
        error,
        "*_Failed to fetch the repository!!!_*"
      );
    }
  }
);
 const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;
 smd({
   pattern: "tts",
   desc: "text to speech.",
   category: "downloader",
   filename: __filename,
   use: "<Hii,this is katakuri>"
 }, async (_0x55aba2, _0x56da6b) => {
   try {
     let _0x204f81 = _0x55aba2.reply_text ? _0x55aba2.reply_text : _0x56da6b;
     if (!_0x204f81) {
       return _0x55aba2.reply("*_Example : .tts Yo,I am KATAKURI-Md whatsapp bot ARISED by Arsene._*");
     }
     try {
       let _0x1974d5 = _0x56da6b ? _0x56da6b.split(" ")[0].toLowerCase() : "en";
       const _0x18d003 = googleTTS.getAudioUrl(_0x204f81, {
         lang: _0x1974d5,
         slow: true,
         host: "https://translate.google.com"
       });
       await _0x55aba2.bot.sendMessage(_0x55aba2.jid, {
         audio: {
           url: _0x18d003
         },
         mimetype: "audio/mpeg",
         ptt: true,
         fileName: "KATAKURI-Md-tts.m4a"
       }, {
         quoted: _0x55aba2
       });
     } catch (_0x3537cb) {
       const _0x5596bc = googleTTS.getAudioUrl(_0x204f81, {
         lang: "en",
         slow: true,
         host: "https://translate.google.com"
       });
       await _0x55aba2.bot.sendMessage(_0x55aba2.jid, {
         audio: {
           url: _0x5596bc
         },
         mimetype: "audio/mpeg",
         ptt: true,
         fileName: "KATAKURI_MD-Md-tts.m4a"
       }, {
         quoted: _0x55aba2
       });
     }
   } catch (_0x1313db) {
     return _0x55aba2.error(_0x1313db + "\n\ncommand: tts", _0x1313db, false);
   }
 });
 smd({
   pattern: "sound",
    alias: ["KATAKURI_MDai", "aine","mentalism","alive","waso"],
   desc: "Downloads ringtone.",
   category: "downloader",
   filename: __filename,
   use: "<Dowanload Tiktok Sounds>"
 }, async (_0x2ee3dd, _0x20a520) => {
   try {
     if (!_0x20a520) {
       return _0x2ee3dd.reply("*Give A Number Example: " + prefix + "sound 5*");
     }
     const _0x19c223 = parseInt(_0x20a520);
     if (_0x19c223.toString() == "NaN" || _0x19c223 < 1 || _0x19c223 > 160) {
       return _0x2ee3dd.reply("*_❌ Give a number between 1 to 160_*");
     }
     let _0xf0331a = "https://github.com/Itxxwasi/Tiktokmusic-API/raw/master/tiktokmusic/sound" + _0x19c223.toString() + ".mp3";
     let _0x2ba501 = await getBuffer(_0xf0331a);
     var _0x29fdd9 = {
       ...(await _0x2ee3dd.bot.contextInfo(Config.botname, "ᴛɪᴋᴛᴏᴋ ꜱᴏᴜɴᴅ " + _0x19c223))
     };
     let _0x4737bb = {
       audio: _0x2ba501,
       fileName: "alya-Md tiktok Sound" + _0x19c223 + ".m4a",
       mimetype: "audio/mpeg",
       ptt: true,
       contextInfo: _0x29fdd9
     };
     return _0x2ee3dd.bot.sendMessage(_0x2ee3dd.chat, _0x4737bb, {
       quoted: _0x2ee3dd
     });
   } catch (_0x223ebb) {
     return _0x2ee3dd.error(_0x223ebb + "\n\ncommand: sound", _0x223ebb, false);
   }
 });
smd({
  pattern: "tkdl", // Command name
  alias: ["tiktokdl"],
  desc: "Downloads video from a TikTok link.",
  category: "downloader",
  filename: __filename,
  use: "<TikTok video URL>"
}, async (_0x2c2023, _0x4ec99f) => {
  try {
    if (!_0x4ec99f) {
      return await _0x2c2023.reply("*_Provide a TikTok video URL_*");
    }

    const videoUrl = _0x4ec9

    const videoUrl = _0x4ec99f; // Ti
         
       
