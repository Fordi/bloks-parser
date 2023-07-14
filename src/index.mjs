import { parse } from './bloks.mjs';

export default function createBloksParser(processors = {}) {
  const processBlok = (moreProcessors) => (name, args) => {
    const proc = { ...processors, ...moreProcessors };
    if (typeof proc[name] === 'function') {
      return proc[name](name, args);
    }
    if (typeof proc['@'] === 'function') {
      return processors['@'](name, args);
    }
    return [name, ...args];
  };
  const parseBloks = (bloks_payload, moreProcessors) => parse(bloks_payload, { processBlok: processBlok(moreProcessors) });
  return parseBloks;
};
