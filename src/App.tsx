import "./App.css"

import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "./containers/notmain";

import Landing from "./pages/notmain/Landing/Landing";
import Home from "./pages/main/Home/Home";
import Profile from "./pages/main/Profile/Profile";
import Grade from "./pages/main/Grade/Grade";
import Subject from "./pages/main/Subject/Subject";
import GradeLayout from "./layouts/main/GradeLayout/GradeLayout";
import SubjectLayout from "./layouts/main/SubjectLayout/SubjectLayout";

import { SampleSubject } from "./pages/main/Subject/SampleSubject";

const App = () => {
  
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path='*' element={<Navigate to={'/'} replace />} />
      </Route>

      <Route path='/home' element={<Home />} />

      <Route path='/grade' element={<GradeLayout />}>
        <Route index element={<Grade />} />  
      </Route>

      <Route path='/subject' element={<SubjectLayout />}>
        <Route index element={<Subject subjects={SampleSubject}/>} />
      </Route>

      <Route path='/profile' element={<Profile />} />

    </Routes>
  )
}

export default App