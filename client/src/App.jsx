import { ThemeProvider } from '@emotion/react'
import Box from '@mui/material/Box'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { theme } from './theme/theme'
import Typography from '@mui/material/Typography'
import Header from './components/Header/Header'

function App() {
  return (
    <>

      <ThemeProvider theme={theme}>
        <Header />

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Typography variant='h1'>You're not alone</Typography>} />
          </Routes>
        </BrowserRouter> 
      </ThemeProvider>    
    </>
  )
}

export default App
