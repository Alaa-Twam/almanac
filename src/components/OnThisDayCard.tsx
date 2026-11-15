import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { useOnThisDay } from '../hooks/useOnThisDay'
import { formatDayMonth } from '../utils/date'
import CardSkeleton from './CardSkeleton'
import ErrorAlert from './ErrorAlert'
import OnThisDayItem from './OnThisDayItem'

interface OnThisDayCardProps {
  date: string
}

const PAGE_SIZE = 10

const TABS = [
  { label: 'Events', kind: 'events', bookmarkKind: 'event' },
  { label: 'Births', kind: 'births', bookmarkKind: 'birth' },
  { label: 'Deaths', kind: 'deaths', bookmarkKind: 'death' },
] as const

function OnThisDayCard({ date }: OnThisDayCardProps) {
  const { data, isPending, isError, refetch } = useOnThisDay(date)
  const [tab, setTab] = useState(0)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const resetKey = `${tab}:${date}`
  const [prevResetKey, setPrevResetKey] = useState(resetKey)
  if (resetKey !== prevResetKey) {
    setPrevResetKey(resetKey)
    setVisibleCount(PAGE_SIZE)
  }

  if (isPending) {
    return <CardSkeleton />
  }

  if (isError) {
    return <ErrorAlert message="Couldn't data." onRetry={() => refetch()} />
  }

  if (!data) {
    return null
  }

  const activeTab = TABS[tab]

  const items = [...data[activeTab.kind]].sort((a, b) => b.year - a.year)
  const visible = items.slice(0, visibleCount)

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          On this day, {formatDayMonth(date)}
        </Typography>

        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          aria-label="On this day categories"
          variant="fullWidth"
        >
          {TABS.map((item) => (
            <Tab key={item.kind} label={item.label} />
          ))}
        </Tabs>

        {items.length === 0 ? (
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            No entries.
          </Typography>
        ) : (
          <Box sx={{ mt: 1 }}>
            {visible.map((item) => (
              <OnThisDayItem
                key={`${activeTab.kind}:${item.year}:${item.text}`}
                item={item}
                kind={activeTab.bookmarkKind}
                date={date}
              />
            ))}
            {visibleCount < items.length && (
              <Button
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                sx={{ mt: 1 }}
              >
                Show more
              </Button>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default OnThisDayCard
