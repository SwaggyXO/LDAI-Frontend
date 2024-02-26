import "./Tile.scss";

type PropsType = {
  number?: number;
  name?: string;
  svg?: string;
};

const Tile = (props: PropsType) => {
  const content = props.number ? (
    <div className={`tile--grade`}>
      <p>{props.number}</p>
    </div>
  ) : (
    <div className={`tile--subject`}>
      <img src={props.svg} className="svg-container" />
      <div className="name">{props.name}</div>
    </div>
  );

  return content;
};

export default Tile;
