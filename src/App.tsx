import "./App.css";

import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Layout } from "./containers";
import GradeLayout from "./layouts/GradeLayout/GradeLayout";
import SubjectLayout from "./layouts/SubjectLayout/SubjectLayout";
import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import QuizLayout from "./layouts/QuizLayout/QuizLayout";

import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Grade from "./pages/Grade/Grade";
import Subject from "./pages/Subject/Subject";
import Question from "./pages/Gameplay/Question/Question";
import Completion from "./pages/Gameplay/Result/Completion";
import Challenges from "./pages/Challenges/Challenges";
import DRS from "./pages/DRS/DRS";
import PowerUps from "./pages/PowerUps/PowerUps";
import Three from "./pages/Three/Three";

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
        <Route path="/result" element={<Completion />} />
      </Route>

      <Route path="/grade" element={<GradeLayout />}>
        <Route index element={<Grade />} />
      </Route>

      <Route path="/subject" element={<SubjectLayout />}>
        <Route index element={<Subject />} />
      </Route>

      <Route path="/quiz/:quizid" element={<QuizLayout />} >
        <Route path="question/:questionIndex" element={<Question />} />
      </Route>
      
      <Route path="/three" element={<QuizLayout />}>
        <Route path="/three/page" element={<Three />} /> {/* TESTING */}
      </Route>
    </>
  )
);