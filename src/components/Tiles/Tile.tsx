import renderContent from "../../features/content/renderContent";
import "./Tile.scss";

type PropsType = {
  number?: number;
  name?: string;
  svg?: string;
  booster?: { name: string, quantity: number, desc: string, rarity: string };
  onClick?: (() => Promise<void>) | (() => void)
};

const Tile = (props: PropsType) => {

  const content = props.number && !props.name ? (
    <div className={`tile--grade`}>
      <p>{props.number}</p>
    </div>
  ) : props.booster ? (
    <div className="booster-tile" onClick={props.onClick}>
      <p>{props.booster.name}</p>
      {renderContent('boosters', `${props.booster.name}`, `${props.booster.name}`)}
      <div className="booster-quantity">
        <p>{props.booster.quantity}</p>
      </div>
    </div>
  ) : props.svg ? (
    <div className={`tile--subject`}>
      <img src={props.svg} className="svg-container" />
      <div className="name">{props.name}</div>
    </div>
  ) : (
    <div className="stat-tile">
      <div className="stat-tile_name">{props.name}</div>
      <div className="stat-tile_val">{props.number}</div>
    </div>
  );

  return content;
};

export default Tile;
