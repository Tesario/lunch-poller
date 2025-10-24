import { getSlackUsers, slackBotClient } from "../_shared/slack.ts";

export async function vote(payload: any) {
      const users = await getSlackUsers();

      const user = users.find((user: any) => user.id === payload.user.id);

      const votesBlockId = payload.message.blocks.findIndex(
        (block: any) => block.accessory?.value === payload.actions[0].value,
      ) + 1;

      const newBlocks = payload.message.blocks;
      newBlocks[votesBlockId].elements = newBlocks[votesBlockId].elements
        .filter((
          element: any,
        ) => element.type === "image");

      const isUserPresent = !!newBlocks[votesBlockId].elements.find((
        element: any,
      ) => element.alt_text === user.profile.real_name);

      if (isUserPresent) {
        newBlocks[votesBlockId].elements = newBlocks[votesBlockId].elements
          .filter((element: any) =>
            element.alt_text !== user.profile.real_name
          );
      } else {
        newBlocks[votesBlockId].elements.push({
          type: "image",
          image_url: user.profile.image_48,
          alt_text: user.profile.real_name,
        });
      }

      const numberOfVotes = newBlocks[votesBlockId].elements.length;
      const votesElement = numberOfVotes > 0
        ? {
          type: "plain_text",
          text: `${numberOfVotes} vote${numberOfVotes === 1 ? "" : "s"}`,
          emoji: true,
        }
        : { type: "mrkdwn", text: "No votes", verbatim: false };

      newBlocks[votesBlockId].elements.push(votesElement);

      await slackBotClient.chat.update({
        channel: payload.channel.id,
        ts: payload.message.ts,
        blocks: newBlocks,
      });
}