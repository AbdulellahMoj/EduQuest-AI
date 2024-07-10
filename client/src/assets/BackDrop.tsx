interface Props {
  background: string;
}
function BackDrop({ background }: Props) {
  return <img src={background} width="164px"></img>;
}

export default BackDrop;
