/// <reference types="vite/client" />

declare module 'virtual:github-contributions' {
  export interface ContributionDay {
    date: string
    contributionCount: number
  }
  export interface ContributionWeek {
    contributionDays: ContributionDay[]
  }
  export const weeks: ContributionWeek[]
  export const totalContributions: number
}
