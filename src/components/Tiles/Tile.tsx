import renderContent from "../../features/content/renderContent";
import "./Tile.scss";

type PropsType = {
  number?: number;
  name?: string;
  svg?: string;
  booster?: { name: string, quantity: number, desc: string, rarity: string };
  onClick?: (() => Promise<void>) | (() => void)
  index: number
};

const Tile = (props: PropsType) => {

  const content = props.number ? (
    <div className={`tile--grade`} key={props.index}>
      <p>{props.number}</p>
    </div>
  ) : props.booster ? (
    <div className="booster-tile" onClick={props.onClick} key={props.index}>
      <p>{props.booster.name}</p>
      {renderContent('boosters', `${props.booster.name}`, `${props.booster.name}`)}
      <div className="booster-quantity">
        <p>{props.booster.quantity}</p>
      </div>
    </div>
  ) : (
    <div className={`tile--subject`} key={props.index}>
      <img src={props.svg} className="svg-container" />
      <div className="name">{props.name}</div>
    </div>
  );

  return content;
};

export default Tile;
