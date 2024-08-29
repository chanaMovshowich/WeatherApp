import { Routes, Route } from 'react-router-dom'
import HomePage from './components/homePage/homePage'

function App() {

  return (

    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>

  )
}

export default App
