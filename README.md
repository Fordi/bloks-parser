# Blok Parser

This is a small parser library for parsing the `blok_payload` field of Instagram / Threads API responses.  This parser has no API details about IG/Threads APIs; it is _only_ for being able to pick apart the payloads in code.

## Usage

```javascript
import createBlokParser from '@fordi-org/bloks-parser';

const bloks_payload = `
  (bk.action.map.Make,
    (bk.action.array.Make, "login_type", "login_source"),
    (bk.action.array.Make, "Password", "Login")
  )
`;
const parseBloks = createBlokParser();
const bloks = parseBloks(bloks_payload);
```

and the result will be:

```json
["bk.action.map.Make",
  ["bk.action.map.Make", "login_type", "login_source"],
  ["bk.action.map.Make", "Password", "Login"]
]
```

The parser is also designed so you can create your own handlers for each blok type when generating the parser, e.g.,

```javascript
import createBlokParser from '@fordi-org/bloks-parser';

const parse = createBlokParser({
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
});
const payload = '(bk.action.array.Make,(bk.action.i32.Const,42069),"nice",(bk.action.bool.Const,true),(bk.action.map.Make,(bk.action.array.Make,"a","b","c"),(bk.action.array.Make,(bk.action.i32.Const,1),(bk.action.i32.Const,2),(bk.action.i32.Const,3))))';
console.log(JSON.stringify(parse(payload)));
```

```json
[42069,"nice",true,{"a":1,"b":2,"c":3}]
```

The above are exported as BASIC_PROCESSORS:

```javascript
import createBlokParser, { BASIC_PROCESSORS } from '@fordi-org/bloks-parser';
const parseWithBasics = createBlokParser(BASIC_PROCESSORS);
```

The special `@` processor will allow you to have more custom behavior than just `(name, args) => [name, ...args]`, which is the default.  This is useful in that you could have something like,

```javascript
/*...*/
"@": (name, args) => {
  console.warn(`Unknown blok: ${name} (\n ${JSON.stringify(args, null, 2).split('\n').join('\n  ')}\n)`);
  return [name, ...args];
},
/*...*/
```

So, like, for debugging, that'll report when it comes across a block type you haven't handled yet.

## Contributing

To get the repo working:

```bash
npm ci
npm build:peg
```

If you make changes to `src/bloks.pegjs`, you must run `npm build:peg` again.

Of note, there's no unit tests as yet.  I'll make a few sometime this week.
