const { buildSync } = require('esbuild');
const { resolve } = require('path');

const result = buildSync({
  entryPoints: [
    resolve(__dirname, 'src', 'main.ts'),
    resolve(__dirname, 'src', 'pre-load.ts'),
  ],
  outdir: resolve(__dirname, 'dist'),
  bundle: true,
  platform: 'node',
  target: ['node16'],
  tsconfig: resolve(__dirname, 'tsconfig.json'),
  external: ['electron'],
});

//正常時のresult -> { errors: [], warnings: [] }
const { errors, warnings } = result;
if (errors.length != 0) {
  console.error(errors);
}

if (warnings.length != 0) {
  console.warn(warnings);
}
