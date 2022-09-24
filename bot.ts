import { type Middleware } from "./compose.ts";
import { Context } from "./context.ts";
import { type Client, createApi, type Update } from "./deps.ts";

export async function noop() {}

export async function createBot(
  client: Readonly<Client>,
  middleware: Middleware<Context>,
) {
  const handler = middleware(noop);
  const api = createApi(client);
  const botInfo = await api.getMe({});
  return (update: Update) => handler(new Context(update, api, botInfo));
}
