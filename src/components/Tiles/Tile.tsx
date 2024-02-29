import "./Tile.scss";

type PropsType = {
  number?: number;
  name?: string;
  svg?: string;
  booster?: { name: string, svg: string, quantity: number, desc: string, rarity: string };
  onClick?: (() => Promise<void>) | (() => void)
};

const Tile = (props: PropsType) => {

  

  const content = props.number ? (
    <div className={`tile--grade`}>
      <p>{props.number}</p>
    </div>
  ) : props.booster ? (
    <div className="booster-tile" onClick={props.onClick}>
      <p>{props.booster.name}</p>
      <img src={props.booster.svg} alt={props.booster.name} />
      <div className="booster-quantity">
        <p>{props.booster.quantity}</p>
      </div>
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
