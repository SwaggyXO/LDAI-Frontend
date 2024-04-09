import { Feature } from "../../components";
import { camera, learningvector, groupchat, chattingvector } from "./imports";
import gameon from "../../assets/js_files/gameon.json";
import ai from "../../assets/js_files/ai.json";
import profile from "../../assets/js_files/profile.json";
import Lottie from "lottie-react";

// All the remarkable features of the application

const Features = () => {
  return (
    <div className="learn__features">
      <Feature
        title="Game On!"
        text="Competing is fun! We use gamified elements such as Streaks, Power-Ups & 3D Models to develop a much more engaging and interactive learning experience for our users."
        vector={""}
        vectoralttext={""}
      />
      <Lottie
        style={{ display: "flex", justifyContent: "center", margin: "auto", height: "40vh" }}
        loop={true}
        animationData={gameon}
      />
      <br />
      <br />
      <Feature
        title="Achievement 🔓!"
        text="We help our students form a learning habit, by providing them daily & weekly goals. They also get long term challenges that they can work towards and display them as badges of honor."
        vector={""}
        vectoralttext={""}
      />
      <Lottie
        style={{ display: "flex", justifyContent: "center", margin: "auto" }}
        loop={true}
        animationData={profile}
      />
      <br />
      <br />
      <Feature
        title="Dot AI"
        text="Using our state of the art model - Dot AI, we give our users an accurate and fair evaluation of their answers by utlizing Named Entity Recognition and Semantic Similarity."
        vector={""}
        vectoralttext={""}
      />
      <Lottie
        style={{ display: "flex", justifyContent: "center", margin: "auto" }}
        loop={true}
        animationData={ai}
      />
      <br />
      <br />
    </div>
  );
};

export default Features;
