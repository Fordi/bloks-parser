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
});