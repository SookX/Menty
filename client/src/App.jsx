import { ThemeProvider } from '@emotion/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { theme } from './theme/theme'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'

function App() {
  return (
    <>

      <ThemeProvider theme={theme}>
        <Header />

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter> 
      </ThemeProvider>    
    </>
  )
}

export default App
