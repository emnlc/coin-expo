import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Lottie from "lottie-react";
import animationData from "../assets/account.json";

import { useDarkMode } from "@/context/DarkModeContext";

import { supabase } from "@/lib/helper/supabase";

const Login = () => {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorStyles, setErrorStyles] = useState(false);

  const [errorMessage, setErrorMessage] = useState(
    "Incorrect password or email"
  );

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setErrorStyles(true);
      setErrorMessage("Please enter credentials!");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
      if (error.message.includes("Invalid login credentials")) {
        setErrorStyles(true);
      } else {
        setErrorMessage("Error logging in");
      }
    } else {
      navigate("/watchlist");
    }
  };

  return (
    <>
      <div className={`${darkMode ? "bg-white" : "dark bg-neutral-800"}`}>
        <div className="h-screen md:container text-black dark:text-white py-36 flex flex-col items-center justify-center gap-8">
          <div className="flex w-full h-full bg-white md:dark:bg-neutral-900 dark:bg-neutral-800 md:rounded-xl md:shadow-xl overflow-hidden">
            <div className="hidden md:flex md:flex-col justify-center items-center overflow-hidden w-full bg-coinExpo/25 ">
              <Lottie
                className="hidden md:block h-full w-full "
                animationData={animationData}
              />
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-8">
              <h1 className="text-2xl font-semibold">Login to your account</h1>
              <Input
                className="w-80 md:w-96"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setErrorStyles(false)}
              />
              <div>
                <Input
                  className="w-80 md:w-96"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setErrorStyles(false)}
                />
                <span
                  className={`text-xs text-red-500 ${
                    errorStyles ? "" : "invisible"
                  }`}
                >
                  {errorMessage}
                </span>
              </div>

              <div className="flex flex-col gap-6  justify-center items-center">
                <Button
                  size={"lg"}
                  className="bg-coinExpo hover:opacity-80 w-80 md:w-fit text-white"
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <span className="text-xs">
                  New to Coin Expo?{" "}
                  <Link
                    to={"/account/register"}
                    className="hover:text-coinExpo hover:underline transition-all"
                  >
                    Create Account
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

export default Login;
