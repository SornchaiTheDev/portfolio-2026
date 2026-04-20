import { GitHubCalendar } from 'react-github-calendar'

const theme = {
  dark: [
    'rgba(255,255,255,0.05)',
    'rgba(255,255,255,0.15)',
    'rgba(255,255,255,0.32)',
    'rgba(255,255,255,0.55)',
    'rgba(255,255,255,0.82)',
  ],
}

export default function ContributionGraph() {
  return (
    <div className="contrib-wrap">
      <GitHubCalendar
        username="SornchaiTheDev"
        colorScheme="dark"
        theme={theme}
        showTotalCount={false}
        showColorLegend={false}
        style={{ color: 'var(--muted)', fontSize: '0.625rem' }}
      />
    </div>
  )
}
