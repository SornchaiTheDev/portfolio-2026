import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import matter from 'gray-matter'
import { marked } from 'marked'

function markdownPlugin() {
  return {
    name: 'vite-plugin-markdown',
    transform(code: string, id: string) {
      if (!id.endsWith('.md')) return null
      const { data, content } = matter(code)
      const html = marked(content) as string
      return { code: `export default ${JSON.stringify({ ...data, html })}`, map: null }
    },
  }
}

export default defineConfig({
  plugins: [react(), markdownPlugin()],
})
