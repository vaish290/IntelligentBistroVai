const { getMenu } = require("./menuServices");
const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function validateActions(actions, menu) {
  const validActions = [];

  for (const action of actions || []) {
    if (
      ![
        "ADD_ITEM",
        "REMOVE_ITEM",
        "UPDATE_QUANTITY",
        "CLEAR_CART",
      ].includes(action.type)
    ) {
      continue;
    }

    if (action.type === "CLEAR_CART") {
      validActions.push({
        type: "CLEAR_CART",
      });

      continue;
    }

    const menuItem = menu.find(
      (item) => item.id === action.itemId
    );

    if (!menuItem) {
      continue;
    }

    if (action.type === "ADD_ITEM") {
      const quantity = Number(action.quantity);

      if (!Number.isInteger(quantity) || quantity <= 0) {
        continue;
      }

      validActions.push({
        type: "ADD_ITEM",
        itemId: menuItem.id,
        itemName: menuItem.name,
        quantity: quantity,
      });
    }

    else if (action.type === "REMOVE_ITEM") {
      validActions.push({
        type: "REMOVE_ITEM",
        itemId: menuItem.id,
        itemName: menuItem.name,
      });
    }

    else if (action.type === "UPDATE_QUANTITY") {
      const quantity = Number(action.quantity);

      if (!Number.isInteger(quantity) || quantity <= 0) {
        continue;
      }

      validActions.push({
        type: "UPDATE_QUANTITY",
        itemId: menuItem.id,
        itemName: menuItem.name,
        quantity: quantity,
      });
    }
  }

  return validActions;
}

async function parseOrderMessage(message, cart) {
  const menu = await getMenu();
  const menuContext = menu.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
  }));

  const prompt = `
You are an AI ordering assistant for a vegetarian restaurant.

Restaurant menu:
${JSON.stringify(menuContext, null, 2)}

Current cart:
${JSON.stringify(cart, null, 2)}

Your job is to understand the user's request and convert it into structured cart actions.

Allowed actions:
- ADD_ITEM
- REMOVE_ITEM
- UPDATE_QUANTITY
- CLEAR_CART

Rules:
1. Only use items from the restaurant menu.
2. Never invent menu items.
3. Quantities must be positive integers.
4. If the user asks to add an item, use ADD_ITEM.
5. If the user asks to remove an item, use REMOVE_ITEM.
6. If the user asks to change or set quantity, use UPDATE_QUANTITY.
7. If the user asks to clear the cart, use CLEAR_CART.
8. If the request cannot be understood, return an empty actions array.
9. Return JSON only.

Return this format:

{
  "intent": "cart_update",
  "reply": "short response",
  "actions": [
    {
      "type": "ADD_ITEM",
      "itemId": "menu item id",
      "itemName": "menu item name",
      "quantity": 1
    }
  ]
}

User message:
"${message}"
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {
      type: "json_object",
    },
    temperature: 0,
  });

  const content = completion.choices[0].message.content;

  const parsedResponse = JSON.parse(content);

  const validatedActions = validateActions(
    parsedResponse.actions,
    menu
  );

  return {
    intent:
      validatedActions.length > 0
        ? parsedResponse.intent
        : "unknown",

    reply:
      validatedActions.length > 0
        ? parsedResponse.reply
        : "I couldn't process that request.",

    actions: validatedActions,
  };
}

module.exports = parseOrderMessage;