import { parse } from './bloks.mjs';
import DEFAULT_PROCESSORS from './DEFAULT_PROCESSORS.mjs';

export default function createBloksParser(processors = {}) {
  const processBlok = (moreProcessors) => (name, args) => {
    const proc = { ...DEFAULT_PROCESSORS, ...processors, ...moreProcessors };
    return (proc[name] ?? proc['@'])(name, args);
  };
  return (bloks_payload, moreProcessors) => parse(bloks_payload, { processBlok: processBlok(moreProcessors) });
};
