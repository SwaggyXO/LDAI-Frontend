import "./App.css";

import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "./containers/notmain";

import Landing from "./pages/notmain/Landing/Landing";
import Home from "./pages/Main/Home/Home";
import Profile from "./pages/Main/Profile/Profile";
import Grade from "./pages/Main/Grade/Grade";
import Subject from "./pages/Main/Subject/Subject";
import GradeLayout from "./layouts/Main/GradeLayout/GradeLayout";
import SubjectLayout from "./layouts/Main/SubjectLayout/SubjectLayout";

import { SampleSubject } from "./pages/Main/Subject/SampleSubject";
import Intro from "./layouts/Main/Gameplay/Quiz/Start/Intro";
import Question from "./layouts/Main/Gameplay/Quiz/Question/Question";
import Completion from "./layouts/Main/Gameplay/Quiz/Result/Completion";
import HomeLayout from "./layouts/Main/HomeLayout/HomeLayout";
import Challenges from "./pages/Main/Challenges/Challenges";
import DRS from "./pages/Main/DRS/DRS";
import PowerUps from "./pages/Main/PowerUps/PowerUps";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Route>

      <Route path="" element={<HomeLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/drs" element={<DRS />} />
        <Route path="/powerups" element={<PowerUps />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="/grade" element={<GradeLayout />}>
        <Route index element={<Grade />} />
      </Route>

      <Route path="/subject" element={<SubjectLayout />}>
        <Route index element={<Subject subjects={SampleSubject} />} />
      </Route>

      <Route path="/quiz" element={<Intro />}>
        <Route path="question" element={<Question />} />
        <Route path="result" element={<Completion />} />
        <Route path="*" element={<Navigate to={"/quiz"} replace />} />
      </Route>
      
    </>
  )
);