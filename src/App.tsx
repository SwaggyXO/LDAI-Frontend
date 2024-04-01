import "./App.css";

import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "./containers";

import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Grade from "./pages/Grade/Grade";
import Subject from "./pages/Subject/Subject";
import GradeLayout from "./layouts/GradeLayout/GradeLayout";
import SubjectLayout from "./layouts/SubjectLayout/SubjectLayout";

import { SampleSubject } from "./pages/Subject/SampleSubject";
import Intro from "./pages/Gameplay/Start/Intro";
import Question from "./pages/Gameplay/Question/Question";
import Completion from "./pages/Gameplay/Result/Completion";
import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import Challenges from "./pages/Challenges/Challenges";
import DRS from "./pages/DRS/DRS";
import PowerUps from "./pages/PowerUps/PowerUps";
import QuizLayout from "./layouts/QuizLayout/QuizLayout";

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
        <Route index element={<Subject />} />
      </Route>

      <Route path="/quiz" element={<QuizLayout />} >
        <Route index element={<Intro />} />
        <Route path="question" element={<Question />} />
        <Route path="result" element={<Completion />} />
      </Route>
      
    </>
  )
);