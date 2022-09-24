import { createBot } from "./bot.ts";
import { compose, Middleware, on, using } from "./compose.ts";

import { Context } from "./context.ts";
import { Client } from "./deps.ts";
import { editedMessage, message } from "./filters.ts";

const client = new Client("");

interface Plugin0Data {
  value: number;
}
function plugin0<C extends Context>(
  middleware: Middleware<C & Plugin0Data>,
) {
  return using<C, Plugin0Data>(() => ({ value: 0 }), middleware);
}

interface Plugin1Data {
  name: string;
}
function plugin1<C extends Context>(
  middleware: Middleware<C & Plugin1Data>,
) {
  return using<C, Plugin1Data>(() => ({ name: "" }), middleware);
}

const receiveUpdate = await createBot(
  client,
  plugin0(
    plugin1(compose(
      (next) => (ctx) => {
        ctx.value = 42;
        return next(ctx);
      },
      (next) => (ctx) => {
        ctx.name = "uhm";
        return next(ctx);
      },
      on(
        message(),
        (_next) => (ctx) =>
          ctx.api.sendMessage({
            chat_id: ctx.message.chat.id,
            text: "Got your message",
          }),
      ),
      on(
        editedMessage(),
        (_next) => (ctx) =>
          ctx.api.sendMessage({
            chat_id: ctx.editedMessage.chat.id,
            text: "Saw your edit",
          }),
      ),
    )),
  ),
);

const response = await client.call("getUpdates", {});
if (response.ok) {
  for (const update of response.result) {
    await receiveUpdate(update);
  }
}
