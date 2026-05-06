import { Dropdown, DropdownItem, Navbar, NavbarBrand } from "flowbite-react";
import { useEffect } from "react";
import { MdOutlineDarkMode, MdSunny } from "react-icons/md";

type SetProjectProp = {
    dark: boolean,
    setDark: React.Dispatch<React.SetStateAction<boolean>>,
    projectSelected: string,
  setProjectSelected: React.Dispatch<React.SetStateAction<string>>
};

export const TopBar: React.FC<SetProjectProp> = ({ dark, setDark, projectSelected, setProjectSelected }) => {

  useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <Navbar
      fluid
      className="py-4 bg-slate-900 dark:bg-slate-300 text-slate-300 dark:text-slate-900 z-[999]"
    >
      <NavbarBrand>
        <span className="self-center whitespace-nowrap text-xl font-semibold">
          Kshitij Raj
        </span>
      </NavbarBrand>
      <Dropdown label={projectSelected} dismissOnClick={true}>
        <DropdownItem onClick={() => setProjectSelected("Auth Page")}>Auth Page</DropdownItem>
        <DropdownItem onClick={() => setProjectSelected("Pomodoro Timer")}>Pomodoro Timer</DropdownItem>
        <DropdownItem onClick={() => setProjectSelected("OTP Verification")}>OTP Verification</DropdownItem>
        <DropdownItem>Sign out</DropdownItem>
      </Dropdown>
      <div
        role="button"
        onClick={() => setDark(!dark)}
        className="relative flex items-center justify-center min-h-10 min-w-10"
      >
        <MdOutlineDarkMode
          data-active={dark}
          className={`absolute transition-all duration-200 ease-in text-3xl
            data-[active=true]:rotate-[60deg]
          ${dark ? "opacity-0" : "opacity-100"}
            `}
        />
        <MdSunny
          data-active={!dark}
          className={`absolute transition-all duration-200 ease-in text-3xl
            data-[active=true]:rotate-[60deg]
            ${dark ? "opacity-100" : "opacity-0"}
            `}
        />
      </div>
    </Navbar>
  );
};
