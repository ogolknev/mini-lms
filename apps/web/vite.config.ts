import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import ui from '@nuxt/ui/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      vue(),
      ui({
        ui: {
          colors: {
            primary: 'indigo',
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
      host: '127.0.0.1',
      port: 3000,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    base: env.VITE_BASE_PATH || '/',
    build: {
      target: 'es2022',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
        },
      },
    },
  }
})
