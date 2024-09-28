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
      const apiUrl = `https://api-gifted-tech.onrender.com/api/ai/gpt4?q=${encodeURIComponent(query)}&apikey=gifteddevskk`;
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
    const apiUrl = `https://api-gifted-tech.onrender.com/api/tools/removebg?url=${encodeURIComponent(mediaUrl.url)}&apikey=gifteddevskk`;

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
      const apiUrl = `https://api-gifted-tech.onrender.com/api/ai/sd?prompt=${encodeURIComponent(query)}&apikey=gifteddevskk`;
      
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
      const apiUrl = `https://api-gifted-tech.onrender.com/api/ai/luminai?query=${encodeURIComponent(query)}&apikey=gifteddevskk`;
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
      const apiUrl = `https://api-gifted-tech.onrender.com/api/ai/geminiai?q=${encodeURIComponent(query)}&apikey=gifteddevskk`;
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
      const apiUrl = `https://api-gifted-tech.onrender.com/api/ai/davinci?q=${encodeURIComponent(query)}&apikey=gifteddevskk`;
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
      await m.send("Katakuri is thinking 🤔");

      // Define the new API URL
      const apiUrl = `https://api-gifted-tech.onrender.com/api/ai/simsimi?query=${encodeURIComponent(query)}&apikey=gifteddevskk`;
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
      const apiUrl = `https://api-gifted-tech.onrender.com/api/ai/text2img?prompt=${encodeURIComponent(query)}&apikey=gifteddevskk`;
      
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
            _0x2acf30.reply_text.includes("KATAKURI_MD • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ") &&
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
                } else if (_0x2ecd2a.tellinfo === 1) {
                  _0x2ecd2a.tellinfo = 2;
                  _0x2acf30.reply(
                    "*Please follow the format if reply to msg*\n*Type like: _reply, Type_your_Message_Here_*"
                  );
                }
              }
            } catch (_0x58832f) {
              console.log("error : ", _0x58832f);
            }
          }
        }
      } catch {}
    }
  );
  
  smd(
    {
      pattern: "advt",
      alias: ["advertisement"],
      category: "ai",
      desc: "Advertise of your Message, by sending it to provided nmbr range.",
      use: "234803xx,Your_text_here",
      fromMe: true,
      filename: __filename,
    },
    async (_0x165087, _0x13462a) => {
      try {
        let _0x14810d = _0x13462a ? _0x13462a : _0x165087.reply_text;
        if (!_0x14810d) {
          return await _0x165087.reply(
            "*Advertise of your Message*\n*by sending it to provided nmbr range.*\n" +
              prefix +
              "advt 234803xx,Your_text_here"
          );
        }
        const _0x94ba67 = _0x14810d.indexOf(",");
        if (_0x94ba67 === -1) {
          return await _0x165087.send(
            "*Invalid format. Please provide number and Message separated by a comma.*"
          );
        }
        let _0xd9b857 = "" + _0x14810d.slice(0, _0x94ba67).trim();
        let _0x321dea =
          _0x14810d.slice(_0x94ba67 + 1).trim() + "\n\n\n" + Config.caption;
        if (!_0xd9b857.includes("x")) {
          return _0x165087.send(
            "*You did not add x in number.*\n*Ex: " +
              prefix +
              "advt 234803xx,Your_Message_here*  \n " +
              Config.caption
          );
        }
        await _0x165087.send(
          "*Sending message to given number range.!*\n*It may take some time, so wait please*"
        );
        function _0x4affa2(_0x9f9b09, _0x557f5a) {
          return _0x9f9b09.split(_0x557f5a).length - 1;
        }
        var _0x43ad94 = _0xd9b857.split("x")[0];
        var _0x1d8f31 = _0xd9b857.split("x")[_0x4affa2(_0xd9b857, "x")]
          ? _0xd9b857.split("x")[_0x4affa2(_0xd9b857, "x")]
          : "";
        var _0x43415b = _0x4affa2(_0xd9b857, "x");
        var _0x4f926f;
        if (_0x43415b == 1) {
          _0x4f926f = 10;
        } else if (_0x43415b == 2) {
          _0x4f926f = 100;
        } else if (_0x43415b == 3) {
          _0x4f926f = 1000;
        } else if (_0x43415b > 3) {
          return await _0x165087.send("*Only 3(x) are Allowed in number*");
        }
        let _0x1e111b = 0;
        let _0x5c0975 = "";
        var _0x5b9d27 = "";
        for (let _0x3e0552 = 0; _0x3e0552 < _0x4f926f; _0x3e0552++) {
          var _0x4d017c = await _0x165087.bot.onWhatsApp(
            "" + _0x43ad94 + _0x3e0552 + _0x1d8f31 + "@s.whatsapp.net"
          );
          if (_0x4d017c[0]) {
            _0x5b9d27 = _0x4d017c[0].jid;
            if (_0x5c0975.includes(_0x5b9d27)) {
              continue;
            }
            await sleep(1500);
            await _0x165087.bot.sendMessage(_0x5b9d27, {
              text: _0x321dea,
            });
            _0x5c0975 = _0x5c0975 + "," + _0x5b9d27;
            _0x1e111b += 1;
          }
        }
        return await _0x165087.send(
          "*_Advertisement of your Message is Done,_* \n\n*_Message Succesfully sent to " +
            _0x1e111b +
            " chats_*\nLast_User: " +
            _0x5b9d27.split("@")[0] +
            "\nSearch_No: " +
            _0x4f926f +
            " number searched\n\n\n" +
            Config.caption
        );
      } catch (_0xfcb50a) {
        await _0x165087.error(
          _0xfcb50a + "\n\ncommand: dalle",
          _0xfcb50a,
          "*_No responce from Server side, Sorry!!_*"
        );
      }
    }
  );
  async function processing(_0x2f3dd0, _0x615984) {
    try {
      const _0x19a878 = require("form-data");
      return new Promise(async (_0x41cb49, _0x35934d) => {
        Form = new _0x19a878();
        scheme = "https://inferenceengine.vyro.ai/" + _0x615984;
        Form.append("model_version", 1, {
          "Content-Transfer-Encoding": "binary",
          contentType: "multipart/form-data; charset=uttf-8",
        });
        Form.append("image", Buffer.from(_0x2f3dd0), {
          filename: _0x615984 + ".jpg",
          contentType: "image/jpeg",
        });
        Form.submit(
          {
            url: scheme,
            host: "inferenceengine.vyro.ai",
            path: "/" + _0x615984,
            protocol: "https:",
            headers: {
              "User-Agent": "okhttp/4.9.3",
              Connection: "Keep-Alive",
              "Accept-Encoding": "gzip",
            },
          },
          function (_0x9b5341, _0x51434f) {
            if (_0x9b5341) {
              _0x35934d();
            }
            let _0x567d22 = [];
            _0x51434f
              .on("data", function (_0x2b5127, _0x4d261c) {
                _0x567d22.push(_0x2b5127);
              })
              .on("end", () => {
                _0x41cb49(Buffer.concat(_0x567d22));
              })
              .on("error", (_0x403a63) => {
                _0x35934d();
              });
          }
        );
      });
    } catch (_0x2c5371) {
      console.log(_0x2c5371);
      return _0x2f3dd0;
    }
  }
  smd(
    {
      cmdname: "remini",
      desc: "enhance image quality!",
      type: "ai",
      filename: __filename,
    },
    async (_0x1bd29b) => {
      let _0x4da3a4 = _0x1bd29b.image ? _0x1bd29b : _0x1bd29b.reply_message;
      if (!_0x4da3a4 || !_0x4da3a4.image) {
        return await _0x1bd29b.send("*Reply to image, to enhance quality!*");
      }
      try {
        let _0x5b1096 = await _0x4da3a4.download();
        const _0x1ac1f7 = await processing(_0x5b1096, "enhance");
        await _0x1bd29b.send(_0x1ac1f7, {}, "img", _0x1bd29b);
        _0x5b1096 = false;
      } catch (_0x4eecc9) {
        _0x1bd29b.error(
          _0x4eecc9 + "\n\nCommand: remini",
          _0x4eecc9,
          "*Process Denied :(*"
        );
      }
    }
  );
  smd(
    {
      cmdname: "dehaze",
      desc: "enhance image quality!",
      type: "ai",
      filename: __filename,
    },
    async (_0x2a1135) => {
      let _0xa78bb3 = _0x2a1135.image ? _0x2a1135 : _0x2a1135.reply_message;
      if (!_0xa78bb3 || !_0xa78bb3.image) {
        return await _0x2a1135.send("*Reply to image, to enhance quality!*");
      }
      try {
        let _0x4e83ce = await _0xa78bb3.download();
        const _0x65b7b8 = await processing(_0x4e83ce, "dehaze");
        await _0x2a1135.send(_0x65b7b8, {}, "img", _0x2a1135);
        _0x4e83ce = false;
      } catch (_0x44fb27) {
        _0x2a1135.error(
          _0x44fb27 + "\n\nCommand: dehaze",
          _0x44fb27,
          "*Process Denied :(*"
        );
      }
    }
  );
  smd(
    {
      cmdname: "recolor",
      desc: "enhance image quality!",
      type: "ai",
      filename: __filename,
    },
    async (_0x18f8e1) => {
      let _0x220e4a = _0x18f8e1.image ? _0x18f8e1 : _0x18f8e1.reply_message;
      if (!_0x220e4a || !_0x220e4a.image) {
        return await _0x18f8e1.send("*Reply to image, to enhance quality!*");
      }
      try {
        let _0x38f64d = await _0x220e4a.download();
        const _0x51042 = await processing(_0x38f64d, "recolor");
        await _0x18f8e1.send(_0x51042, {}, "img", _0x18f8e1);
        _0x38f64d = false;
      } catch (_0x4a62c8) {
        _0x18f8e1.error(
          _0x4a62c8 + "\n\nCommand: recolor",
          _0x4a62c8,
          "*Process Denied :(*"
        );
      }
    }
  );
smd(
  {
    pattern: "blackbox",
    desc: "Get a response from BlackBox AI based on user query.",
    category: "ai",
    filename: __filename,
  },
  async (m) => {
    try {
      // Extract the query from the message
      const query = m.text.split(' ').slice(1).join(' ');
      if (!query) {
        return await m.send("Please provide a query, e.g., `.blackbox What is the weather today?`.");
      }

      // Send a loading message
      await m.send("katakuri is thinking 🤔");

      // Define the API URL
      const apiUrl = `https://api-gifted-tech.onrender.com/api/ai/blackbox?q=${encodeURIComponent(query)}&apikey=gifteddevskk`;
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
      await m.error(`${e}\n\ncommand: blackbox`, e);
    }
  }
);
