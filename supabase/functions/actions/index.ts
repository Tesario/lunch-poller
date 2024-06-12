import { getSlackUsers, slackBotClient } from "../_shared/slack.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";
import { getModalView } from "../_shared/views.ts";

Deno.serve(async (req) => {
  try {
    const data = await req.text();
    const params = new URLSearchParams(data);

    let payload: any = params.get("payload");
    if (!payload) {
      return new Response(null, {
        status: 400,
      });
    }
    payload = JSON.parse(payload);

    if (!payload) {
      return new Response(null, {
        status: 400,
      });
    }

    if (payload.type === "view_submission") {
      return new Response(null, {
        status: 200,
      });
    }
    if (payload.type !== "block_actions") {
      return new Response(null, {
        status: 200,
      });
    }
    if (payload.actions[0].value === "add_suggestion") {
      const supabase = createClient(
        Deno.env.get("SP_URL") ?? "",
        Deno.env.get("SP_ANON_KEY") ?? "",
        {
          global: {
            headers: { Authorization: req.headers.get("Authorization")! },
          },
        },
      );

      const lastPoll = await supabase.from("Poll").select("*").order("id", {
        ascending: false,
      }).limit(1);

      const votes = await supabase.from("Vote").select("*").eq(
        "poll_id",
        lastPoll?.data?.[0].id,
      );

      const votesString = votes.data?.map((vote) => vote.restaurant_id).join(
        ",",
      );

      const restaurants = await supabase.from("Restaurant").select("*").not(
        "id",
        "in",
        `(${votesString})`,
      );

      await slackBotClient.views.open({
        trigger_id: payload.trigger_id,
        view: getModalView(restaurants.data),
      });

      return new Response(null, {
        status: 200,
      });
    } else {
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

      return new Response(null, {
        status: 200,
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Something went wrong.",
        error: error.message,
      }),
      {
        status: 500,
      },
    );
  }
});
