import "./App.css"

import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "./containers/notmain";

import Landing from "./pages/Landing/Landing";

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Landing />} />

        <Route path='*' element={<Navigate to={'/'} replace />} />
      </Route>

      {/* First time user */}
        {/* Layout for Grade & Subject Pages */}
        <Route> 

        </Route>

        {/* Layout for Quiz - Main */}
        <Route>

        </Route>

        {/* Layout for Quiz - End */}
        <Route>

        </Route>

        {/* Main Layout with TopNav and BottomNav */}
        <Route>

        </Route>
      
    </Routes>
  )
}

export default App