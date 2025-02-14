import { describe, it } from "node:test";
import assert from "node:assert";
import createBloksParser, { BASIC_PROCESSORS } from "./index.mjs";

describe("createBloksParser", () => {
  it("creates a parser that can parse bloks input", () => {
    const fixture =  [
      '(bk.action.array.Make,',
        '(bk.action.i32.Const,42069),',
        '"nice",',
        '(bk.action.bool.Const,true),',
        '(bk.action.map.Make,',
          '(bk.action.array.Make,"a","b","c"),',
          '(bk.action.array.Make,(bk.action.i32.Const,1),(bk.action.i32.Const,2),(bk.action.i32.Const,3))',
        ')',
      ')'
    ].join('');
    const parser = createBloksParser(BASIC_PROCESSORS);
    const actual = parser(fixture);
    assert.deepEqual(actual, [
      42069,
      "nice",
      true,
      { a: 1, b: 2, c: 3 },
    ]);
  });
  it("supports platform handlers (#5)", () => {
    const fixture =  '(#localFunction, 1, 2, 3)';
    const parser = createBloksParser({ ...BASIC_PROCESSORS, "@": (name, args, isLocal) => ({ name, isLocal, args }) });
    const actual = parser(fixture);
    assert.deepEqual(actual, { name: "localFunction", isLocal: true, args: [1, 2, 3] });
  });
  it("supports negative, floating point, and SI numbers (#6)", () => {
    const fixture =  '(bk.action.array.Make, -1, 2.3, 4e5, -6.78e9)';
    const parser = createBloksParser({ ...BASIC_PROCESSORS, "@": (name, args, isLocal) => ({ name, isLocal, args }) });
    const actual = parser(fixture);
    assert.deepEqual(actual, [-1, 2.3, 400000, -6780000000]);
  });
  it("Handles locals with the a minimal function", () => {
    const fixture = '(#localFunction, 1, 2, 3)';
    const parser = createBloksParser({ '@': (...args) => args });
    const actual = parser(fixture);
    const expected = ["localFunction", [1, 2, 3], true];
    assert.deepEqual(actual, expected);
  });
});