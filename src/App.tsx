import "./App.css"

import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "./containers/notmain";

import Landing from "./pages/notmain/Landing/Landing";
import Home from "./pages/main/Home/Home";
import Profile from "./pages/main/Profile/Profile";
import Grade from "./pages/main/Grade/Grade";

const App = () => {
  
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Landing />} />

        <Route path='*' element={<Navigate to={'/'} replace />} />
      </Route>

      <Route path='/home' element={<Home />} />
      <Route path='/grade' element={<Grade />} />
      <Route path='/home' element={<Home />} />
      <Route path="/profile" element={<Profile />} />


    </Routes>
  )
}

export default App