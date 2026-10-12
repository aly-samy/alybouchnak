import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// Read the actual data module instead of guessing object boundaries with regex.
export function readData(file, key) {
  const source = fs.readFileSync(file, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  vm.runInNewContext(outputText, { exports }, { filename: file, timeout: 5000 });
  return JSON.parse(JSON.stringify(exports[key]));
}
