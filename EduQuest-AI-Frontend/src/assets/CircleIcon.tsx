function CircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67.17 67.17">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <circle
            fill="url(#pattern)"
            className="cls-1"
            cx="33.58"
            cy="33.58"
            r="32.58"
          />
        </g>
      </g>
      <pattern
        id="pattern"
        patternUnits="userSpaceOnUse"
        width="400"
        height="400"
      >
        {" "}
        {/* <---- these attributes needed here */}
        <image
          id="pattern"
          href="https://i.ibb.co/w470KGn/Asset-20.png"
          height={400}
          width={400}
          x={50}
          y={38}
        />
      </pattern>
      ;
    </svg>
  );
}

export default CircleIcon;
