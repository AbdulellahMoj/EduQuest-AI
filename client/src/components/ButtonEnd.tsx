import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function ButtonEnd() {
  const navigate = useNavigate();
  const { courseCode } = useParams<{ courseCode: string }>();

  const handleClick = () => {
    navigate(`/course/${courseCode}`);
  };

  return (
    <div
      className="back-to-map"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="back-to-map-text">Back to Map</div>
      <svg
        width="353"
        height="131"
        viewBox="0 0 353 131"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", width: 250, top: 600, left: 80 }}
      >
        <g filter="url(#filter0_d_141_16)">
          <rect
            x="4"
            width="345"
            height="116.852"
            rx="58.4261"
            fill="url(#paint0_linear_141_16)"
          />
          <rect
            x="9.9198"
            y="8.63159"
            width="332.262"
            height="98.1814"
            rx="49.0907"
            stroke="white"
            strokeWidth="6"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_141_16"
            x="0"
            y="0"
            width="353"
            height="130.852"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="10" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_141_16"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_141_16"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_141_16"
            x1="161.37"
            y1="36.6523"
            x2="332.356"
            y2="41.6256"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8772E4" />
            <stop offset="1" stopColor="#6450BE" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default ButtonEnd;
