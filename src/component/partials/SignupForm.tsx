import { Button, Label, TextInput } from "flowbite-react";
import { JSX, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { FaApple, FaGoogle, FaRocket } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";

type ToastProp = {
  setShowToast: React.Dispatch<
    React.SetStateAction<{
      msg: JSX.Element;
      visible: boolean;
      icon: JSX.Element;
      type: string;
    }>
  >;
};

type VisitTracker = Record<"email" | "name" | "password", boolean>;

export const SignUpForm: React.FC<ToastProp> = ({ setShowToast }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [visitTracker, setVisitTracker] = useState<VisitTracker>({
    email: false,
    name: false,
    password: false,
  });

  const [warning, setWarning] = useState({
    name: "",
    email: "",
    password: "",
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const validateName = () => {
    const nameInput = nameRef.current;

    if (!nameInput) return;
    setVisitTracker((prevTracker) => ({
      ...prevTracker,
      name: true,
    }));
    setWarning((prev) => ({
      ...prev,
      name: nameInput.validity.valueMissing
        ? "We need a name to call you! Please enter a Name."
        : nameInput.validity.patternMismatch
        ? "Hmm... that doesn't look right! Please enter a valid Name."
        : nameInput.validity.valid
        ? ""
        : "Oops! Something went wrong.",
    }));
  };

  const validatePassword = () => {
    const passwordInput = passwordRef.current;

    if (!passwordInput) return;

    setVisitTracker((prevTracker) => ({
      ...prevTracker,
      password: true,
    }));
    setWarning((prev) => ({
      ...prev,
      password: passwordInput.validity.tooShort
        ? "Tiny passwords don’t stand a chance! Please enter at least 8 characters."
        : passwordInput.validity.valueMissing
        ? "Let's secure your account! Please enter a strong Password."
        : passwordInput.validity.valid
        ? ""
        : "Oops! Something went wrong.",
    }));
  };

  const validateEmail = () => {
    const emailInput = emailRef.current;

    if (!emailInput) return;
    setVisitTracker((prevTracker) => ({
      ...prevTracker,
      email: true,
    }));
    setWarning((prev) => ({
      ...prev,
      email: emailInput.validity.typeMismatch
        ? "Are you sure that's an email? Please enter a valid Email ID."
        : emailInput.validity.valueMissing
        ? "We need an address to reach you! Please enter your Email ID."
        : emailInput.validity.valid
        ? ""
        : "Oops! Something went wrong.",
    }));
  };

  const handleSubmit = () => {
    setVisitTracker({ email: true, name: true, password: true });

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current?.value;

    if (warning.email.length <= 0 && email && password && name) {
      setShowToast({
        msg: (
          <span className="flex flex-row gap-x-1 items-center">
            Creating Profile!
          </span>
        ),
        visible: true,
        icon: <AiOutlineLoading3Quarters className="animate-spin" />,
        type: "promise",
      });

      setTimeout(() => {
        setShowToast({
          msg: (
            <div className="">
              Welcome Aboard! Glad to have you here
              <span className="inline-block align-middle">
                <FaRocket className="ml-2" />
              </span>
            </div>
          ),
          visible: true,
          icon: <HiCheckCircle />,
          type: "success",
        });

        resetVariable();
      }, 2000);
    } else {
      validateName();
      validateEmail();
      validatePassword();
    }
  };

  const resetVariable = () => {
    setVisitTracker({
      email: false,
      name: false,
      password: false,
    });

    setWarning({
      name: "",
      email: "",
      password: "",
    });

    if(nameRef.current)
        nameRef.current.value = "";
    if(passwordRef.current)
        passwordRef.current.value = "";
    if(emailRef.current)
        emailRef.current.value = "";
  };

  return (
    <div className="flex flex-col my-3 text-left gap-y-2 mx-auto w-full md:w-[70%]">
      <div>
        <div>
          <Label htmlFor="name" className="text-xs ml-2 font-normal">
            Full Name
          </Label>
        </div>
        <input
          ref={nameRef}
          type="text"
          id="name"
          placeholder="Joseph Francis Tribbiani"
          required
          pattern="^[A-Z a-z]+$"
          onBlur={validateName}
          className={`peer text-xs block w-full border-0 bg-gray-50 text-gray-900 placeholder-gray-500 p-2 sm:text-xs rounded-lg focus:outline-none focus:ring-2 ring-0 focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-primary-500  valid:ring-emerald-700 valid:ring-2 ${
            visitTracker.name
              ? " invalid:ring-red-800 dark:invalid:ring-red-600 invalid:ring-2"
              : ""
          }`}
        />
        <p
          className={`text-2xs ml-2 -mt-0.5 hidden text-red-800 dark:text-red-400 font-medium ${
            visitTracker.name ? "peer-invalid:block" : ""
          }`}
        >
          {warning?.name}
        </p>
      </div>
      <div>
        <div>
          <Label htmlFor="emailId" className="text-xs ml-2 font-normal">
            Email
          </Label>
        </div>
        <input
          type="email"
          id="emailId"
          placeholder="joeytribbiani@friends.com"
          required
          ref={emailRef}
          onBlur={validateEmail}
          className={`peer text-xs block w-full border-0 bg-gray-50 text-gray-900 placeholder-gray-500 p-2 sm:text-xs rounded-lg focus:outline-none focus:ring-2 ring-0 focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-primary-500  valid:ring-emerald-700 valid:ring-2
        ${
          visitTracker.email
            ? " invalid:ring-red-800 dark:invalid:ring-red-600 invalid:ring-2"
            : ""
        }`}
        />

        <p
          className={`text-2xs ml-2 -mt-0.5 text-red-800 dark:text-red-400 font-medium ${
            visitTracker.email ? "block" : "hidden"
          }`}
        >
          {warning?.email}
        </p>
      </div>
      <div>
        <div>
          <Label htmlFor="emailId" className="text-xs ml-2 font-normal">
            Password
          </Label>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            required
            minLength={8}
            ref={passwordRef}
            placeholder="Shh... Keep it secret!"
            onBlur={validatePassword}
            className={`peer text-xs block w-full border-0 bg-gray-50 text-gray-900 placeholder-gray-500 p-2 sm:text-xs rounded-lg focus:outline-none focus:ring-2 ring-0 focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-primary-500  valid:ring-emerald-700 valid:ring-2
        ${
          visitTracker.password
            ? " invalid:ring-red-800 dark:invalid:ring-red-600 invalid:ring-2"
            : ""
        }`}
          />
          {/* Show/Hide Button */}
          <div
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <BiSolidShow className="dark:text-slate-300 text-slate-800" />
            ) : (
              <BiSolidHide className="dark:text-slate-300 text-slate-800" />
            )}
          </div>
        </div>
        <p
          className={`text-2xs ml-2 -mt-0.5 text-red-800 dark:text-red-400 font-medium ${
            visitTracker.password ? "block" : "hidden"
          }`}
        >
          {warning?.password}
        </p>
      </div>
      <div>
        <Button
          color="none"
          onClick={handleSubmit}
          className="w-full my-4 bg-[#0d1719] font-bold uppercase tracking-wide text-[#dfdfdf] dark:bg-[#bb8811] dark:text-[#d4c091] hover:bg-[#132628] dark:hover:bg-[#bb9611] active:bg-[#162d30] cursor-pointer hover:-translate-y-0.5
            hover:shadow-sm-light shadow-[#0d1719]/50 transition-all duration-150 ease-in-out"
        >
          Submit
        </Button>
      </div>
      <div className="flex flex-row gap-x-3">
        <Button
          className="w-full bg-[#333] text-white hover:bg-gray-800 border border-[#333] hover:border-gray-700 dark:bg-[#555] dark:border-[#555] dark:hover:bg-[#666] flex items-center justify-center gap-x-2 p-2 rounded-md transition-all"
          size="sm"
        >
          <FaApple className="h-5 w-5" />
          Apple
        </Button>
        <Button
          className="w-full bg-white text-gray-900 hover:bg-[#4285F4] hover:text-white border border-gray-300 hover:border-[#4285F4] dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-[#4285F4] dark:hover:text-white flex items-center justify-center gap-x-2 p-2 rounded-md transition-all"
          size="sm"
        >
          <FaGoogle className="size-5 text-gray-900 dark:text-gray-200" />
          Google
        </Button>
      </div>
    </div>
  );
};

export const SignInForm: React.FC<ToastProp> = ({ setShowToast }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [visitTracker, setVisitTracker] = useState<{
    email: boolean;
    password: boolean;
  }>({
    email: false,
    password: false,
  });

  const [warning, setWarning] = useState({
    email: "",
    password: "",
  });

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const validateEmail = () => {
    const emailInput = emailRef.current;

    if (!emailInput) return;
    setVisitTracker((prevTracker) => ({
      ...prevTracker,
      email: true,
    }));
    setWarning((prev) => ({
      ...prev,
      email: emailInput.validity.typeMismatch
        ? "Oops! We couldn't find that email in our record. Mind checking your Email and try again?"
        : emailInput.validity.valueMissing
        ? "Looks like you forgot to enter your email! We need it to log you in."
        : emailInput.validity.valid
        ? ""
        : "Oops! Something went wrong.",
    }));
  };

  const validatePassword = () => {
    const passwordInput = passwordRef.current;

    if (!passwordInput) return;
    setVisitTracker((prevTracker) => ({
      ...prevTracker,
      password: true,
    }));

    console.log(passwordInput.validity);
    setWarning((prev) => ({
      ...prev,
      password: passwordInput.validity.valueMissing
        ? "We need to make sure it's really you — Please enter your password."
        : "Oops! Something went wrong.",
    }));
  };

  const handleSubmit = () => {
    setVisitTracker({ email: true, password: true });

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (warning.email.length <= 0 && email && password) {
      setShowToast({
        msg: (
          <span className="flex flex-row gap-x-1 items-center">
            Checking credentials!
          </span>
        ),
        visible: true,
        icon: <AiOutlineLoading3Quarters className="animate-spin" />,
        type: "promise",
      });

      setTimeout(() => {
        setShowToast({
          msg: (
            <span className="flex flex-row gap-x-1 items-center">
              You're In! Welcome Back
              <FaRocket />{" "}
            </span>
          ),
          visible: true,
          icon: <HiCheckCircle />,
          type: "success",
        });
        resetVariable();
      }, 2000);
    } else {
      validateEmail();
      validatePassword();
    }
  };

  const resetVariable = () => {
    setVisitTracker({
      email: false,
      password: false,
    });

    setWarning({
      email: "",
      password: "",
    });

    if(passwordRef.current)
        passwordRef.current.value = "";
    if(emailRef.current)
        emailRef.current.value = "";
  };

  return (
    <div className="flex flex-col my-3 text-left gap-y-2 mx-auto w-full md:w-[70%]">
      <div>
        <div>
          <Label htmlFor="emailIdSignIn" className="text-xs ml-2 font-normal">
            Email
          </Label>
        </div>
        <input
          type="email"
          id="emailIdSignIn"
          placeholder="joeytribbiani@friends.com"
          required
          ref={emailRef}
          onBlur={validateEmail}
          className={`peer text-xs block w-full border-0 bg-gray-50 text-gray-900 placeholder-gray-500 p-2 sm:text-xs rounded-lg focus:outline-none focus:ring-2 ring-0 focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-primary-500  valid:ring-emerald-700 valid:ring-2
        ${
          visitTracker.email
            ? "invalid:border-red-800 invalid:ring-red-800 invalid:ring-1"
            : ""
        }`}
        />
        <p
          className={`text-2xs ml-2 -mt-0.5 text-red-800 dark:text-red-400 font-medium ${
            visitTracker.email ? "block" : "hidden"
          }`}
        >
          {warning?.email}
        </p>
      </div>
      <div>
        <div>
          <Label htmlFor="passwordSignIn" className="text-xs ml-2 font-normal">
            Password
          </Label>
        </div>
        <div className="relative">
          <TextInput
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            placeholder="Don't worry - we won't share!"
            className="text-xs"
            id="passwordSignIn"
            sizing="sm"
            required
          />

          {/* Show/Hide Button */}
          <div
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <BiSolidShow className="dark:text-slate-300 text-slate-800" />
            ) : (
              <BiSolidHide className="dark:text-slate-300 text-slate-800" />
            )}
          </div>
        </div>
        <p
          className={`text-2xs ml-2 -mt-0.5 text-red-800 dark:text-red-400 font-medium ${
            visitTracker.password ? "block" : "hidden"
          }`}
        >
          {warning?.password}
        </p>
      </div>
      <div>
        <Button
          onClick={handleSubmit}
          color="none"
          className="w-full my-4 bg-[#0d1719] font-bold uppercase tracking-wide text-[#dfdfdf] dark:bg-[#bb8811] dark:text-[#d4c091] hover:bg-[#132628] dark:hover:bg-[#bb9611] active:bg-[#162d30] cursor-pointer hover:-translate-y-0.5
            hover:shadow-sm-light shadow-[#0d1719]/50 transition-all duration-150 ease-in-out"
        >
          Submit
        </Button>
      </div>
      <div className="flex flex-row gap-x-3">
        <Button
          className="w-full bg-[#333] text-white hover:bg-gray-800 border border-[#333] hover:border-gray-700 dark:bg-[#555] dark:border-[#555] dark:hover:bg-[#666] flex items-center justify-center gap-x-2 p-2 rounded-md transition-all"
          size="sm"
        >
          <FaApple className="h-5 w-5" />
          Apple
        </Button>
        <Button
          className="w-full bg-white text-gray-900 hover:bg-[#4285F4] hover:text-white border border-gray-300 hover:border-[#4285F4] dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-[#4285F4] dark:hover:text-white flex items-center justify-center gap-x-2 p-2 rounded-md transition-all"
          size="sm"
        >
          <FaGoogle className="size-5 text-gray-900 dark:text-gray-200" />
          Google
        </Button>
      </div>
    </div>
  );
};
