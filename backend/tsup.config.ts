import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm'], // only esm
  target: 'node20', // or node20 if you're on that
  sourcemap: true,
  splitting: false,
  clean: true,
  dts: true, // generate .d.ts files
  tsconfig: 'tsconfig.paths.json',
});
