import { LUNCH_CHANNEL_ID, slackBotClient } from "../_shared/slack.ts";

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
      channel: LUNCH_CHANNEL_ID,
      trigger_id: triggerId,
      blocks: [
        {
          type: "section",
          text: {
            type: "plain_text",
            text: "Yo mama so fat, that your algorithms crash trying to find just one restaurant for her!",
          },
        },
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
      }
    );
  }
});
