require("dotenv").config();

const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

const EIGHT_BALL_RESPONSES = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful.",
    "HELL NAH!"
];

const BREAKING_NEWS_HEADLINES = [
    "Local man discovers `Ctrl+Z` exists. 2 years too late",
    "Scientists confirm: The group caht never actually sleeps",
    "The group chat got leaked. Authorities looking for members.",
    "New study shows that 90% of people are terrible at using the internet",
    "Area WiFi router is sentient. It has been demanding more bandwidth.",
    "Area WiFi router declared indepedence, demands recognition from the U.N",
    "Man convinced his code works, the code disagrees",
    "Breaking: Local microwave outlives 3 relationships",
    "Community shaken after a local actually reads Terms and Conditions",
    "Man opens 47 tabs 'Just to check 1 thing'",
    "Experts baffled as coffee fails to fix everything, again",
    "Local cat declares war on nothing in particular. The cat won",
    "Man says 'I'll sleep when i'm dead' regrets statement by 3 AM",
    "Breaking: Someone in this server still hasn't touched grass"
];

const DIAGNOSIS = [
    "Chronic Mondayitis. Prognosis: will persist until Friday.",
    "Acute RAM Hoarder Syndrome. 47 browser tabs opened, none of them needed.",
    "Terminal case of Doomscrolling. Prognosis: will persist until you put down your phone.",
    "Terminal case of `I'll fix this later.` Its been 3 months.",
    "Advance Keyboard Warrior Disorder. Symptoms include typing at 140wpm",
    "Servere Caffeine Difciency. Immediate coffee (or tea) intervention required.",
    "Early onset of Procrastinitis. Complicated by Doomscrolling or a secondary Netflix infection.",
    "Diagnosed with a servere case of `I use arch btw`. Prognosis: will persist until you switch to a more user friendly Linux distro.",
    "Stage 4 Ihatewindowsitis. Prognosis: will persist until you switch to Linux.",
    "Diagnosed with Terminal uniqueness. There is no cure",
    "Presenting with symptoms of Compulsive Lurking Disorder. Always online never chatting.",
    "Confirmed case of Chronic `It works on my machine` Syndrome.",
    "Diagnosed with Rare Main Character Energy, in remission since last Tuesday."
];

app.command("/slackinpancake-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/slackinpancake-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/slackinpancake-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});

app.command("/slackinpancake-8ball", async ({ command, ack, respond }) => {
    await ack();

    const question = command.text.trim();

    if (!question) {
        await respond({ text: "You need to ask a question, e.g. `/slackinpancake-8ball Will I win the lottery?`" });
        return;
    }

    const answer = EIGHT_BALL_RESPONSES[Math.floor(Math.random() * EIGHT_BALL_RESPONSES.length)];

    await respond({ text: `🎱 Question: ${question}\nAnswer: ${answer}` });
});

app.command("/slackinpancake-breakingnews", async ({ ack, respond }) => {
    await ack();

    const headline = BREAKING_NEWS_HEADLINES[Math.floor(Math.random() * BREAKING_NEWS_HEADLINES.length)];

    await respond({ text: `📰 Breaking News: ${headline}` });
});

app.command("/slackinpancake-diagnosis", async ({ ack, respond }) => {
    await ack();

    const diagnosis = DIAGNOSIS[Math.floor(Math.random() * DIAGNOSIS.length)];

    await respond({ text: `🩺 Diagnosis: ${diagnosis}` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
