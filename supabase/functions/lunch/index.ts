import { LUNCH_TEST_CHANNEL_ID, slackBotClient } from "../_shared/slack.ts";
import { VOTE_VIEW } from "../_shared/views.ts";

Deno.serve(async (req) => {
  try {
    const data = await req.text();
    const params = new URLSearchParams(data);

    const triggerId = params.get("trigger_id");

    if (!triggerId) {
      return new Response(null, {
        status: 400,
      });
    }

    // Send a successful match report
    await slackBotClient.chat.postMessage({
      channel: LUNCH_TEST_CHANNEL_ID,
      trigger_id: triggerId,
      blocks: [
        ...VOTE_VIEW.blocks,
      ],
    });

    return new Response(null, {
      status: 200,
    });
  } catch (error) {
    console.log(error);

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
