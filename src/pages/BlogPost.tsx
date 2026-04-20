import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getPost } from '../data/posts'
import { useTransitionNavigate } from '../hooks/useTransitionNavigate'
import { useWaveGlow } from '../hooks/useWaveGlow'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const go = useTransitionNavigate()
  const post = slug ? getPost(slug) : undefined
  const cardRef = useRef<HTMLDivElement>(null)
  useWaveGlow(cardRef)

  return (
    <div className="scene scene--expanded">
      <div ref={cardRef} className="card card--post" style={{ viewTransitionName: 'main-card' }}>

        <button className="back-btn" onClick={() => go('/')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          Back
        </button>

        {!post ? (
          <p className="dim" style={{ marginTop: '2rem' }}>Post not found.</p>
        ) : (
          <article className="post-article">
            <header className="post-header">
              <div className="post-meta">
                <time className="post-date-lg">{fmt(post.date)}</time>
                <div className="post-tags">
                  {post.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <h1 className="post-page-title">{post.title}</h1>
              <p className="post-page-excerpt">{post.excerpt}</p>
            </header>

            <div
              className="post-body prose"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </article>
        )}

      </div>
    </div>
  )
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
