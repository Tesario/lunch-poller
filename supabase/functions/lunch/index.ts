import { LUNCH_CHANNEL_ID, slackBotClient } from "../_shared/slack.ts";
import { supabase } from "../_shared/supabase.ts";
import { getPollViewMessage } from "../_shared/views.ts";

Deno.serve(async () => {
  try {
    const { data: restaurantData } = await supabase
      .from("Restaurant")
      .select("id, name, url");

    const shuffledRestaurants = restaurantData?.sort(() => 0.5 - Math.random());
    const randomRestaurants = shuffledRestaurants?.slice(0, 3);

    // Send a successful match report
    const { ts } = await slackBotClient.chat.postMessage({
      channel: LUNCH_CHANNEL_ID,
      blocks: getPollViewMessage(randomRestaurants),
      unfurl_media: false,
      unfurl_links: false,
    });

    const today = new Date();
    const endAt = today.setMinutes(today.getMinutes() + 2);
    const { data: pollData } = await supabase.from("Poll").insert({
      end_at: new Date(endAt),
      ts,
    }).select("id").maybeSingle();

    await supabase.from("Vote").insert(
      randomRestaurants?.map((restaurant) => ({
        restaurant_id: restaurant.id,
        poll_id: pollData?.id,
      })),
    );

    const {data: oldPollData} = await supabase.from("Poll")
      .select("ts")
      .order("created_at", { ascending: false })
      .range(1, 1)
      .maybeSingle();
      
    // Delete old lunch poll
    if (oldPollData?.ts) {
      await slackBotClient.chat.delete({
        channel: LUNCH_CHANNEL_ID,
        ts: oldPollData.ts,
      });
    }
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
      { status: 500 },
    );
  }
});
