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

  const neighbour = {
    minHeight: 44,
    minWidth: 44,
    px: 1,
    borderRadius: 1,
    color: 'text.secondary',
    '&:hover': {color: 'text.primary', textDecoration: 'underline'},
  }

  const connector = {
    flexGrow: 1,
    height: 0,
    borderTop: '1px solid',
    borderColor: 'divider',
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <ButtonBase
          onClick={() => goTo(previous)}
          aria-label={`Go to ${formatLongDate(previous)}`}
          sx={neighbour}
        >
          <Typography variant="body2" sx={{color: 'inherit'}}>
            {formatShortDate(previous)}
          </Typography>
        </ButtonBase>
<Box aria-hidden="true" sx={connector} />
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: 700, textAlign: 'center', }}
        >
          {formatLongDate(date)}
        </Typography>
          <Box aria-hidden="true" sx={connector} />
        <ButtonBase
          onClick={() => goTo(next)}
          aria-label={`Go to ${formatLongDate(next)}`}
          sx={neighbour}
        >
          <Typography variant="body2" sx={{color:'inherit'}}>
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
        sx={{ mt: 2,
          '& input::-webkit-calendar-picker-indicator': {
            filter: 'invert(1)',
            cursor: 'pointer',
         },}}
        slotProps={{ inputLabel: { shrink: true } }}
      />
    </Box>
  )
}

export default DateNavigator
