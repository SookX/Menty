import LayoutGrid from "./components/LayoutGrid/LayoutGrid"
import DataProvider from "./context/DataContext"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"

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

        <Routes>

          <Route path="/" element={<Home />} />

        </Routes>

      </DataProvider>
    </BrowserRouter>
  )
}

export default App
