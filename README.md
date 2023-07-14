# Blok Parser

This is a small parser library for parsing the `blok_payload` field of Instagram / Threads API responses.  This parser has no API details about IG/Threads APIs; it is _only_ for being able to pick apart the payloads in code.

## Usage

```javascript
import createBlokParser from 'blok-parser';

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
import createBlokParser from 'blok-parser';

const parse = createBlokParser({
  "bk.action.array.Make": (_, entries) => entries,
  "bk.action.i32.Const": (_, [value]) => parseInt(value),
  "bk.action.bool.Const": (_, [value]) => !!value,
});
const payload = '(bk.action.array.Make, (bk.action.i32.Const, 42069), "nice", (bk.action.bool.Const, true))';
console.log(JSON.stringify(parse(payload)));
```

```json
[42069, "nice", true]
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
