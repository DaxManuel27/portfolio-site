'use client'

import { useEffect, useState } from 'react'
import styles from './GitHubCalendar.module.css'

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface ContributionWeek {
  days: ContributionDay[]
}

export default function GitHubCalendar({ username }: { username: string }) {
  const [weeks, setWeeks] = useState<ContributionWeek[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
        const data = await res.json()
        
        if (data.contributions) {
          const allDays: ContributionDay[] = data.contributions.map((day: any) => ({
            date: day.date,
            count: day.count,
            level: day.level
          }))

          const grouped: ContributionWeek[] = []
          for (let i = 0; i < allDays.length; i += 7) {
            grouped.push({ days: allDays.slice(i, i + 7) })
          }

          setWeeks(grouped.slice(-22))
        }
      } catch (err) {
        console.error('Failed to fetch GitHub contributions:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [username])

  if (loading) {
    return (
      <div className={styles.calendarContainer}>
        <div className={styles.loading}>Loading...</div>
      </div>
    )
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const cellSize = 13
  const gap = 3
  const dayLabelWidth = 24

  // Figure out month positions
  const monthLabels: { label: string; x: number }[] = []
  let lastMonth = -1
  weeks.forEach((week, wi) => {
    if (week.days.length > 0) {
      const month = new Date(week.days[0].date).getMonth()
      if (month !== lastMonth) {
        monthLabels.push({ label: monthNames[month], x: dayLabelWidth + wi * (cellSize + gap) })
        lastMonth = month
      }
    }
  })

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.monthRow} style={{ paddingLeft: `${dayLabelWidth}px` }}>
        {monthLabels.map((m, i) => (
          <span
            key={i}
            className={styles.monthLabel}
            style={{ position: 'absolute', left: `${m.x}px` }}
          >
            {m.label}
          </span>
        ))}
      </div>
      <div className={styles.calendar}>
        <div className={styles.dayLabels}>
          {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((label, i) => (
            <span key={i} className={styles.dayLabel}>{label}</span>
          ))}
        </div>
        <div className={styles.grid}>
          {weeks.map((week, wi) => (
            <div key={wi} className={styles.week}>
              {[0, 1, 2, 3, 4, 5, 6].map((di) => (
                <div
                  key={di}
                  className={`${styles.cell} ${week.days[di] ? styles[`level${week.days[di].level}`] : styles.empty}`}
                  title={week.days[di] ? `${week.days[di].count} contribution${week.days[di].count !== 1 ? 's' : ''} on ${week.days[di].date}` : ''}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.legend}>
        <span className={styles.legendLabel}>Less</span>
        <div className={`${styles.cell} ${styles.level0}`} />
        <div className={`${styles.cell} ${styles.level1}`} />
        <div className={`${styles.cell} ${styles.level2}`} />
        <div className={`${styles.cell} ${styles.level3}`} />
        <div className={`${styles.cell} ${styles.level4}`} />
        <span className={styles.legendLabel}>More</span>
      </div>
    </div>
  )
}
