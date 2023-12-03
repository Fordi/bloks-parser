{
  // Allows you to provide a blok processor by passing the "processors" argument
  const processBlok = options.processBlok ?? ((name, args) => [name, ...args]);
}

Blok
  = _ "(" _ name:ClassName _ args:("," _ next:Arg { return next; })* _ ")" _ {
    return processBlok(name, args);
  }

ClassName
  = head:$Identifier tail:("." next:$Identifier { return next; })* { return [head, ...tail].join('.'); }

Identifier
  = [a-zA-Z_] [a-zA-Z_0-9]*

Arg
  = Blok
  / Number
  / String
  / Null
  / Boolean

Number
  = n:$[0-9]+ { return parseInt(n); }

String
  = '"' content:StringChar* '"' { return content.join(''); }

Null
  = "null" { return null; }
  
Boolean
  = "true" { return true; }
  / "false" { return false; }

StringChar
  = [^"\\]
  / "\\" "\"" { return '"'; }
  / "\\" "\\" { return '\\'; }
  / "\\" "b" { return '\\b'; }
  / "\\" "f" { return '\\f'; }
  / "\\" "r" { return '\\r'; }
  / "\\" "t" { return '\\t'; }
  / "\\" "b" { return '\\b'; }
  / "\\" "u" hex:$(HexDigit HexDigit HexDigit HexDigit) { return String.fromCodePoint(parseInt(hex, 16)); }
  / "\\" ch:[^\\bfrtbu] { return ch; }

HexDigit = [0-9a-fA-F]

_ = [ \r\n\t]*
