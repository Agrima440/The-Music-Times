import './App.css'

import Navbar from './Components/Navbar/navbar.jsx'
import RouteManager from './Routes/RouteManager'
import Footer from './Components/Footer/footer.jsx'

import './UI/scrollbar/scrollbar.css'
import Cursor from './UI/cursor/cursor.jsx'

function App() {

  return (
    <>
    
      <Cursor />
      <Navbar />
      <RouteManager />
      <Footer />
    </>
  )
}

export default App
