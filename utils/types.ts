type IAtLeastOne<T, Keys extends keyof T = keyof T> = {
  [K in Keys]-?: Required<Pick<T, K>> &
    Partial<Record<Exclude<Keys, K>, undefined>>;
}[Keys];

type Maybe<T> = T | null;

type IOneOrMore<T> = T | T[];

export type { IAtLeastOne, Maybe, IOneOrMore };
