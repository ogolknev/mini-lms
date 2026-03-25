import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import ui from '@nuxt/ui/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    ui({
      ui: {
        colors: {
          primary: 'yellow',
          neutral: 'neutral',
        },
        input: {
          defaultVariants: {
            size: 'lg',
          },
        },
        formField: {
          slots: {
            error: 'text-error text-[0.8em] mt-1',
          },
        },
      },
    }),
    vueDevTools(),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: mode === 'production' ? '/' : './',
  build: {
    rollupOptions: {
      output: {
        advancedChunks: {
          groups: [
            {
              name: 'vendor',
              test: /node_modules/,
            },
          ],
        },
      },
    },
  },
}))
