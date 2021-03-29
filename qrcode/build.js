const buildDir = process.env.BUILD_DIR || 'build';

require('esbuild')
  .build({
    entryPoints: ['src/index.js', 'src/qrcode.js'],
    bundle: false,
    sourcemap: true, //TODO: fix sourcemap path
    format: 'cjs',
    target: 'es2018',
    outdir: buildDir,
    define: {
      'process.env.NODE_ENV': '"production"',
    },
  })
  .catch(() => process.exit(1));
