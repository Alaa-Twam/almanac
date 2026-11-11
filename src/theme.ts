import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
  },
  typography: {
    fontFamily: ['system-ui', 'Arial', 'sans-serif'].join(','),
  },
})

export default theme
