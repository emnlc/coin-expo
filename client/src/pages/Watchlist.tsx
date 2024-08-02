import { supabase } from "@/lib/helper/supabase";
import { useNavigate } from "react-router-dom";

import CoinTable from "@/components/CoinTable/CoinTable";

import { Button } from "@/components/ui/button";

import { useDarkMode } from "@/context/DarkModeContext";

const Watchlist = () => {
  const navigate = useNavigate();

  const { darkMode } = useDarkMode();

  return (
    <>
      <div className={`${darkMode ? "bg-white" : "dark bg-neutral-800"}`}>
        <div className="flex flex-col container min-h-screen py-36 dark:text-white">
          <div className="flex md:flex-row flex-col-reverse justify-between my-8 gap-8">
            <h1 className="text-xl md:text-3xl font-semibold">
              Your watchlist
            </h1>
            <Button
              className="bg-coinExpo hover:opacity-80 w-full md:w-fit text-white"
              size={"sm"}
              onClick={async () => {
                const { error } = await supabase.auth.signOut();

                if (error) {
                  console.error(error);
                } else {
                  navigate("/");
                }
              }}
            >
              Log Out
            </Button>
          </div>

          <CoinTable watchlist={true} />
        </div>
      </div>
    </>
  );
};

export default Watchlist;
