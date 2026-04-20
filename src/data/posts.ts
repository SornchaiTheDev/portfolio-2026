export interface Post {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  html: string
}

// Each .md file is transformed at build time by the markdown Vite plugin.
// gray-matter + marked never run in the browser.
const modules = import.meta.glob<Post>('../content/posts/*.md', { eager: true, import: 'default' })

export const posts: Post[] = Object.entries(modules)
  .map(([path, mod]) => ({
    ...mod,
    slug: path.split('/').pop()!.replace(/\.md$/, ''),
    date: String(mod.date ?? ''),
    tags: Array.isArray(mod.tags) ? mod.tags.map(String) : [],
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
