import React from "react";

interface Props {
  padding?: number;
  level: number;
  active?: boolean;
  onClick?: () => void; // Define onClick prop
}

function ActiveLevel({ active, padding, level, onClick }: Props) {
  const fillColor1 = active ? "#8772E4" : "#b0b0b0";
  const fillColor2 = active ? "#CECAF5" : "#d3d3d3";

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div style={{ width: 120, paddingTop: padding, marginRight: 120 }}>
      <button
        onClick={handleClick}
        disabled={!active} // Disable button if active is false
        style={{
          padding: 0,
          border: "none",
          background: "none",
          cursor: active ? "pointer" : "default", // Change cursor based on active state
          pointerEvents: active ? "auto" : "none", // Allow or disallow pointer events based on active state
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 511.02 385.73"
          style={{ width: "100%", height: "auto" }}
        >
          <defs>
            <style>{`.bls-1${level}{fill:${fillColor1};}.bls-2${level}{fill:${fillColor2};}`}</style>
          </defs>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <ellipse
                className={`bls-1${level}`}
                cx="255.61"
                cy="155.75"
                rx="255.42"
                ry="155.75"
              />
              <path
                className={`bls-2${level}`}
                d="M.1,158.56c-.28,0,.07,46,.44,87.15a115.55,115.55,0,0,0,3.86,14.8c17.57,52.81,69.29,78.93,95.12,92c42.69,21.56,79.89,26.91,104.32,30.21,14.54,2,93.52,11.78,182.1-19.18,25.77-9,46.73-19.49,66.48-34.16,14-10.42,33.12-24.9,46.78-51A130,130,0,0,0,511,245.8q-.91-38-1.84-75.94a100.9,100.9,0,0,1-5,22.86c-3,8.82-14.86,39-63.59,68.32-92.62,55.7-203.11,50.07-203.11,50.07S135.37,305.9,54.85,249c0,0-36.09-25.52-46.78-54.13C5.71,188.49.66,169.32.19,159.55A6.45,6.45,0,0,0,.1,158.56Z"
              />
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
}

export default ActiveLevel;
