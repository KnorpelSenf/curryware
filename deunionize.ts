// deno-lint-ignore-file ban-types
export type UnionKeys<T> = T extends unknown ? keyof T : never;

type AddOptionalKeys<K extends PropertyKey> = { readonly [P in K]?: never };

/** @see https://millsp.github.io/ts-toolbelt/modules/union_strict.html */
export type Deunionize<
  B extends object | undefined,
  T extends B = B,
> = T extends object ? T & AddOptionalKeys<Exclude<UnionKeys<B>, keyof T>> : T;
