import LayoutGrid from "./components/LayoutGrid/LayoutGrid"
import DataProvider from "./context/DataContext"

function App() {

  return (
    <DataProvider>
      <LayoutGrid
        columns={12}
        padding='6.4rem'
        gutter='2.4rem'
        type='screen'
      />
    </DataProvider>
  )
}

export default App
