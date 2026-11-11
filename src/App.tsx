import { AppBar, Toolbar, Typography, Container } from '@mui/material'

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1">
            Almanac
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Typography>Test Alaa</Typography>
      </Container>
    </>
  )
}

export default App
