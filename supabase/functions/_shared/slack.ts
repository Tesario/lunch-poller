import { WebClient } from "https://deno.land/x/slack_web_api@6.7.2/mod.js";

export const LUNCH_CHANNEL_ID = "C25JXQX7H";

const SLACK_BOT_TOKEN = Deno.env.get("SLACK_BOT_TOKEN") ?? "";

export const slackBotClient = new WebClient(SLACK_BOT_TOKEN);

export const getSlackUsers = async (): Promise<any> => {
  const users = await slackBotClient.users.list({
    limit: 250,
  });

  if (!users || !users?.ok) {
    throw new Error("Unable to get Slack users");
  }

  return users.members;
};
