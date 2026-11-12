import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { CITIES } from '../data/cities'
import type { City } from '../data/cities'

interface CitySelectProps {
  value: City
  onChange: (city: City) => void
}

function CitySelect({ value, onChange }: CitySelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    const next = CITIES.find((city) => city.name === event.target.value)
    if (next) onChange(next)
  }

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="city-select-label">Location</InputLabel>
      <Select
        labelId="city-select-label"
        label="Location"
        value={value.name}
        onChange={handleChange}
      >
        {CITIES.map((city) => (
          <MenuItem key={city.name} value={city.name}>
            {city.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CitySelect
