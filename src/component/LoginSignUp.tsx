import { SignInForm, SignUpForm } from "./partials/SignupForm";
import bgImage from "../assets/AuthPage/img/meeting1.jpg";
import bgImage2 from "../assets/AuthPage/img/meeting2.jpg";
import { JSX, useState } from "react";
import { Toast, ToastToggle } from "flowbite-react";

type ProjectProp = {
  projectSelected: string;
}

export const LoginSignUp : React.FC<ProjectProp> = ({projectSelected}) => {
  const [toggleAuth, setToggleAuth] = useState<String>("SignUp");
  const [showToast, setShowToast] = useState<{msg: JSX.Element, visible: boolean, icon: JSX.Element, type: string}>({msg: <></>, visible: false, icon: <></>, type: ""});

  return (
    <div className={`authPage relative w-[95%] md:w-[85%] items-center grow mx-auto overflow-hidden ${projectSelected === "Auth Page" ? "block" : "hidden" }`}>
      {showToast.visible && (
        <Toast className="z-[999] my-5 relative mx-auto shadow-xl shadow-black/30">
          <div className={`inline-flex size-8 shrink-0 items-center justify-center rounded-lg 
            ${showToast.type === "success" ? "bg-emerald-100 text-emerald-500 dark:bg-emerald-800 dark:text-emerald-200" : '' }
            ${showToast.type === "failure" ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200" : '' }
            ${showToast.type === "warning" ? "bg-amber-100 text-amber-500 dark:bg-amber-800 dark:text-amber-200" : '' }
            ${showToast.type === "promise" ? "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-200" : '' }
            `}>
            {showToast.icon} 
          </div>
          <div className="ml-3 text-sm">{showToast.msg}</div>
          <ToastToggle onDismiss={() => setShowToast({msg: <></>, visible: false, icon: <></>, type: ""})} />
        </Toast>
      )}
      <div
        className={`absolute inset-0 flex transition-all duration-300 ease-in ${
          toggleAuth === "SignUp"
            ? "translate-x-0"
            : "-translate-x-full opacity-0"
        }`}
      >
        <div
          className={`flex flex-row grow h-full p-2 w-full rounded-3xl text-slate-800 dark:text-white absolute top-[50%] -translate-y-[50%] left-0`}
        >
          {/* bg-gradient-to-b from-[#3e81b1] dark:from-[#365c78] to-[#87aec9] dark:to-[#aabfcf] */}
          <div className="w-full lg:flex-[45%] leftSide justify-around flex flex-col m-4 items-stretch">
            <div className="px-5 py-1 grow-0 text-2xl md:text-3xl border-2 mx-auto md:mx-0 leftTop border-slate-800 w-fit rounded-full">
              Crextio
            </div>
            <div className="leftMid flex flex-col grow text-center justify-center">
              <span className="text-xl md:text-2xl">Create an account</span>
              <span className="text-xs">
                Sign up and get 30 days free trial
              </span>
              <SignUpForm setShowToast={setShowToast} />
            </div>
            <div className="leftBottom flex md:flex-row flex-col items-center justify-center md:justify-between md:items-baseline">
              <div>
                <span className="text-xs">Already have an account? </span>
                <span
                  className="text-xs underline cursor-pointer"
                  onClick={() => setToggleAuth("SignIn")}
                >
                  Sign in here
                </span>
              </div>
              <span className="text-xs underline cursor-pointer">
                Terms & Conditions
              </span>
            </div>
          </div>
          <div className="lg:flex-[55%] hidden lg:block items-stretch rightSide relative">
            <div className="flex h-full w-full z-[9] absolute top-0 left-0 rightSideImage items-stretch overflow-clip">
              <img src={bgImage} className="grow object-cover object-center" />
            </div>
            <div className="w-10 h-10 z-10 absolute -top-0.5 -right-0.5 rightSideClose"></div>
          </div>
        </div>
      </div>
      <div
        className={`absolute inset-0 flex transition-all duration-300 ease-in ${
          toggleAuth === "SignIn"
            ? "translate-x-0"
            : "translate-x-full opacity-0"
        }`}
      >
        <div
          className={`flex flex-row grow p-2 h-full w-full rounded-3xl text-slate-800 dark:text-white absolute top-[50%] -translate-y-[50%] left-0`}
        >
          {/* bg-gradient-to-b from-[#3e81b1] dark:from-[#365c78] to-[#87aec9] dark:to-[#aabfcf] */}
          <div className="lg:flex-[55%] hidden lg:block items-stretch rightSide relative">
            <div className="flex h-full w-full z-[9] absolute top-0 left-0 rightSideImage items-stretch overflow-clip">
              <img src={bgImage2} className="grow object-cover object-center" />
            </div>
            <div className="w-10 h-10 z-10 absolute -top-0.5 -right-0.5 rightSideClose"></div>
          </div>
          <div className="w-full lg:flex-[45%] leftSide justify-around flex flex-col m-4 items-stretch">
            <div className="px-5 py-1 grow-0 text-2xl md:text-3xl mx-auto md:mx-0 border-2 place-self-end leftTop border-slate-800 w-fit rounded-full">
              Crextio
            </div>
            <div className="leftMid flex flex-col grow text-center justify-center">
              <span className="text-xl md:text-2xl">Welcome Back</span>
              <span className="text-xs">Let's Sign you in!</span>
              <SignInForm setShowToast={setShowToast} />
            </div>
            <div className="leftBottom flex md:flex-row flex-col items-center justify-center md:justify-between md:items-baseline">
              <div>
                <span className="text-xs">Not a member yet? </span>
                <span
                  className="text-xs underline cursor-pointer"
                  onClick={() => setToggleAuth("SignUp")}
                >
                  Register here
                </span>
              </div>
              <span className="text-xs underline cursor-pointer">
                Terms & Conditions
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
