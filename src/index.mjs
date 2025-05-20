import { parse } from './bloks.mjs';
import { DEFAULT_PROCESSORS } from './processors.mjs';

export { BASIC_PROCESSORS } from './processors.mjs';

export function createBloksParser(processors = {}) {
  const processBlok = (moreProcessors) => (name, args, isLocal) => {
    const proc = { ...DEFAULT_PROCESSORS, ...processors, ...moreProcessors };
    const key = `${isLocal ? '#' : ''}${name}`;
    return (proc[key] ?? proc['@'])(name, args, isLocal);
  };
  return (bloks_payload, moreProcessors) => parse(bloks_payload, { processBlok: processBlok(moreProcessors) });
};

/**
 * @deprecated
 */
export default createBloksParser;
