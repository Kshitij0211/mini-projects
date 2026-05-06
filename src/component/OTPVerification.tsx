import { ButtonGroup, Dropdown, DropdownItem, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { BiSolidStar } from "react-icons/bi";
import { country_list } from "./helper";

type ProjectProp = {
  dark: boolean;
  projectSelected: string;
};

export const OTPVerification: React.FC<ProjectProp> = ({
  dark,
  projectSelected,
}) => {
  const [countryCode, setCountryCode] = useState<{
    code: string;
    name: string;
    phone: number;
  }>({
    code: "IND",
    name: "India",
    phone: 91,
  });
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const matchedCountry = country_list.find(
      (country) => country.code === countryCode.code
    );

    if (phoneRef.current && matchedCountry)
      phoneRef.current.value = "+" + matchedCountry.phone.toString();
  }, [countryCode]);

  return (
    <>
      <div
        className={`relative w-full h-full grow flex flex-col bg-radial dark:text-slate-300 text-slate-900 mx-auto overflow-hidden ${
          projectSelected === "OTP Verification" ? "block" : "hidden"
        } 
        `}
      >
        <div
          className={`my-4 p-2 container w-[90%] h-full mx-auto grid grid-cols-2 gap-y-8 grow rounded-xl bg-gradient-to-l items-stretch justify-stretch
            ${
              dark
                ? " from-emerald-700 to-emerald-900"
                : " to-[#022B1F] from-[#16AF83]"
            }
            `}
        >
          <div className="hidden md:flex items-center justify-center flex-col gap-y-4 w-[90%] mx-auto">
            <BiSolidStar className="text-white md:text-2xl lg:text-4xl my-8" />
            <span className="text-xl uppercase text-amber-400 font-semibold">
              LET'S ACHIEVE GREATNESS TOGETHER!
            </span>
            <span className="text-5xl text-center text-emerald-50 font-bold">
              Unlock your potential with purpose-driven OKRs
            </span>
            <BiSolidStar className="text-white md:text-2xl lg:text-4xl my-8" />
          </div>
          <div className="flex flex-col gap-4 otp-rightBox w-full h-full bg-gray-50 items-stretch justify-center p-6">
            <div className="flex flex-row items-center gap-x-2">
              <div className="relative size-5 bg-emerald-600 rounded-full">
                <div className="absolute size-3 bg-gray-50 top-1/2 left-1/2 -translate-1/2 rounded-full"></div>
              </div>
              <div className="text-xl font-semibold text-slate-600">fleeso</div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-start gap-y-2">
              <span className="text-slate-800 font-medium text-4xl">
                Create new account
              </span>
              <span className="text-slate-500 font-normal text-base">
                Have an account? <span className="text-blue-800">Login</span>{" "}
              </span>

              <div className="inputBox border-2 w-3/4 flex flex-row mx-auto border-slate-300 rounded-2xl p-4">
                <ButtonGroup>
                  <Dropdown
                    className="*:border-0 bg-slate-200 rounded-xl px-2 hover:ring-0 text-start focus:ring-0 ring-0 *:h-64 *:overflow-auto border-b-2 rounded-e-none w-fit z-10"
                    color="transparent"
                    label={countryCode.code}
                    dismissOnClick={true}
                    value={countryCode.code}
                  >
                    {country_list.map((country) =>
                      country.name === "India" ? (
                        <DropdownItem
                          key={country.code}
                          onClick={() => setCountryCode(country)}
                          defaultChecked
                          value={country.code}
                        >
                          {country.name}
                        </DropdownItem>
                      ) : (
                        <DropdownItem
                          key={country.code}
                          onClick={() => setCountryCode(country)}
                          value={country.code}
                        >
                          {country.name}
                        </DropdownItem>
                      )
                    )}
                  </Dropdown>
                  <TextInput
                    ref={phoneRef}
                    className=""
                    style={{
                      textAlign: "end",
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    id="countryCode"
                    type="tel"
                    required
                    disabled
                    defaultValue={"+" + countryCode.phone.toString()}
                  />
                </ButtonGroup>
                <TextInput
                  className="w-full rounded-l-none *:pl-2 *:rounded-l-none"
                  id="phoneNumber"
                  type="tel"
                  required
                  placeholder="Phone Number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
