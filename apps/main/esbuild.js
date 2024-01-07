const { build } = require('esbuild');
const { resolve } = require('path');
const { clean } = require('esbuild-plugin-clean');

const main = async () => {
  const result = await build({
    entryPoints: [resolve(__dirname, 'src', 'index.ts')],
    outdir: resolve(__dirname, 'dist'),
    bundle: true,
    platform: 'node',
    // target: ['node16'],
    tsconfig: resolve(__dirname, 'tsconfig.json'),
    external: ['electron'],
    plugins: [
      clean({
        patterns: ['./dist/*'],
      }),
    ],
  });

  //正常時のresult -> { errors: [], warnings: [] }
  const { errors, warnings } = result;
  if (errors.length != 0) {
    console.error(errors);
  }

  if (warnings.length != 0) {
    console.warn(warnings);
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
