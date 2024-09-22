const {
aitts,
  smd,
  prefix,
  Config,
  parsedJid,
  sleep,
} = require("../lib");
const axios = require("axios");
const { send } = require("../lib");
const fetch = require("node-fetch");
smd(
  {
    pattern: "gpt",
    desc: "Get a response from GPT-4 based on user query.",
    category: "ai",
    filename: __filename,
  },
  async (m) => {
    try {
      // Extract the query from the message
      const query = m.text.split(' ').slice(1).join(' ');
      if (!query) {
        return await m.send("Please provide a query, e.g., `.hpt What is the weather today?`.");
      }

      // Send a loading message
      await m.send("katakuri is thinking 🤔");

      // Define the API URL
      const apiUrl = `https://api.giftedtechnexus.co.ke/api/ai/gpt4?q=${encodeURIComponent(query)}&apikey=gifteddevskk`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      // Wait for 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.result; // Extract the text from the result part
      const message = `*Response:* \n\n${resultText}`;

      // Send the final response
      await m.send(message);
    } catch (e) {
      await m.error(`${e}\n\ncommand: hpt`, e);
    }
  }
);
smd({
  pattern: "rmbg",
  desc: "Upload an image, remove background, and send the processed image back.",
  category: "general",
  filename: __filename,
  use: "<image>"
}, async (m) => {
  try {
    let pmtypes = ["imageMessage"];
    let media = pmtypes.includes(m.mtype) ? m : m.reply_message;

    if (!media || !pmtypes.includes(media?.mtype)) {
      return m.reply("*_Please reply to an image!_*");
    }

    // Download and save the image
    let mediaPath = await m.bot.downloadAndSaveMediaMessage(media);
    let mediaUrl = await createUrl(mediaPath, "uguMashi");

    // Delete the saved file after creating URL
    try {
      fs.unlink(mediaPath);
    } catch (e) {
      console.log("Error deleting file:", e);
    }

    if (!mediaUrl || !mediaUrl.url) {
      return m.reply("*_Failed to create URL!_*");
    }

    // Construct the API URL for removebg
    const apiUrl = `https://api.giftedtechnexus.co.ke/api/tools/removebg?url=${encodeURIComponent(mediaUrl.url)}&apikey=gifteddevskk`;

    // Fetch the response from the API
    const response = await fetch(apiUrl);

    // Check if the response is not OK
    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    // Get the content type of the response
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.startsWith('image')) {
      // If the response is an image, get the image URL
      const photoUrl = response.url;

      // Send the photo to the user
      await m.bot.sendFromUrl(
        m.from,
        photoUrl,
        "*KATAKURI_MD generated this photo*:",
        m,
        {},
        "image"
      );
    } else if (contentType && contentType.includes('application/json')) {
      // If the response is JSON, parse it
      const data = await response.json();

      // Check if the status in the response data is not 200
      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      // Get the photo URL from the response data
      const photoUrl = data.result;

      // Send the photo to the user
      await m.bot.sendFromUrl(
        m.from,
        photoUrl,
        "Here is your processed photo:",
        m,
        {},
        "image"
      );
    } else {
      // Handle unexpected content types
      return await m.send("*_Unexpected content type received from the API._*");
    }
  } catch (e) {
    console.error(e);
    await m.error(`${e}\n\ncommand: fgh`, e);
  }
});
smd(
  {
    pattern: "sd", // Changed command name to 'dale6'
    desc: "Generate an AI photo from text prompt.",
    category: "ai",
    filename: __filename,
    use: "<query>",
  },
  async (m, query) => {
    try {
      // Check if query is provided
      if (!query) {
        return await m.send("*_Please provide a prompt for the AI image generator!_*");
      }

      // Construct the API URL with the provided query
      const apiUrl = `https://api.giftedtechnexus.co.ke/api/ai/sd?prompt=${encodeURIComponent(query)}&apikey=gifteddevskk`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check if the response is not OK
      if (!response.ok) {
        return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, get the image URL
        const photoUrl = response.url;

        // Send the photo to the user
        await m.bot.sendFromUrl(
          m.from,
          photoUrl,
          "*KATAKURI_MD generated this photo*:",
          m,
          {},
          "image"
        );
      } else if (contentType && contentType.includes('application/json')) {
        // If the response is JSON, parse it
        const data = await response.json();

        // Check if the status in the response data is not 200
        if (data.status !== 200) {
          return await m.send("*_An error occurred while fetching the data._*");
        }

        // Get the photo URL from the response data
        const photoUrl = data.result;

        // Send the photo to the user
        await m.bot.sendFromUrl(
          m.from,
          photoUrl,
          "*KATAKURI_MD generated this photo*:",
          m,
          {},
          "image"
        );
      } else {
        // Handle unexpected content types
        return await m.send("*_Unexpected content type received from the API._*");
      }
    } catch (e) {
      // Log the error and send an error message to the user
      console.error(e);
      await m.error(`${e}\n\ncommand: sd`, e);
    }
  }
);
smd(
  {
    pattern: "lumine",
    desc: "Get a response from Lumine AI based on user query.",
    category: "ai",
    filename: __filename,
  },
  async (m) => {
    try {
      // Extract the query from the message
      const query = m.text.split(' ').slice(1).join(' ');
      if (!query) {
        return await m.send("Please provide a query, e.g., `.lumine What is the weather today?`.");
      }

      // Send a loading message
      await m.send("katakuri is thinking 🤔");

      // Define the API URL
      const apiUrl = `https://api.giftedtechnexus.co.ke/api/ai/luminai?query=${encodeURIComponent(query)}&apikey=gifteddevskk`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      // Wait for 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.result; // Extract the text from the result part
      const message = `*Response:* \n\n${resultText}`;

      // Send the final response
      await m.send(message);
    } catch (e) {
      await m.error(`${e}\n\ncommand: lumine`, e);
    }
  }
);
smd(
  {
    pattern: "gemini",
    desc: "Get a response from Gemini AI based on user query.",
    category: "ai",
    filename: __filename,
  },
  async (m) => {
    try {
      // Extract the query from the message
      const query = m.text.split(' ').slice(1).join(' ');
      if (!query) {
        return await m.send("Please provide a query, e.g., `.gemini What is the weather today?`.");
      }

      // Send a loading message
      await m.send("katakuri is thinking 🤔");

      // Define the new API URL
      const apiUrl = `https://api.giftedtechnexus.co.ke/api/ai/geminiai?q=${encodeURIComponent(query)}&apikey=gifteddevskk`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      // Wait for 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.result; // Extract the text from the result part
      const message = `*Response:* \n\n${resultText}`;

      // Send the final response
      await m.send(message);
    } catch (e) {
      await m.error(`${e}\n\ncommand: gemini`, e);
    }
  }
);
smd(
  {
    pattern: "davinci",
    desc: "Get a response from Davinci AI based on user query.",
    category: "ai",
    filename: __filename,
  },
  async (m) => {
    try {
      // Extract the query from the message
      const query = m.text.split(' ').slice(1).join(' ');
      if (!query) {
        return await m.send("Please provide a query, e.g., `.davinci What is the meaning of life?`.");
      }

      // Send a loading message
      await m.send("katakuri is thinking 🤔");

      // Define the new API URL
      const apiUrl = `https://api.giftedtechnexus.co.ke/api/ai/davinci?q=${encodeURIComponent(query)}&apikey=gifteddevskk`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      // Wait for 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.result; // Extract the text from the result part
      const message = `*Response:* \n\n${resultText}`;

      // Send the final response
      await m.send(message);
    } catch (e) {
      await m.error(`${e}\n\ncommand: davinci`, e);
    }
  }
);
smd(
  {
    pattern: "simisi",
    desc: "Get a response from SimSimi AI based on user query.",
    category: "ai",
    filename: __filename,
  },
  async (m) => {
    try {
      // Extract the query from the message
      const query = m.text.split(' ').slice(1).join(' ');
      if (!query) {
        return await m.send("Please provide a query, e.g., `.simisi How are you?`.");
      }

      // Send a loading message
      await m.send("katakuri is thinking 🤔");

      // Define the new API URL
      const apiUrl = `https://api.giftedtechnexus.co.ke/api/ai/simsimi?query=${encodeURIComponent(query)}&apikey=gifteddevskk`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      // Wait for 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.result; // Extract the text from the result part
      const message = `*Response:* \n\n${resultText}`;

      // Send the final response
      await m.send(message);
    } catch (e) {
      await m.error(`${e}\n\ncommand: simisi`, e);
    }
  }
);
smd(
  {
    pattern: "dalle",
    desc: "Generate an AI photo from text prompt.",
    category: "ai",
    filename: __filename,
    use: "<query>",
  },
  async (m, query) => {
    try {
      // Check if query is provided
      if (!query) {
        return await m.send("*_Please provide a prompt for the AI image generator!_*");
      }

      // Construct the API URL with the provided query
      const apiUrl = `https://api.giftedtechnexus.co.ke/api/ai/text2img?prompt=${encodeURIComponent(query)}&apikey=gifteddevskk`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check if the response is not OK
      if (!response.ok) {
        return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, get the image URL
        const photoUrl = response.url;

        // Send the photo to the user
        await m.bot.sendFromUrl(
          m.from,
          photoUrl,
          "*KATAKURI_MD generated this photo*:",
          m,
          {},
          "image"
        );
      } else if (contentType && contentType.includes('application/json')) {
        // If the response is JSON, parse it
        const data = await response.json();

        // Check if the status in the response data is not 200
        if (data.status !== 200) {
          return await m.send("*_An error occurred while fetching the data._*");
        }

        // Get the photo URL from the response data
        const photoUrl = data.result;

        // Send the photo to the user
        await m.bot.sendFromUrl(
          m.from,
          photoUrl,
          "*KATAKURI_MD generated this photo*:",
          m,
          {},
          "image"
        );
      } else {
        // Handle unexpected content types
        return await m.send("*_Unexpected content type received from the API._*");
      }
    } catch (e) {
      // Log the error and send an error message to the user
      console.error(e);
      await m.error(`${e}\n\ncommand:  dalle`, e);
    }
  }
);
  smd(
    {
      pattern: "anonymsg",
      alias: ["recognition", "anonychat"],
      desc: "Send message Annonymously",
      category: "ai",
      use: "<Hii, Astro>",
      filename: __filename,
    },
    async (_0x358984, _0x20693a, { smd: _0x12d243 }) => {
      try {
        let _0x32512b = _0x20693a ? _0x20693a : _0x358984.reply_text;
        if (!_0x32512b) {
          return await _0x358984.send(
            "*provide number with msg to send Anonymously.* \n*Example " +
              (prefix + _0x12d243) +
              " 2348039607375,your_Message*",
            {},
            "",
            _0x358984
          );
        }
        if (_0x358984.isCreator && _0x32512b === "info") {
          return await _0x358984.reply(
            isAnnonyMsgAlive == ""
              ? "*Theres no Anonymous Chat created yet*"
              : "*Anonymous Chat Recivers*\n_" + isAnnonyMsgAlive + "_"
          );
        }
        const _0x201d91 = _0x32512b.indexOf(",");
        if (_0x201d91 === -1) {
          return await _0x358984.reply(
            "*Invalid format. Please provide both number and Message separated by a comma.*"
          );
        }
        let _0x12e2ef = _0x32512b.slice(0, _0x201d91).trim() + "@s.whatsapp.net";
        let _0x5f656f = _0x32512b.slice(_0x201d91 + 1).trim();
        let _0x48975a = (await parsedJid(_0x12e2ef)) || [];
        if (_0x48975a[0]) {
          const { date: _0xbcd286, time: _0x47ad13 } = await getDateTime();
          const _0x3e1b1c =
            "anony-msg-" + Math.floor(100000 + Math.random() * 900000);
          astro_patch_AnonyMsg[_0x3e1b1c] = new AnonymousMsg();
          let _0x3079e2 = astro_patch_AnonyMsg[_0x3e1b1c];
          _0x3079e2.id = _0x3e1b1c;
          _0x3079e2.sender = _0x358984.sender;
          _0x3079e2.reciever = _0x48975a[0];
          _0x3079e2.msgStatus = true;
          _0x3079e2.senderMsg = _0x358984;
          _0x5f656f =
            "*KATAKURI_MDᴅ • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ*\n\n*Msg_Id:* " +
            _0x3079e2.id +
            "\n*Date:* _" +
            _0xbcd286 +
            "_\n*Time:* _" +
            _0x47ad13 +
            "_\n\n*Message:* " +
            _0x5f656f +
            "\n\n\n" +
            Config.caption;
          isAnnonyMsgAlive = isAnnonyMsgAlive + "," + _0x3079e2.reciever;
          await _0x358984.bot.sendMessage(_0x3079e2.reciever, {
            text: _0x5f656f,
          });
          return await _0x358984.reply("*_Anonymous message sent succesfully_*");
        } else {
          return await _0x358984.reply("*_Provided number is not valid!!!_*");
        }
      } catch (_0x51ed58) {
        await _0x358984.error(
          _0x51ed58 + "\n\ncommand: " + _0x12d243,
          _0x51ed58,
          "*_Can't send annonymously message yet, Sorry!!_*"
        );
      }
    }
  );
  smd(
    {
      on: "text",
    },
    async (_0x2acf30) => {
      try {
        if (
          _0x2acf30.quoted &&
          isAnnonyMsgAlive.includes(_0x2acf30.sender) &&
          _0x2acf30.text.length > 2
        ) {
          const _0x2dfb59 = _0x2acf30.reply_text.split("\n");
          if (_0x2dfb59.length < 3) {
            return;
          }
          if (
            _0x2acf30.reply_text.includes("KATAKURI_MD• ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ") &&
            _0x2dfb59[0].includes("KATAKURI_MD • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ") &&
            _0x2dfb59[2].includes("Msg_Id")
          ) {
            let _0x1b0d01 = "" + _0x2dfb59[2].replace("*Msg_Id:* ", "").trim();
            let _0x2ecd2a = astro_patch_AnonyMsg[_0x1b0d01];
            if (!_0x2ecd2a) {
              return;
            }
            try {
              if (_0x2ecd2a) {
                let _0x13a11c = _0x2acf30.text.split(",")[0].trim();
                if (_0x13a11c.toLowerCase().startsWith("reply")) {
                  _0x2ecd2a.howmanyreply += 1;
                  const _0x5a2204 = _0x2acf30.text.indexOf(",");
                  let _0x3f6b59 =
                    "*KATAKURI_MD • ʏᴏᴜʀ ᴀɴᴏɴʏ-ᴍsɢ ʀᴇᴘʟʏ*\n\n*_From @" +
                    _0x2ecd2a.reciever.split("@")[0] +
                    "_*\n*_Msg_Id: " +
                    _0x2ecd2a.id +
                    "_*\n\n*Message:* " +
                    _0x2acf30.text.slice(_0x5a2204 + 1).trim() +
                    "\n\n\n\n" +
                    Config.caption;
                  if (_0x2ecd2a.howmanyreply >= 2) {
                    isAnnonyMsgAlive = isAnnonyMsgAlive.replace(
                      "," + _0x2acf30.sender,
                      ""
                    );
                  }
                  await _0x2acf30.bot.sendMessage(
                    _0x2ecd2a.sender,
                    {
                      text: _0x3f6b59,
                      mentions: [_0x2ecd2a.reciever],
                    },
                    {
                      quoted: _0x2ecd2a.senderMsg,
                    }
                  );
                  if (_0x2ecd2a.howmanyreply >= 2) {
                    isAnnonyMsgAlive = isAnnonyMsgAlive.replace(
                      "," + _0x2acf30.sender,
                      ""
                    );
                    delete astro_patch_AnonyMsg[_0x1b0d01];
                  }
                  return await _0x2acf30.reply(
                    "*_Your Message succesfully deliver to User_* " +
                      (_0x2ecd2a.howmanyreply == 1
                        ? "\n*you can reply 1 more time*"
                        : "") +
                      " "
                  );
                } else if (_0x2ecd2a.tellinfo === 0) {
                  _0x2ecd2a.tellinfo = 1;
                  let _0x362db6 =
                    "*Basically, Its an Annonymous Message*\n\n_Msg_Id: " +
                    _0x2ecd2a.id +
                    "_\n_this message sended by a chatbot_\n_User not wants to expose itself to send that msg_\n\n\n*if you wanna reply to that user,*\n*Send msg by replying to above message*\n*Type like:* reply, Type_your_Message_Here\n*Example:* reply, Can you text me from your number\n\n\n" +
                    Config.caption;
                  _0x2acf30.bot.sendMessage(
                    _0x2ecd2a.reciever,
                    {
                      text: _0x362db6,
                    },
                    {
                      quoted: _0x2acf30,
                    }
                  );
            aitts,
  smd,
  prefix,
  Config,
  parsedJid,
  sleep,
} = require("../lib");
const axios = require("axios");
const { send } = require("../lib");
const fetch = require("node-fetch");
smd(
  {
    pattern: "gpt",
    desc: "Get a response from GPT-4 based on user query.",
    category: "ai",
    filename: __filename,
  },
  async (m) => {
    try {
      // Extract the query from the message
      const query = m.text.split(' ').slice(1).join(' ');
      if (!query) {
        return await m.send("Please provide a query, e.g., `.hpt What is the weather today?`.");
      }

      // Send a loading message
      await m.send("katakuri is thinking 🤔");

      // Define the API URL
      const apiUrl = `https://api.giftedtechnexus.co.ke/api/ai/gpt4?q=${encodeURIComponent(query)}&apikey=gifteddevskk`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      // Wait for 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.result; // Extract the text from the result part
      const message = `*Response:* \n\n${resultText}`;

      // Send the final response
      await m.send(message);
    } catch (e) {
      await m.error(`${e}\n\ncommand: hpt`, e);
    }
  }
);
smd({
  pattern: "rmbg",
  desc: "Upload an image, remove background, and send the processed image back.",
  category: "general",
  filename: __filename,
  use: "<image>"
}, async (m) => {
  try {
    let pmtypes = ["imageMessage"];
    let media = pmtypes.includes(m.mtype) ? m : m.reply_message;

    if (!media || !pmtypes.includes(media?.mtype)) {
      return m.reply("*_Please reply to an image!_*");
    }

    // Download and save the image
    let mediaPath = await m.bot.downloadAndSaveMediaMessage(media);
    let mediaUrl = await createUrl(mediaPath, "uguMashi");

    // Delete the saved file after creating URL
    try {
      fs.unlink(mediaPath);
    } catch (e) {
      console.log("Error deleting file:", e);
    }

    if (!mediaUrl || !mediaUrl.url) {
      return m.reply("*_Failed to create URL!_*");
    }

    // Construct the API URL for removebg
    const apiUrl = `https://api.giftedtechnexus.co.ke/api/tools/removebg?url=${encodeURIComponent(mediaUrl.url)}&apikey=gifteddevskk`;

    // Fetch the response from the API
    const response = await fetch(apiUrl);

    // Check if the response is not OK
    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    // Get the content type of the response
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.startsWith('image')) {
      // If the response is an image, get the image URL
      const photoUrl = response.url;

      // Send the photo to the user
      await m.bot.sendFromUrl(
        m.from,
        photoUrl,
        "*KATAKURI_MD generated this photo*:",
        m,
        {},
        "image"
      );
    } else if (contentType && contentType.includes('application/json')) {
      // If the response is JSON, parse it
      const data = await response.json();

      // Check if the status in the response data is not 200
      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      // Get the photo URL from the response data
      const photoUrl = data.result;

      // Send the photo to the user
      await m.bot.sendFromUrl(
        m.from,
        photoUrl,
        "Here is your processed photo:",
        m,
        {},
        "image"
      );
    } else {
      // Handle unexpected content types
      return await m.send("*_Unexpected content type received from the API._*");
    }
  } catch (e) {
    console.error(e);
    await m.error(`${e}\n\ncommand: fgh`, e);
  }
});
smd(
  {
    pattern: "sd", // Changed command name to 'dale6'
    desc: "Generate an AI photo from text prompt.",
    category: "ai",
    filename: __filename,
    use: "<query>",
  },
  async (m, query) => {
    try {
      // Check if query is provided
      if (!query) {
        return await m.send("*_Please provide a prompt for the AI image generator!_*");
      }

      // Construct the API URL with the provided query
      const apiUrl = `https://api.giftedtechnexus.co.ke/api/ai/sd?prompt=${encodeURIComponent(query)}&apikey=gifteddevskk`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check if the response is not OK
      if (!response.ok) {
        return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, get the image URL
        const photoUrl = response.url;

        // Send the photo to the user
        await m.bot.sendFromUrl(
          m.from,
          photoUrl,
          "*KATAKURI_MD generated this photo*:",
          m,
          {},
          "image"
        );
      } else if (contentType && contentType.includes('application/json')) {
        // If the response is JSON, parse it
        const data = await response.json();

        // Check if the status in the response data is not 200
        if (data.status !== 200) {
          return await m.send("*_An error occurred while fetching the data._*");
        }

        // Get the photo URL from the response data
        const photoUrl = data.result;

        // Send the photo to the user
        await m.bot.sendFromUrl(
          m.from,
          photoUrl,
          "*KATAKURI_MD generated this photo*:",
          m,
          {},
          "image"
        );
      } else {
        // Handle unexpected content types
        return await m.send("*_Unexpected content type received from the API._*");
      }
    } catch (e) {
      // Log the error and send an error message to the user
      console.error(e);
      await m.error(`${e}\n\ncommand: sd`, e);
    }
  }
);
smd(
  {
    pattern: "lumine",
    desc: "Get a response from Lumine AI based on user query.",
    category: "ai",
    filename: __filename,
  },
  async (m) => {
    try {
      // Extract the query from the message
      const query = m.text.split(' ').slice(1).join(' ');
      if (!query) {
        return await m.send("Please provide a query, e.g., `.lumine What is the weather today?`.");
      }

      // Send a loading message
      await m.send("katakuri is thinking 🤔");

      // Define the API URL
      const apiUrl = `https://api.giftedtechnexus.co.ke/api/ai/luminai?query=${encodeURIComponent(query)}&apikey=gifteddevskk`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      // Wait for 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.result; // Extract the text from the result part
      const message = `*Response:* \n\n${resultText}`;

      // Send the final response
      await m.send(message);
    } catch (e) {
      await m.error(`${e}\n\ncommand: lumine`, e);
    }
  }
);
smd(
  {
    pattern: "gemini",
    desc: "Get a response from Gemini AI based on user query.",
    category: "ai",
    filename: __filename,
  },
  async (m) => {
    try {
      // Extract the query from the message
      const query = m.text.split(' ').slice(1).join(' ');
      if (!query) {
        return await m.send("Please provide a query, e.g., `.gemini What is the weather today?`.");
      }

      // Send a loading message
      await m.send("katakuri is thinking 🤔");

      // Define the new API URL
      const apiUrl = `https://api.giftedtechnexus.co.ke/api/ai/geminiai?q=${encodeURIComponent(query)}&apikey=gifteddevskk`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      // Wait for 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.result; // Extract the text from the result part
      const message = `*Response:* \n\n${resultText}`;

      // Send the final response
      await m.send(message);
    } catch (e) {
      await m.error(`${e}\n\ncommand: gemini`, e);
    }
  }
);
smd(
  {
    pattern: "davinci",
    desc: "Get a response from Davinci AI based on user query.",
    category: "ai",
    filename: __filename,
  },
  async (m) => {
    try {
      // Extract the query from the message
      const query = m.text.split(' ').slice(1).join(' ');
      if (!query) {
        return await m.send("Please provide a query, e.g., `.davinci What is the meaning of life?`.");
      }

      // Send a loading message
      await m.send("katakuri is thinking 🤔");

      // Define the new API URL
      const apiUrl = `https://api.giftedtechnexus.co.ke/api/ai/davinci?q=${encodeURIComponent(query)}&apikey=gifteddevskk`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      // Wait for 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.result; // Extract the text from the result part
      const message = `*Response:* \n\n${resultText}`;

      // Send the final response
      await m.send(message);
    } catch (e) {
      await m.error(`${e}\n\ncommand: davinci`, e);
    }
  }
);
smd(
  {
    pattern: "simisi",
    desc: "Get a response from SimSimi AI based on user query.",
    category: "ai",
    filename: __filename,
  },
  async (m) => {
    try {
      // Extract the query from the message
      const query = m.text.split(' ').slice(1).join(' ');
      if (!query) {
        return await m.send("Please provide a query, e.g., `.simisi How are you?`.");
      }

      // Send a loading message
      await m.send("katakuri is thinking 🤔");

      // Define the new API URL
      const apiUrl = `https://api.giftedtechnexus.co.ke/api/ai/simsimi?query=${encodeURIComponent(query)}&apikey=gifteddevskk`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      // Wait for 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get the result from the API response
      const data = await response.json();
      const resultText = data.result; // Extract the text from the result part
      const message = `*Response:* \n\n${resultText}`;

      // Send the final response
      await m.send(message);
    } catch (e) {
      await m.error(`${e}\n\ncommand: simisi`, e);
    }
  }
);
smd(
  {
    pattern: "dalle",
    desc: "Generate an AI photo from text prompt.",
    category: "ai",
    filename: __filename,
    use: "<query>",
  },
  async (m, query) => {
    try {
      // Check if query is provided
      if (!query) {
        return await m.send("*_Please provide a prompt for the AI image generator!_*");
      }

      // Construct the API URL with the provided query
      const apiUrl = `https://api.giftedtechnexus.co.ke/api/ai/text2img?prompt=${encodeURIComponent(query)}&apikey=gifteddevskk`;
      
      // Fetch the response from the API
      const response = await fetch(apiUrl);

      // Check if the response is not OK
      if (!response.ok) {
        return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
      }

      // Get the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image')) {
        // If the response is an image, get the image URL
        const photoUrl = response.url;

        // Send the photo to the user
        await m.bot.sendFromUrl(
          m.from,
          photoUrl,
          "*KATAKURI_MD generated this photo*:",
          m,
          {},
          "image"
        );
      } else if (contentType && contentType.includes('application/json')) {
        // If the response is JSON, parse it
        const data = await response.json();

        // Check if the status in the response data is not 200
        if (data.status !== 200) {
          return await m.send("*_An error occurred while fetching the data._*");
        }

        // Get the photo URL from the response data
        const photoUrl = data.result;

        // Send the photo to the user
        await m.bot.sendFromUrl(
          m.from,
          photoUrl,
          "*KATAKURI_MD generated this photo*:",
          m,
          {},
          "image"
        );
      } else {
        // Handle unexpected content types
        return await m.send("*_Unexpected content type received from the API._*");
      }
    } catch (e) {
      // Log the error and send an error message to the user
      console.error(e);
      await m.error(`${e}\n\ncommand:  dalle`, e);
    }
  }
);
  smd(
    {
      pattern: "anonymsg",
      alias: ["recognition", "anonychat"],
      desc: "Send message Annonymously",
      category: "ai",
      use: "<Hii, Astro>",
      filename: __filename,
    },
    async (_0x358984, _0x20693a, { smd: _0x12d243 }) => {
      try {
        let _0x32512b = _0x20693a ? _0x20693a : _0x358984.reply_text;
        if (!_0x32512b) {
          return await _0x358984.send(
            "*provide number with msg to send Anonymously.* \n*Example " +
              (prefix + _0x12d243) +
              " 2348039607375,your_Message*",
            {},
            "",
            _0x358984
          );
        }
        if (_0x358984.isCreator && _0x32512b === "info") {
          return await _0x358984.reply(
            isAnnonyMsgAlive == ""
              ? "*Theres no Anonymous Chat created yet*"
              : "*Anonymous Chat Recivers*\n_" + isAnnonyMsgAlive + "_"
          );
        }
        const _0x201d91 = _0x32512b.indexOf(",");
        if (_0x201d91 === -1) {
          return await _0x358984.reply(
            "*Invalid format. Please provide both number and Message separated by a comma.*"
          );
        }
        let _0x12e2ef = _0x32512b.slice(0, _0x201d91).trim() + "@s.whatsapp.net";
        let _0x5f656f = _0x32512b.slice(_0x201d91 + 1).trim();
        let _0x48975a = (await parsedJid(_0x12e2ef)) || [];
        if (_0x48975a[0]) {
          const { date: _0xbcd286, time: _0x47ad13 } = await getDateTime();
          const _0x3e1b1c =
            "anony-msg-" + Math.floor(100000 + Math.random() * 900000);
          astro_patch_AnonyMsg[_0x3e1b1c] = new AnonymousMsg();
          let _0x3079e2 = astro_patch_AnonyMsg[_0x3e1b1c];
          _0x3079e2.id = _0x3e1b1c;
          _0x3079e2.sender = _0x358984.sender;
          _0x3079e2.reciever = _0x48975a[0];
          _0x3079e2.msgStatus = true;
          _0x3079e2.senderMsg = _0x358984;
          _0x5f656f =
            "*KATAKURI_MDᴅ • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ*\n\n*Msg_Id:* " +
            _0x3079e2.id +
            "\n*Date:* _" +
            _0xbcd286 +
            "_\n*Time:* _" +
            _0x47ad13 +
            "_\n\n*Message:* " +
            _0x5f656f +
            "\n\n\n" +
            Config.caption;
          isAnnonyMsgAlive = isAnnonyMsgAlive + "," + _0x3079e2.reciever;
          await _0x358984.bot.sendMessage(_0x3079e2.reciever, {
            text: _0x5f656f,
          });
          return await _0x358984.reply("*_Anonymous message sent succesfully_*");
        } else {
          return await _0x358984.reply("*_Provided number is not valid!!!_*");
        }
      } catch (_0x51ed58) {
        await _0x358984.error(
          _0x51ed58 + "\n\ncommand: " + _0x12d243,
          _0x51ed58,
          "*_Can't send annonymously message yet, Sorry!!_*"
        );
      }
    }
  );
  smd(
    {
      on: "text",
    },
    async (_0x2acf30) => {
      try {
        if (
          _0x2acf30.quoted &&
          isAnnonyMsgAlive.includes(_0x2acf30.sender) &&
          _0x2acf30.text.length > 2
        ) {
          const _0x2dfb59 = _0x2acf30.reply_text.split("\n");
          if (_0x2dfb59.length < 3) {
            return;
          }
          if (
            _0x2acf30.reply_text.includes("KATAKURI_MD• ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ") &&
            _0x2dfb59[0].includes("KATAKURI_MD • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ") &&
            _0x2dfb59[2].includes("Msg_Id")
          ) {
            let _0x1b0d01 = "" + _0x2dfb59[2].replace("*Msg_Id:* ", "").trim();
            let _0x2ecd2a = astro_patch_AnonyMsg[_0x1b0d01];
            if (!_0x2ecd2a) {
              return;
            }
            try {
              if (_0x2ecd2a) {
                let _0x13a11c = _0x2acf30.text.split(",")[0].trim();
                if (_0x13a11c.toLowerCase().startsWith("reply")) {
                  _0x2ecd2a.howmanyreply += 1;
                  const _0x5a2204 = _0x2acf30.text.indexOf(",");
                  let _0x3f6b59 =
                    "*KATAKURI_MD • ʏᴏᴜʀ ᴀɴᴏɴʏ-ᴍsɢ ʀᴇᴘʟʏ*\n\n*_From @" +
                    _0x2ecd2a.reciever.split("@")[0] +
                    "_*\n*_Msg_Id: " +
                    _0x2ecd2a.id +
                    "_*\n\n*Message:* " +
                    _0x2acf30.text.slice(_0x5a2204 + 1).trim() +
                    "\n\n\n\n" +
                    Config.caption;
                  if (_0x2ecd2a.howmanyreply >= 2) {
                    isAnnonyMsgAlive = isAnnonyMsgAlive.replace(
                      "," + _0x2acf30.sender,
                      ""
                    );
                  }
                  await _0x2acf30.bot.sendMessage(
                    _0x2ecd2a.sender,
                    {
                      text: _0x3f6b59,
                      mentions: [_0x2ecd2a.reciever],
                    },
                    {
                      quoted: _0x2ecd2a.senderMsg,
                    }
                  );
                  if (_0x2ecd2a.howmanyreply >= 2) {
                    isAnnonyMsgAlive = isAnnonyMsgAlive.replace(
                      "," + _0x2acf30.sender,
                      ""
                    );
                    delete astro_patch_AnonyMsg[_0x1b0d01];
                  }
                  return await _0x2acf30.reply(
                    "*_Your Message succesfully deliver to User_* " +
                      (_0x2ecd2a.howmanyreply == 1
                        ? "\n*you can reply 1 more time*"
                        : "") +
                      " "
                  );
                } else if (_0x2ecd2a.tellinfo === 0) {
                  _0x2ecd2a.tellinfo = 1;
                  let _0x362db6 =
                    "*Basically, Its an Annonymous Message*\n\n_Msg_Id: " +
                    _0x2ecd2a.id +
                    "_\n_this message sended by a chatbot_\n_User not wants to expose itself to send that msg_\n\n\n*if you wanna reply to that user,*\n*Send msg by replying to above message*\n*Type like:* reply, Type_your_Message_Here\n*Example:* reply, Can you text me from your number\n\n\n" +
                    Config.caption;
                  _0x2acf30.bot.sendMessage(
                    _0x2ecd2a.reciever,
                    {
                      text: _0x362db6,
                    },
                    {
                      quoted: _0x2acf30,
                    }
                  );
        }
        
  
