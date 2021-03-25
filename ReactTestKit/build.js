const buildDir = process.env.BUILD_DIR || 'build';

require('esbuild')
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    sourcemap: true, //TODO: fix sourcemap path
    format: 'cjs',
    target: 'es2018',
    outfile: `${buildDir}/index.js`,
    external: ['react', 'react-dom'],
    define: {
      'process.env.NODE_ENV': '"production"',
    },
  })
  .catch(() => process.exit(1));
