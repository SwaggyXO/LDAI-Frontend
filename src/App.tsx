import "./App.css"

import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "./containers/notmain";

import Landing from "./pages/notmain/Landing/Landing";
import Home from "./pages/main/Home/Home";
import Profile from "./pages/main/Profile/Profile";
import Grade from "./pages/main/Grade/Grade";

const App = () => {

  let x = 1;

  const path = (x === 1) ? 'grade' : 'home';
  const element = (x === 1) ? <Grade /> : <Home />;

  console.log(element);
  
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path='*' element={<Navigate to={'/'} replace />} />
      </Route>

      <Route path={path} element={element} />
      <Route path='/profile' element={<Profile />} />

    </Routes>
  )
}

export default App