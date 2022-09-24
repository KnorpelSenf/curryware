// deno-lint-ignore-file ban-types
import type { Update } from "https://esm.sh/typegram@^3.12";
import type { Context } from "./context.ts";

type Handler<C extends Context> = (ctx: C) => Promise<unknown> | unknown;
type EndoFunction<T> = (t: T) => T;

export type Extension<C extends Context, E extends object> = (ctx: C) => E;
export type Filter<U extends Update> = (update: Update) => update is U;
export type Middleware<C extends Context> = EndoFunction<Handler<C>>;

export function compose<T>(...fns: EndoFunction<T>[]): EndoFunction<T> {
  return (next: T) => fns.reduceRight((t, fn) => fn(t), next);
}

export function on<C extends Context, U extends Update>(
  filter: Filter<U>,
  middleware: Middleware<C & { update: U }>,
): Middleware<C> {
  return (next) => {
    const handler = middleware(next);
    return (ctx) =>
      filter(ctx.update) ? handler(ctx as C & { update: U }) : next(ctx);
  };
}

export function using<C extends Context, E extends object>(
  extension: Extension<C, E>,
  middleware: Middleware<C & E>,
): Middleware<C> {
  return (next) => {
    const handler = middleware(next);
    return (ctx) => handler(Object.assign(Object.create(ctx), extension(ctx)));
  };
}
