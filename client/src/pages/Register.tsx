import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/context/DarkModeContext";

import { supabase } from "@/lib/helper/supabase";

const Register = () => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState(false);

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errorStyles, setErrorStyles] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Passwords do not match!");

  const handleRegister = async () => {
    if (email === "") {
      setEmailEmpty(true);
    }

    if (password === "") {
      setPasswordEmpty(true);
    }

    if (confirmPassword === "") {
      setConfirmPasswordEmpty(true);
    }

    if (!email || !password || !confirmPassword) {
      setErrorMessage("Please fill the required field!");
      setErrorStyles(true);
      return;
    }

    if (confirmPassword !== password) {
      setErrorMessage("Passwords do not match!");
      setPasswordsMatch(false);
      setErrorStyles(true);
      return;
    }

    // console.log("creating user...");
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      // console.error(error);
      if (error.message.includes("User already registered")) {
        setErrorStyles(true);
        setErrorMessage("User already exists!");
      }
    } else {
      // create user in database
      const { error } = await supabase.from("users").insert([{ email: email }]);
      if (error) {
        console.error(error);
        return;
      }

      navigate("/crypto");
    }
  };

  return (
    <>
      <div className={`${darkMode ? "bg-white" : "dark bg-neutral-800"}`}>
        <div className="h-screen md:container text-black dark:text-white py-36 flex flex-col items-center justify-center gap-8">
          <div className="flex  md:p-32 h-full bg-white md:dark:bg-neutral-900 dark:bg-neutral-800 md:rounded-xl md:shadow-xl overflow-hidden">
            <div className="w-full flex flex-col items-center justify-center gap-8">
              <h1 className="text-2xl font-semibold">Create Account</h1>
              <Input
                required
                className={`w-80 md:w-96 ${
                  errorStyles || emailEmpty
                    ? "border-red-500 dark:border-red-500"
                    : ""
                }`}
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => {
                  setEmailEmpty(false);
                  setErrorStyles(false);
                }}
              />
              <Input
                required
                className={`w-80 md:w-96 ${
                  errorStyles || passwordEmpty
                    ? "border-red-500 dark:border-red-500"
                    : ""
                }`}
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => {
                  setPasswordEmpty(false);
                  setErrorStyles(false);
                }}
              />
              <div>
                <Input
                  required
                  className={`w-80 md:w-96 ${
                    (errorStyles && !passwordsMatch) ||
                    errorStyles ||
                    confirmPasswordEmpty
                      ? "border-red-500 dark:border-red-500"
                      : ""
                  }`}
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => {
                    setConfirmPasswordEmpty(false);
                    setErrorStyles(false);
                  }}
                />
                <span
                  className={`text-xs ${
                    errorStyles ? "" : "invisible"
                  } text-red-500`}
                >
                  {errorMessage}
                </span>
              </div>

              <div className="flex flex-col gap-6  justify-center items-center">
                <Button
                  size={"lg"}
                  className="bg-coinExpo hover:opacity-80 w-80 md:w-fit text-white"
                  onClick={handleRegister}
                  type="submit"
                >
                  Register
                </Button>
                <span className="text-xs">
                  Already have an account?{" "}
                  <Link
                    to={"/account/login"}
                    className="hover:text-coinExpo hover:underline transition-all"
                  >
                    Login
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
