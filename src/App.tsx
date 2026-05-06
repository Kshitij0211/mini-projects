import { useState } from "react";
import "./App.css";
import { TopBar } from "./component/TopBar";
import { LoginSignUp } from "./component/LoginSignUp";
import { PomodoroTimer } from "./component/PomodoroTimer";
import { OTPVerification } from "./component/OTPVerification";

function App() {
  const [projectSelected, setProjectSelected] = useState<string>("Auth Page");
  const [dark, setDark] = useState<boolean>(false);

  return (
    <div className="flex flex-col max-h-svh min-h-svh min-w-svw max-w-svw bg-slate-300 dark:bg-slate-900">
      <TopBar
        setDark={setDark}
        dark={dark}
        projectSelected={projectSelected}
        setProjectSelected={setProjectSelected}
      />
      <LoginSignUp projectSelected={projectSelected} />
      <PomodoroTimer dark={dark} projectSelected={projectSelected} />
      <OTPVerification dark={dark} projectSelected={projectSelected} />
    </div>
  );
}

export default App;
