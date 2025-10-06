import {defineConfig} from 'vite'
import checker from 'vite-plugin-checker'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import {clientIP, clientPort} from './src/base/secret'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"'
      },
      typescript: true
    }),
    react(),
    tsconfigPaths()
  ],
  server: {
    host: clientIP,
    port: clientPort
  }
})
