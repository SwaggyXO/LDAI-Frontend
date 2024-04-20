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
import DRS from "./pages/DRS/History/History";
import PowerUps from "./pages/PowerUps/PowerUps";
import Three from "./pages/Three/Three";
import ModeLayout from "./layouts/ModeLayout/ModeLayout";
import Unrated from "./pages/Modes/Unrated/Unrated";
import Rated from "./pages/Modes/Rated/Rated";
import ModePage from "./pages/Modes/ModePage/ModePage";
import History from "./pages/DRS/History/History";
import Review from "./pages/DRS/Review/Review";
import GemmaChat from "./pages/DRS/GemmaChat/GemmaChat";

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
        <Route path="/drs">
          <Route index element={<History />} />
          <Route path="/drs/review" element={<Review />} /> 
          <Route path='/drs/chat' element={<GemmaChat />}/>
        </Route>
        <Route path="/powerups" element={<PowerUps />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/result" element={<Completion />} />
      </Route>

      <Route path="" element={<ModeLayout />}>
        <Route index path="/unrated" element={<Unrated />} />
        <Route path="/rated" element={<Rated />} />
        <Route path="/unrated/:modeName" element={<ModePage />} />
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