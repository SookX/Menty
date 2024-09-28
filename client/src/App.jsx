import LayoutGrid from "./components/LayoutGrid/LayoutGrid"
import DataProvider from "./context/DataContext"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Header from "./components/Header/Header"
import Register from "./pages/Account/Register"
import Login from "./pages/Account/Login"

function App() {

  return (
    <BrowserRouter>
      <DataProvider>

        <LayoutGrid
          columns={12}
          padding='6.4rem'
          gutter='2.4rem'
          type='screen'
        />

        <Header />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

        </Routes>

      </DataProvider>
    </BrowserRouter>
  )
}

export default App
