{
  // Allows you to provide a blok processor by passing the "processors" argument
  const processBlok = options.processBlok ?? ((name, args, isLocal) => null);
}

Blok
  = _ "(" _ name:$ClassName _ args:("," _ next:Arg { return next; })* _ ")" _ {
    return processBlok(name, args);
  }
  / _ "(" _ '#' name:$(LocalTagChar*) _ args:("," _ next:Arg { return next; })* _ ")" _ {
    return processBlok(name, args, true);
  }

ClassName
  = $Identifier ("." next:$Identifier)*

Identifier
  = Alpha AlphaNum*

Arg
  = Blok
  / Number
  / String
  / Null
  / Boolean

Number
  = s:$[+-]? n:$Digit+ d:$('.' Digit+)? e:$('e' [+-]? Digit+)? { return parseFloat((s ?? '') + n + (d ?? '') + (e ?? '')); }

String
  = '"' content:$StringChar* '"' { return content; }

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
  / "\\" "n" { return '\\n'; }
  / "\\" "u" hex:$(HexDigit HexDigit HexDigit HexDigit) { return String.fromCodePoint(parseInt(hex, 16)); }
  / "\\" ch:[^\\bfrtbu] { return ch; }

Digit = [0-9]
Alpha = [a-zA-Z_]
Separator = [\-:]
HexDigit = Digit / [a-fA-F]
AlphaNum = Alpha / Digit
LocalTagChar = AlphaNum / Separator

_ = [ \r\n\t]*
