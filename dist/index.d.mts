export type Processor<T> = (name: string, args: T[], isLocal: boolean) => T;

export function createBloksParser<T>(
  processors?: Record<string, Processor<T>>
): (bloks_payload: string, moreProcessors?: Record<string, Processor<T>>) => T;

export const BASIC_PROCESSORS: {
  "bk.action.array.Make": <T>(_: string, entries: T[]) => T[];
  "bk.action.i32.Const": (_: string, [value]: [number]) => number;
  "bk.action.bool.Const": (_: any, [value]: [boolean]) => boolean;
  "bk.action.map.Make": <T>(
    _: any,
    [keys, values]: [string[], T[]]
  ) => Record<string, T>;
};

export const DEFAULT_PROCESSORS: {
  "@": <T>(name: string, args: T[], isLocal: boolean) => [string, ...T[]];
};

export default createBloksParser;
