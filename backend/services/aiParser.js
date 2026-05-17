const menu = require("../data/menu");

function getQuantity(text) {
  if (text.includes("one") || text.includes("1")) return 1;
  if (text.includes("two") || text.includes("2")) return 2;
  if (text.includes("three") || text.includes("3")) return 3;
  if (text.includes("four") || text.includes("4")) return 4;
  if (text.includes("five") || text.includes("5")) return 5;
  return 1;
}

function parseOrderMessage(message) {
  const text = message.toLowerCase();
  const actions = [];

  if (text.includes("clear")) {
    return {
      intent: "clear_cart",
      reply: "Done — I cleared your cart.",
      actions: [{ type: "CLEAR_CART" }],
    };
  }

  menu.forEach((item) => {
    if (text.includes(item.name.toLowerCase())) {
      const quantity = getQuantity(text);

      if (
        text.includes("make") ||
        text.includes("set") ||
        text.includes("change") ||
        text.includes("update") ||
        text.includes("quantity")
      ) {
        actions.push({
          type: "UPDATE_QUANTITY",
          itemId: item.id,
          itemName: item.name,
          quantity,
        });
      } else if (text.includes("remove")) {
        actions.push({
          type: "REMOVE_ITEM",
          itemId: item.id,
          itemName: item.name,
        });
      } else {
        actions.push({
          type: "ADD_ITEM",
          item,
          quantity,
        });
      }
    }
  });

  return {
    intent: actions.length > 0 ? "cart_update" : "unknown",
    reply:
      actions.length > 0
        ? "Done — I updated your cart."
        : "I could not find that item on the menu.",
    actions,
  };
}

module.exports = parseOrderMessage;