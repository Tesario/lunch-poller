export const getModalView = (restaurants: any) => {
  const options = restaurants.map((r) => (
    {
      "text": {
        "type": "plain_text",
        "text": `${r.name}`,
        "emoji": true,
      },
      "value": `${r.id}`,
    }
  ));

  return ({
    "title": {
      "type": "plain_text",
      "text": "Enhance the poll",
      "emoji": true,
    },
    "submit": {
      "type": "plain_text",
      "text": "Submit",
      "emoji": true,
    },
    "type": "modal",
    "close": {
      "type": "plain_text",
      "text": "Cancel",
      "emoji": true,
    },
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Pick an restaurant from the list",
        },
        "accessory": {
          "type": "static_select",
          "placeholder": {
            "type": "plain_text",
            "text": "Select an item",
            "emoji": true,
          },
          "options": options,
          "action_id": "static_select-action",
        },
      },
    ],
  });
};
