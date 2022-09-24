// deno-lint-ignore-file ban-types
import type {
  CommonMessageBundle,
  Message,
  Update,
} from "https://esm.sh/typegram@^3.12";
import type { Deunionize, UnionKeys } from "./deunionize.ts";

type DistinctKeys<T extends object> = Exclude<UnionKeys<T>, keyof T>;

type Keyed<T extends object, K extends DistinctKeys<T>> =
  & Record<K, {}>
  & Deunionize<Record<K, {}>, T>;

export const message =
  <K extends DistinctKeys<Message>, Ks extends K[]>(...keys: Ks) =>
  (
    update: Update,
  ): update is Update.MessageUpdate<Keyed<Message, Ks[number]>> => {
    if (!("message" in update)) return false;
    for (const key of keys) {
      if (!(key in update.message)) return false;
    }
    return true;
  };

export const editedMessage =
  <K extends DistinctKeys<CommonMessageBundle>, Ks extends K[]>(...keys: Ks) =>
  (
    update: Update,
  ): update is Update.EditedMessageUpdate<
    Keyed<CommonMessageBundle, Ks[number]>
  > => {
    if (!("edited_message" in update)) return false;
    for (const key of keys) {
      if (!(key in update.edited_message)) return false;
    }
    return true;
  };

export const channelPost =
  <K extends DistinctKeys<Message>, Ks extends K[]>(...keys: Ks) =>
  (
    update: Update,
  ): update is Update.ChannelPostUpdate<Keyed<Message, Ks[number]>> => {
    if (!("channel_post" in update)) return false;
    for (const key of keys) {
      if (!(key in update.channel_post)) return false;
    }
    return true;
  };

export const editedChannelPost =
  <K extends DistinctKeys<CommonMessageBundle>, Ks extends K[]>(...keys: Ks) =>
  (
    update: Update,
  ): update is Update.EditedChannelPostUpdate<
    Keyed<CommonMessageBundle, Ks[number]>
  > => {
    if (!("edited_channel_post" in update)) return false;
    for (const key of keys) {
      if (!(key in update.edited_channel_post)) return false;
    }
    return true;
  };
