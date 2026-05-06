import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { LoginSignUp } from "./component/LoginSignUp";
import { OTPVerification } from "./component/OTPVerification";
import { PomodoroTimer } from "./component/PomodoroTimer";
import { TopBar } from "./component/TopBar";

function App() {
  const [dark, setDark] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const getProjectFromPath = (path: string) => {
    if (path === "/pomodoroTimer") return "Pomodoro Timer";
    if (path === "/otpVerification") return "OTP Verification";
    return "Auth Page";
  };

  const projectSelected = getProjectFromPath(location.pathname);

  return (
    <div className="flex flex-col max-h-svh min-h-svh min-w-svw max-w-svw bg-slate-300 dark:bg-slate-900">
      <TopBar
        setDark={setDark}
        dark={dark}
        projectSelected={projectSelected}
        onProjectChange={(project) => {
          if (project === "Auth Page") navigate("/loginSignUp");
          else if (project === "Pomodoro Timer") navigate("/pomodoroTimer");
          else if (project === "OTP Verification") navigate("/otpVerification");
        }}
      />

      <Routes>
        <Route
          path="/loginSignUp"
          element={<LoginSignUp projectSelected={projectSelected} />}
        />
        <Route
          path="/pomodoroTimer"
          element={
            <PomodoroTimer dark={dark} projectSelected={projectSelected} />
          }
        />
        <Route
          path="/otpVerification"
          element={
            <OTPVerification dark={dark} projectSelected={projectSelected} />
          }
        />

        {/* ✅ Clean fallback */}
        <Route path="*" element={<Navigate to="/loginSignUp" />} />
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
