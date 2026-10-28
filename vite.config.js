import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const devServerPlugin = () => ({
  name: 'dev-server-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/') {
        res.writeHead(302, { Location: '/beach-cleanup/' })
        res.end()
        return
      }
      if (req.url === '/beach-cleanup/' || req.url === '/beach-cleanup/index.html') {
        req.url = '/beach-cleanup/template.html'
      }
      next()
    })
  },
})

const buildSyncPlugin = () => ({
  name: 'build-sync-plugin',
  closeBundle() {
    const distTemplate = path.resolve(__dirname, 'dist/template.html')
    const distIndex = path.resolve(__dirname, 'dist/index.html')
    const dist404 = path.resolve(__dirname, 'dist/404.html')
    const rootIndex = path.resolve(__dirname, 'index.html')
    const root404 = path.resolve(__dirname, '404.html')
    const docsDir = path.resolve(__dirname, 'docs')
    const docsIndex = path.resolve(__dirname, 'docs/index.html')
    const docs404 = path.resolve(__dirname, 'docs/404.html')

    if (fs.existsSync(distTemplate)) {
      const htmlContent = fs.readFileSync(distTemplate, 'utf8')
      fs.writeFileSync(distIndex, htmlContent)
      fs.writeFileSync(dist404, htmlContent)
      fs.writeFileSync(rootIndex, htmlContent)
      fs.writeFileSync(root404, htmlContent)
      fs.mkdirSync(docsDir, { recursive: true })
      fs.writeFileSync(docsIndex, htmlContent)
      fs.writeFileSync(docs404, htmlContent)

      const publicDir = path.resolve(__dirname, 'public')
      if (fs.existsSync(publicDir)) {
        fs.cpSync(publicDir, docsDir, { recursive: true })
      }
    }

    const distAssetsDir = path.resolve(__dirname, 'dist/assets')
    if (fs.existsSync(distAssetsDir)) {
      const rootAssetsDir = path.resolve(__dirname, 'assets')
      const docsAssetsDir = path.resolve(__dirname, 'docs/assets')

      fs.rmSync(rootAssetsDir, { recursive: true, force: true })
      fs.mkdirSync(rootAssetsDir, { recursive: true })
      fs.cpSync(distAssetsDir, rootAssetsDir, { recursive: true })

      fs.rmSync(docsAssetsDir, { recursive: true, force: true })
      fs.mkdirSync(docsAssetsDir, { recursive: true })
      fs.cpSync(distAssetsDir, docsAssetsDir, { recursive: true })
    }
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    devServerPlugin(),
    buildSyncPlugin(),
    react(),
    tailwindcss(),
  ],
  base: '/beach-cleanup/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: 'template.html',
      },
    },
  },
})
