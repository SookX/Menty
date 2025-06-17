import DataProvider from "./context/DataContext"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Header from "./components/Header/Header"
import Register from "./pages/Account/Register"
import Login from "./pages/Account/Login"
import Dashboard from "./pages/Dashboard/Dashboard"

function App() {

  return (
    <BrowserRouter>
      <DataProvider>

        <Header />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>

      </DataProvider>
    </BrowserRouter>
  )
}

export default App
