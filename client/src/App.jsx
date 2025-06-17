import { ThemeProvider } from '@emotion/react'
import Box from '@mui/material/Box'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { theme } from './theme/theme'

function App() {
  return (
    <>

      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Box bgcolor="primary.tint1">Hey</Box>} />
          </Routes>
        </BrowserRouter> 
      </ThemeProvider>    
    </>
  )
}

export default App
