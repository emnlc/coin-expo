import { useState } from "react";

import { Toggle } from "@/components/ui/toggle";

interface Props {
  range: string;
  setRange: (range: string) => void;
}

const CoinChartOptions = (props: Props) => {
  // default the toggled button to the 30d toggle
  const [activeToggle, setActiveToggle] = useState("30d");

  // function used to change the background color of the toggle
  const handleToggleChange = (value: string) => {
    setActiveToggle(value);
  };

  return (
    <>
      <div className="flex">
        <Toggle
          pressed={activeToggle === "24h"}
          aria-label="Toggle 24 hours"
          onClick={() => {
            handleToggleChange("24h");
            props.setRange("1");
          }}
        >
          24h
        </Toggle>

        <Toggle
          pressed={activeToggle === "7d"}
          aria-label="Toggle 7 days"
          onClick={() => {
            handleToggleChange("7d");
            props.setRange("7");
          }}
        >
          7d
        </Toggle>

        <Toggle
          pressed={activeToggle === "30d"}
          aria-label="Toggle 30 days"
          onClick={() => {
            handleToggleChange("30d");
            props.setRange("30");
          }}
        >
          30d
        </Toggle>
      </div>
    </>
  );
};

export default CoinChartOptions;
