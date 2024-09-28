import { useContext, useEffect } from "react"
import { DataContext } from "../../context/DataContext"

const LayoutGrid = ({ padding, gutter, columns, type, color = 'rgba(255, 0, 0, 0.1)' }) => {
    const { grid, setGrid } = useContext(DataContext)

    useEffect(() => {
        if(type === 'screen') {
            let root = document.querySelector(':root')

            root.style.setProperty('--grid-padding', padding)
            root.style.setProperty('--grid-gutter', gutter)
            root.style.setProperty('--grid-columns', columns)
        }
    }, [padding, gutter, columns])

    return (
        <>
            <div className={`layout-grid ${!grid && 'hidden'}`}>
                {
                    Array.from({ length: columns }, _ => (
                        <div className="grid-column" style={{ 'background-color': color }}></div>
                    ))
                }
            </div>

            <button className="btn grid-btn" onClick={() => setGrid(!grid)}>Grid</button>
        </>
    )
}

export default LayoutGrid