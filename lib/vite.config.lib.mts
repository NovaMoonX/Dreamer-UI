import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['**/*.test.*', '**/*.spec.*'],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        components: 'src/components/index.ts',
        hooks: 'src/hooks/index.ts',
        providers: 'src/providers/index.ts',
        symbols: 'src/symbols/index.ts',
        utils: 'src/utils/index.ts',
      },
      name: 'DreamerUI',
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'esm' : format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.length > 0 && assetInfo.names[0].endsWith('.css')) {
            return 'styles.css';
          }
          return assetInfo.names?.[0] || '';
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    emptyOutDir: true,
    copyPublicDir: false,
  },
});
