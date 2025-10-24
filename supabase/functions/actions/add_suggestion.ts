import { slackBotClient } from "../_shared/slack.ts";
import { getModalView } from "../_shared/views.ts";
import { supabase } from "../_shared/supabase.ts";

export async function addSuggestion(triggerId: string) {
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
    view: getModalView(restaurants.data),
    trigger_id: triggerId,
  });
}