import { Box, ButtonBase, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { addDays, formatLongDate, formatShortDate } from '../utils/date'

interface DateNavigatorProps {
  date: string
}

function DateNavigator({ date }: DateNavigatorProps) {
  const navigate = useNavigate()
  const previous = addDays(date, -1)
  const next = addDays(date, 1)

  const goTo = (target: string) => navigate(`/date/${target}`)

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <ButtonBase
          onClick={() => goTo(previous)}
          aria-label={`Go to ${formatLongDate(previous)}`}
          sx={{ minHeight: 44, minWidth: 44, px: 1, borderRadius: 1 }}
        >
          <Typography variant="body2" color="text.secondary">
            {formatShortDate(previous)}
          </Typography>
        </ButtonBase>

        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: 700, textAlign: 'center' }}
        >
          {formatLongDate(date)}
        </Typography>

        <ButtonBase
          onClick={() => goTo(next)}
          aria-label={`Go to ${formatLongDate(next)}`}
          sx={{ minHeight: 44, minWidth: 44, px: 1, borderRadius: 1 }}
        >
          <Typography variant="body2" color="text.secondary">
            {formatShortDate(next)}
          </Typography>
        </ButtonBase>
      </Box>

      <TextField
        label="Jump to date"
        type="date"
        value={date}
        onChange={(event) => {
          const value = event.target.value
          if (value) goTo(value)
        }}
        fullWidth
        sx={{ mt: 2 }}
        slotProps={{ inputLabel: { shrink: true } }}
      />
    </Box>
  )
}

export default DateNavigator
