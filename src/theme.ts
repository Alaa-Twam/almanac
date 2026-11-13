import { createTheme } from '@mui/material/styles'

const BACKGROUND = '#0e100fff'
const SURFACE = '#151a17ff'
const TEXT_PIRMARY = '#f3f3f4'
const TEXT_FADED = '#a7b3ad'
const BORDER = '#434e48'
const BORDER_STRONG = '#5a665f'
const ACCENT = '#e3b341'

const SANS = 'system-ui, -apple=system, "Segoe UI", Roboto, Arial, sans-serif'
const SERIF = 'Georgia, "Times New Roman", Times, serif'


const theme = createTheme({
  palette: {
    primary: { main: ACCENT, contrastText: BACKGROUND },
    background: { default: BACKGROUND, paper: SURFACE },
    text: { primary: TEXT_PIRMARY, secondary: TEXT_FADED },
    divider: BORDER,
    success: { main: '#4caf50' },
    warning: { main: '#ff9800' },
    error: { main: '#f44336' },
  },
  shape: {borderRadius: 10},
  typography: {
    fontFamily: SANS,
    h1: { fontFamily: SERIF },
    h2: { fontFamily: SERIF },
    h3: { fontFamily: SERIF },
    h4: { fontFamily: SERIF },
    h5: { fontFamily: SERIF },
    h6: { fontFamily: SERIF },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--almanac-surface': SURFACE,
          '--almanac-border': BORDER,
          '--almanac-border-strong': BORDER_STRONG,
          '--almanac-text-faded': TEXT_FADED,
          '--almanac-accent': ACCENT,
        },
        body: {
          overflowX: 'clip',
        },
      },
    },

    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none'}},

    },
    MuiCard: {
      defaultProps: {elevation: 0},
      styleOverrides: { root: { border: `1px solid ${BORDER}`}},
    },
    MuiIconButton: {
      styleOverrides: { root: { minWidth: 44, minHeight: 44}},
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {borderColor: BORDER_STRONG},
          '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: TEXT_FADED},
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: TEXT_PIRMARY},
        },
      },
    },
    MuiSelect: {
      styleOverrides: {icon: {color: TEXT_FADED}},
    },
  }
})

export default theme
