import { addSuggestion } from "./add_suggestion.ts";
import { vote } from "./vote.ts";

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
      await addSuggestion(payload.trigger_id);
      return new Response(null, {
        status: 200,
      });
    } else {
      await vote(payload)
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
