import { ThemeProvider } from '@emotion/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { theme } from './theme/theme'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import DataProvider from './context/DataContext'

function App() {
  return (
    <>
      <DataProvider>
        <ThemeProvider theme={theme}>
          <Header />

          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </BrowserRouter> 
        </ThemeProvider>    
      </DataProvider>
    </>
  )
}

export default App
