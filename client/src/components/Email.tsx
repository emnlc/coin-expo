import Lottie from "lottie-react";
import animationData from "../assets/email.json";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Email = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center my-16 w-full">
        <div className="email-left-container flex flex-col gap-4">
          <h1 className="text-xl font-semibold md:text-3xl">
            Stay up to date on the latest crypto news.
          </h1>
          <p className="text-sm font-base md:text-lg md:mb-8">
            Please keep me informed via email with the latest updates on
            cryptocurrency news, reward programs, coin listings, and more
            information from Coin Expo.
          </p>
          <div className="email-button-container flex flex-col gap-2 md:flex-row md:gap-8 items-center">
            <Input
              className="md:w-96"
              type="email"
              placeholder="Enter your email"
            />
            <Button
              size={"lg"}
              className="bg-coinExpo hover:opacity-80 w-full md:w-fit md:h-11 md:rounded-md md:px-8"
            >
              Subscribe
            </Button>
          </div>
        </div>

        <div className="w-1/2">
          <Lottie className="hidden md:block" animationData={animationData} />
        </div>
      </div>
    </>
  );
};

export default Email;
