const esbuild = require('esbuild')

esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    outfile: 'dist/index.js',
    sourcemap: true,
    target: ['node18'],
}).catch(() => process.exit(1))