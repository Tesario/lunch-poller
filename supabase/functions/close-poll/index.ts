import { LUNCH_TEST_CHANNEL_ID, slackBotClient } from "../_shared/slack.ts";
import { getPollViewMessage } from "../_shared/views.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

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

    const supabase = createClient(
      Deno.env.get("SP_URL") ?? "",
      Deno.env.get("SP_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    const today = new Date();
    const endAt = today.setMinutes(today.getMinutes() + 2);
    const {data: pollData} = await supabase.from('Poll').insert({ end_at: new Date(endAt) }).select("id, created_at, end_at");

    const {data:restaurantData} = await supabase
      .from("Restaurant")
      .select("id, name, url");

    const shuffledRestaurants = restaurantData.sort(() => 0.5 - Math.random());
    const randomRestaurants = shuffledRestaurants.slice(0, 3);

    const {data: voteData} = await supabase.from("Vote").insert(randomRestaurants.map((restaurant)=>({restaurant_id: restaurant.id, poll_id: pollData[0].id})))

    // Send a successful match report
    await slackBotClient.chat.postMessage({
      channel: LUNCH_TEST_CHANNEL_ID,
      trigger_id: triggerId,
      blocks:  getPollViewMessage(randomRestaurants),
      unfurl_media: false,
      unfurl_links: false,
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
