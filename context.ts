/** @deprecated @file */
import { type TelegramP, type Update, type UserFromGetMe } from "./deps.ts";
import type { Deunionize } from "./deunionize.ts";

export type { Update };

export type Prop<
  // deno-lint-ignore ban-types
  T extends object | undefined,
  P extends PropertyKey,
> = T extends Partial<Record<P, unknown>> ? T[P] : undefined;

export class Context {
  constructor(
    readonly update: Deunionize<Update>,
    readonly api: TelegramP,
    readonly botInfo: UserFromGetMe,
  ) {}

  get message() {
    return this.update.message as Prop<this["update"], "message">;
  }

  get editedMessage() {
    return this.update.edited_message as Prop<this["update"], "edited_message">;
  }

  get inlineQuery() {
    return this.update.inline_query as Prop<this["update"], "inline_query">;
  }

  get shippingQuery() {
    return this.update.shipping_query as Prop<this["update"], "shipping_query">;
  }

  get preCheckoutQuery() {
    return this.update.pre_checkout_query as Prop<
      this["update"],
      "pre_checkout_query"
    >;
  }

  get chosenInlineResult() {
    return this.update.chosen_inline_result as Prop<
      this["update"],
      "chosen_inline_result"
    >;
  }

  get channelPost() {
    return this.update.channel_post as Prop<this["update"], "channel_post">;
  }

  get editedChannelPost() {
    return this.update.edited_channel_post as Prop<
      this["update"],
      "edited_channel_post"
    >;
  }

  get callbackQuery() {
    return this.update.callback_query as Prop<this["update"], "callback_query">;
  }

  get poll() {
    return this.update.poll as Prop<this["update"], "poll">;
  }

  get pollAnswer() {
    return this.update.poll_answer as Prop<this["update"], "poll_answer">;
  }

  get myChatMember() {
    return this.update.my_chat_member as Prop<this["update"], "my_chat_member">;
  }

  get chatMember() {
    return this.update.chat_member as Prop<this["update"], "chat_member">;
  }

  get chatJoinRequest() {
    return this.update.chat_join_request as Prop<
      this["update"],
      "chat_join_request"
    >;
  }
}
