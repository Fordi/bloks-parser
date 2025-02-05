const DEFAULT_PROCESSORS = {
  "@": (name, args) => [name, ...args],
};

export const BASIC_PROCESSORS = {
  "bk.action.array.Make": (_, entries) => entries,
  "bk.action.i32.Const": (_, [value]) => parseInt(value),
  "bk.action.bool.Const": (_, [value]) => !!value,
  "bk.action.map.Make": (_, [keys, values]) => {
    const result = {};
    for (let i = 0; i < keys.length; i++) {
      result[keys[i]] = values[i];
    }
    return result;
  }
};

export default DEFAULT_PROCESSORS;
