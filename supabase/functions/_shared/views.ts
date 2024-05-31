export const VOTE_VIEW = {
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Where do we want to go for lunch? *Vote now!*",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: ":sushi: *Ace Wasabi Rock-n-Roll Sushi Bar*\nThe best landlocked sushi restaurant.",
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          emoji: true,
          text: "Vote",
        },
        value: "click_me_123",
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "image",
          image_url:
            "https://api.slack.com/img/blocks/bkb_template_images/profile_1.png",
          alt_text: "Michael Scott",
        },
        {
          type: "image",
          image_url:
            "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
          alt_text: "Dwight Schrute",
        },
        {
          type: "image",
          image_url:
            "https://api.slack.com/img/blocks/bkb_template_images/profile_3.png",
          alt_text: "Pam Beasely",
        },
        {
          type: "plain_text",
          emoji: true,
          text: "3 votes",
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: ":hamburger: *Super Hungryman Hamburgers*\nOnly for the hungriest of the hungry.",
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          emoji: true,
          text: "Vote",
        },
        value: "click_me_123",
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "image",
          image_url:
            "https://api.slack.com/img/blocks/bkb_template_images/profile_4.png",
          alt_text: "Angela",
        },
        {
          type: "image",
          image_url:
            "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
          alt_text: "Dwight Schrute",
        },
        {
          type: "plain_text",
          emoji: true,
          text: "2 votes",
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: ":ramen: *Kagawa-Ya Udon Noodle Shop*\nDo you like to shop for noodles? We have noodles.",
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          emoji: true,
          text: "Vote",
        },
        value: "click_me_123",
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
          value: "click_me_123",
        },
      ],
    },
  ],
};
