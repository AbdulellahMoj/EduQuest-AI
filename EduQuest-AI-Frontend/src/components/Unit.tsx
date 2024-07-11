import Lines from "./Lines";

interface Props {
  title: string;
  text: string;
}
function Units({ title, text }: Props) {
  return (
    <div className="units-container">
      <div className="units-container-internal">
        <div className="unit-title">{title}</div>
        <div className="unit-text">{text}</div>
      </div>
    </div>
  );
}

export default Units;
