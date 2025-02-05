import { parse } from './bloks.mjs';
import DEFAULT_PROCESSORS from './processors.mjs';

export { BASIC_PROCESSORS } from './processors.mjs';

export default function createBloksParser(processors = {}) {
  const processBlok = (moreProcessors) => (name, args) => {
    const proc = { ...DEFAULT_PROCESSORS, ...processors, ...moreProcessors };
    return (proc[name] ?? proc['@'])(name, args);
  };
  return (bloks_payload, moreProcessors) => parse(bloks_payload, { processBlok: processBlok(moreProcessors) });
};
