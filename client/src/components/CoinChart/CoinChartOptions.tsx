import { useState } from "react";

import { Toggle } from "@/components/ui/toggle";

interface Props {
  range: string;
  setRange: (range: string) => void;
}

const CoinChartOptions = (props: Props) => {
  // default the toggled button to the 30d toggle
  const [activeToggle, setActiveToggle] = useState(props.range);

  // function used to change the background color of the toggle
  const handleToggleChange = (value: string) => {
    setActiveToggle(value);
  };

  return (
    <>
      <div className="flex flex-row gap-2 my-2">
        <Toggle
          pressed={activeToggle === "1"}
          aria-label="Toggle 24 hours"
          onClick={() => {
            handleToggleChange("1");
            props.setRange("1");
          }}
        >
          24h
        </Toggle>

        <Toggle
          pressed={activeToggle === "7"}
          aria-label="Toggle 7 days"
          onClick={() => {
            handleToggleChange("7");
            props.setRange("7");
          }}
        >
          7d
        </Toggle>

        <Toggle
          pressed={activeToggle === "30"}
          aria-label="Toggle 30 days"
          onClick={() => {
            handleToggleChange("30");
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
