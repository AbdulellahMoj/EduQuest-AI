interface Props {
  question: string;
  questionNo: number;
}

function MCQBanner({ question, questionNo }: Props) {
  return (
    <div className="mcq-question-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1570 287.91"
        style={{ width: "850px", position: "absolute" }}
      >
        <defs>
          <style>{`.cls-1{fill:#aaafe8;stroke:#000;}.cls-1,.cls-20{stroke-miterlimit:10;fill-rule:evenodd;}.cls-20{fill:#E7EDF9;stroke:#fcfcfc;}`}</style>
        </defs>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <polygon
              className="cls-1"
              points="72.73 0.5 1497.27 0.5 1497.27 13.81 1521.35 13.81 1521.35 26.05 1545.42 26.05 1545.42 38.29 1569.5 38.29 1569.5 249.62 1548.1 249.62 1548.1 261.86 1524.02 261.86 1524.02 274.11 1499.94 274.11 1499.94 287.41 74.07 287.41 74.07 275.17 49.99 275.17 49.99 262.93 25.91 262.93 25.91 250.69 0.5 250.69 0.5 38.29 24.58 38.29 24.58 26.05 48.65 26.05 48.65 13.81 72.73 13.81 72.73 0.5"
            />
            <polygon
              className="cls-20"
              points="88.17 14.46 1481.83 14.46 1481.83 26.52 1505.39 26.52 1505.39 37.61 1528.94 37.61 1528.94 48.71 1552.5 48.71 1552.5 240.21 1531.56 240.21 1531.56 251.3 1508.01 251.3 1508.01 262.4 1484.45 262.4 1484.45 274.46 89.47 274.46 89.47 263.36 65.97 263.36 65.97 252.41 42.36 252.41 42.36 241.17 17.5 241.17 17.5 48.71 41.06 48.71 41.06 37.61 64.61 37.61 64.61 26.52 88.17 26.52 88.17 14.46"
            />
          </g>
        </g>
      </svg>
      <div className="mcq-question">{`${questionNo}. ${question}`}</div>
    </div>
  );
}

export default MCQBanner;
