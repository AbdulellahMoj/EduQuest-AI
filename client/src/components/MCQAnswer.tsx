interface Props {
  letter: string;
  text: string;
  onClick: () => void;
}

function MCQAnswer({ letter, text, onClick }: Props) {
  return (
    <div className="mcq-answers-container" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1115.63 114"
        style={{ width: "780px", position: "absolute" }}
      >
        <defs>
          <style>{`.cls-1{fill:#aaafe8;stroke:#0c0101;stroke-miterlimit:10;}.cls-1,.cls-2{fill-rule:evenodd;}.cls-2{fill:#fff;}`}</style>
        </defs>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <polygon
              className="cls-1"
              points="25.68 0.5 1089.95 0.5 1089.95 5.74 1098.35 5.74 1098.35 10.56 1106.74 10.56 1106.74 15.38 1115.13 15.38 1115.13 98.61 1107.67 98.61 1107.67 103.44 1099.28 103.44 1099.28 108.26 1090.88 108.26 1090.88 113.5 26.15 113.5 26.15 108.68 17.75 108.68 17.75 103.86 9.36 103.86 9.36 99.03 0.5 99.03 0.5 15.38 8.89 15.38 8.89 10.56 17.29 10.56 17.29 5.74 25.68 5.74 25.68 0.5"
            />
            <path
              className="cls-2"
              d="M31.06,5.8H1084.58v4.75h8.21v4.37H1101v4.37h8.21V94.71h-7.29v4.37h-8.22v4.37h-8.21v4.75H31.52v-4.37H23.33V99.52H15.09V95.09H6.43V19.29h8.21V14.92h8.21V10.55h8.21Z"
            />
          </g>
        </g>
      </svg>
      <div className="mcq-answers">{`${letter}. ${text}`}</div>
    </div>
  );
}

export default MCQAnswer;
