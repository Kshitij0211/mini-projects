import { useEffect, useState } from "react";
import "./App.css";
import { TopBar } from "./component/TopBar";
import { LoginSignUp } from "./component/LoginSignUp";
import { PomodoroTimer } from "./component/PomodoroTimer";
import { OTPVerification } from "./component/OTPVerification";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [projectSelected, setProjectSelected] = useState<string>("Auth Page");
  const [dark, setDark] = useState<boolean>(false);

  const navigate = useNavigate();

  // Sync URL with project selection
  useEffect(() => {
    if (projectSelected === "Auth Page") navigate("/loginSignUp");
    else if (projectSelected === "Pomodoro Timer") navigate("/pomodoroTimer");
    else if (projectSelected === "OTP Verification") navigate("/otpVerification");
  }, [projectSelected, navigate]);

  return (
    <div className="flex flex-col max-h-svh min-h-svh min-w-svw max-w-svw bg-slate-300 dark:bg-slate-900">
      <TopBar
        setDark={setDark}
        dark={dark}
        projectSelected={projectSelected}
        setProjectSelected={setProjectSelected}
      />
      <Routes>
        <Route path="*" element={<LoginSignUp projectSelected={projectSelected} />} />
        <Route path="/loginSignUp" element={<LoginSignUp projectSelected={projectSelected} />} />
        <Route path="/pomodoroTimer" element={<PomodoroTimer dark={dark} projectSelected={projectSelected} />} />
        <Route path="/otpVerification" element={<OTPVerification dark={dark} projectSelected={projectSelected} />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
