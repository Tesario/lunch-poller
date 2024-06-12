export const getModalView = (restaurants: any) => {
  const options = restaurants.map((r: any) => (
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
    title: {
      type: "plain_text",
      text: "Add new suggestion",
      emoji: true,
    },
    submit: {
      type: "plain_text",
      text: "Submit",
      emoji: true,
    },
    type: "modal",
    close: {
      type: "plain_text",
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Pick an restaurant from the list",
        },
        accessory: {
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "Select an item",
            emoji: true,
          },
          options: options,
          action_id: "static_select-action",
        },
      },
    ],
  });
};

export const getPollViewMessage = (randomRestaurants: any) => [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `${randomRestaurants[0].name} | <${
        randomRestaurants[0].url
      }|Menu :link:>`,
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        emoji: true,
        text: "Vote",
      },
      value: "vote_1",
    },
  },
  {
    type: "context",
    elements: [
      {
        type: "plain_text",
        emoji: true,
        text: "No votes",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `${randomRestaurants[1].name} | <${
        randomRestaurants[1].url
      }|Menu :link:>`,
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        emoji: true,
        text: "Vote",
      },
      value: "vote_2",
    },
  },
  {
    type: "context",
    elements: [
      {
        type: "plain_text",
        emoji: true,
        text: "No votes",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `${randomRestaurants[2].name} | <${
        randomRestaurants[2].url
      }|Menu :link:>`,
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        emoji: true,
        text: "Vote",
      },
      value: "vote_3",
    },
  },
  {
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: "No votes",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    type: "actions",
    elements: [
      {
        type: "button",
        text: {
          type: "plain_text",
          emoji: true,
          text: "Add a suggestion",
        },
        value: "add_suggestion",
      },
    ],
  },
];
