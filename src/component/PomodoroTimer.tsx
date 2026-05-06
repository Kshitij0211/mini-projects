import { JSX, useEffect, useState } from "react";
import { Toast, ToastToggle } from "flowbite-react";
import { HiFire } from "react-icons/hi";
import alertSound from "../assets/PomodoroTimer/alarm/samsung-galaxy-morning-flower.mp3";

type ProjectProp = {
  dark: boolean;
  projectSelected: string;
};

export const PomodoroTimer: React.FC<ProjectProp> = ({
  dark,
  projectSelected,
}) => {
  const [currentSection, setCurrentSection] =
    useState<string>("PomodoroSection");

  const [showToast, setShowToast] = useState<{
    msg: JSX.Element;
    visible: boolean;
    icon: JSX.Element;
    type: string;
  }>({ msg: <></>, visible: false, icon: <></>, type: "" });

  return (
    <div
      className={`pomodoroTimer relative w-full h-full grow flex flex-col bg-radial dark:text-slate-300 text-slate-900 mx-auto overflow-hidden ${
          projectSelected === "Pomodoro Timer" ? "block" : "hidden"
        }
      ${
        dark
          ? "to-[#0F2027] via-[#203A43] from-[#2C5364]"
          : "to-[#6190E8] from-[#A7BFE8] "
      }  
        `}
    >
      {showToast.visible && (
        <Toast className="z-[999] my-5 absolute left-1/2 -translate-x-1/2 mx-auto shadow-xl shadow-black/30">
          <div
            className={`inline-flex size-8 shrink-0 items-center justify-center rounded-lg 
                  ${
                    showToast.type === "success"
                      ? "bg-emerald-100 text-emerald-500 dark:bg-emerald-800 dark:text-emerald-200"
                      : ""
                  }
                  ${
                    showToast.type === "failure"
                      ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
                      : ""
                  }
                  ${
                    showToast.type === "warning"
                      ? "bg-amber-100 text-amber-500 dark:bg-amber-800 dark:text-amber-200"
                      : ""
                  }
                  ${
                    showToast.type === "promise"
                      ? "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-200"
                      : ""
                  }
                  ${
                    showToast.type === "info"
                      ? "bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200"
                      : ""
                  }
                  `}
          >
            {showToast.icon}
          </div>
          <div className="ml-3 text-sm">{showToast.msg}</div>
          <ToastToggle
            onDismiss={() =>
              setShowToast({
                msg: <></>,
                visible: false,
                icon: <></>,
                type: "",
              })
            }
          />
        </Toast>
      )}
      <div className="my-4 p-2 md:p-6 lg:p-12 w-full h-full z-10 flex flex-col gap-y-8 dark:text-gray-100 grow">
        <div className="flex flex-row justify-between">
          <div className="text-xl md:text-4xl font-bold ">Pomodoro Timer</div>
        </div>
        <div
          className="flex items-center justify-evenly md:w-[85%] md:mx-auto
        *:rounded-full *:flex-1/3 *:md:flex-none *:border-2
        gap-x-3 md:gap-x-7 *:lg:w-64 *:md:w-48
        *:text-2xs *:md:text-base
        *:text-center 
        *:py-0.5 *:px-2 *:md:px-6 *:md:py-2 
        *:cursor-pointer"
        >
          <span onClick={() => setCurrentSection("PomodoroSection")}>
            Focus Session
          </span>
          <span onClick={() => setCurrentSection("ShortBreak")}>
            Short Break
          </span>
          <span onClick={() => setCurrentSection("LongBreak")}>Long Break</span>
        </div>
        {currentSection === "PomodoroSection" ? 
          <TimerSection
            key={currentSection}
            initialTimer={{ min: 25, seconds: 0 }}
            propMessage={{
              greeting: "Great Work",
              msg: "Kudos on completing your Focus Section",
            }}
            setShowToast={setShowToast}
          />
         : currentSection === "ShortBreak" ? 
          <TimerSection
          key={currentSection}
            initialTimer={{ min: 5, seconds: 0 }}
            propMessage={{
              greeting: "Welcome Back",
              msg: "Let's get ready for next Focus Session",
            }}
            setShowToast={setShowToast}
          />
         : 
          <TimerSection
          key={currentSection}
            initialTimer={{ min: 15, seconds: 0 }}
            propMessage={{
              greeting: "Welcome Back",
              msg: "Let's get ready for next Focus Session",
            }}
            setShowToast={setShowToast}
          />
        }
      </div>
    </div>
  );
};

type TimerProp = {
  initialTimer: {
    min: number;
    seconds: number;
  };
  propMessage: {
    greeting: string;
    msg: string;
  };
  setShowToast: React.Dispatch<
    React.SetStateAction<{
      msg: JSX.Element;
      visible: boolean;
      icon: JSX.Element;
      type: string;
    }>
  >;
};

export const TimerSection: React.FC<TimerProp> = ({
  initialTimer: { min, seconds },
  propMessage: { greeting, msg },
  setShowToast,
}) => {
  const [timerStat, setTimerStat] = useState<{ min: number; seconds: number }>({
    min: min,
    seconds: seconds,
  });

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);

  let audio: HTMLAudioElement | null = null;

  const playAlarm = () => {
    if (!audio) audio = new Audio(alertSound);

    audio.play();
  };

  useEffect(() => {
    if (!isRunning) return;

    setStarted(true);

    const interval = setInterval(() => {
      setTimerStat((prev) => {
        if (prev.min === 0 && prev.seconds === 0) {
          clearInterval(interval);
          setShowToast({
            msg: (
              <div className="">
                <span className="font-semibold">{greeting}!</span>
                <br />
                <span>{msg}</span>
                <span className="inline-block align-middle"></span>
              </div>
            ),
            visible: true,
            icon: <HiFire />,
            type: "info",
          });
          setIsRunning(false);
          playAlarm();
          return prev;
        }

        return {
          min: prev.seconds === 0 ? prev.min - 1 : prev.min,
          seconds: prev.seconds === 0 ? 59 : prev.seconds - 1,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleAddSeconds = (secondsToAdd: number) => {
    setTimerStat((prev) => {
      const newSec = prev.seconds + secondsToAdd;
      return {
        min: prev.min + Math.floor(newSec / 60),
        seconds: newSec % 60,
      };
    });
  };
  return (
    <>
      <div className="flex grow flex-col md:flex-row md:grow gap-x-2 justify-center items-center w-[85%] mx-auto text-8xl md:text-[9rem] lg:text-[15rem] font-extrabold md:leading-[10rem]">
        <div className="timer flex items-end">
          <div className="minutes flex flex-col gap-y-4 items-center">
            <div className="heading text-xl font-medium">Minutes</div>
            <div className="digits">
              {timerStat.min.toString().padStart(2, "0")}
            </div>
          </div>
          <div className="colon flex flex-col gap-y-4 items-center">
            <div className="heading text-xl font-medium"> </div>
            <div className="digits">:</div>
          </div>
          <div className="seconds flex flex-col gap-y-4 items-center">
            <div className="heading text-xl font-medium">Seconds</div>
            <div className="digits">
              {timerStat.seconds.toString().padStart(2, "0")}
            </div>
          </div>
        </div>
        <div className="buttons flex flex-row md:flex-col text-sm gap-6 justify-around h-full my-0 md:ml-10 font-light">
          <div
            className="rounded-full border-2 h-8 w-8 p-6 flex items-center justify-center cursor-pointer"
            onClick={() => handleAddSeconds(30)}
          >
            +30s
          </div>
          <div
            className="rounded-full border-2 h-8 w-8 p-6 flex items-center justify-center cursor-pointer"
            onClick={() => handleAddSeconds(60)}
          >
            +60s
          </div>
          <div
            className="rounded-full border-2 h-8 w-8 p-6 flex items-center justify-center cursor-pointer"
            onClick={() => handleAddSeconds(120)}
          >
            +120s
          </div>
        </div>
      </div>
      <div
        className="flex items-center justify-evenly w-[75%] md:w-[85%] mx-auto
        *:rounded-full *:flex-1/2 *:md:flex-none *:border-2
        gap-x-3 md:gap-x-7 *:lg:w-64 *:md:w-48
        *:text-2xs *:md:text-base
        *:text-center 
        *:py-0.5 *:px-2 *:md:px-6 *:md:py-2 
        *:cursor-pointer"
      >
        <div
          role="button"
          onClick={() => {
            setIsRunning(!isRunning);
          }}
        >
          {isRunning
            ? "Pause"
            : (timerStat.min === min && timerStat.seconds === 0) || !started
            ? "Start"
            : "Resume"}
        </div>
        <div
          role="button"
          onClick={() => {
            setTimerStat({ min: min, seconds: seconds });
            setStarted(false);
          }}
        >
          {isRunning ? "Restart" : "Stop"}
        </div>
      </div>
    </>
  );
};