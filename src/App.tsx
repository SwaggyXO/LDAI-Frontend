import "./App.css"

import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "./containers/notmain";

import Landing from "./pages/notmain/Landing";

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Landing />} />

        <Route path='*' element={<Navigate to={'/'} replace />} />
      </Route>
      
    </Routes>
  )
}

export default App