import MarkdownIt from "markdown-it";
import pretty from "pretty";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const project = dirname(dirname(fileURLToPath(import.meta.url)));
const template = await readFile(join(project, 'tools', 'index.template.html'), 'utf8');
const readme = join(project, 'README.md');
const index = join(project, 'docs', 'index.html');
const markdownIt = new MarkdownIt();
const readmeMd = await readFile(readme, 'utf8');
const substitutions = {
  title: "@fordi-org/bloks-parser",
  body: markdownIt.render(readmeMd),
}
const transcluded = template.replace(/\$\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g, (_, name) => {
  return substitutions[name] ?? "";
});

const indexHtml = pretty(transcluded);

await writeFile(index, indexHtml, 'utf8');
