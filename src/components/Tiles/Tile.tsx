import { InventoryItem } from "../../api/gameApiSlice";
import renderContent from "../../features/content/renderContent";
import "./Tile.scss";

type PropsType = {
  number?: number;
  name?: string;
  svg?: string;
  booster?: InventoryItem;
  onClick?: (() => Promise<void>) | (() => void);
  selected?: boolean;
  subjectSvg?: boolean;
};

const Tile = (props: PropsType) => {

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  const capitalizeWords = (subjectName: string) => {
    return subjectName.replace(/(?:^|\s)\S/g, a => { return a.toUpperCase(); });
  };

  const tileClass = `${props.selected ? 'selected' : ''}`;

  const content = props.number && !props.name ? (
    <div className={`tile--grade ${tileClass}`} onClick={handleClick}>
      <p>{props.number}</p>
    </div>
  ) : props.booster ? (
    <div className="booster-tile" onClick={props.onClick}>
      <p>{props.booster.booster.name}</p>
      {renderContent('boosters', `${props.booster.booster.name}`, `${props.booster.booster.name}`)}
      <div className="booster-quantity">
        <p>{props.booster.quantity}</p>
      </div>
    </div>
  ) : props.subjectSvg ? (
    <div className={`tile--subject ${tileClass}`} onClick={handleClick}>
      {renderContent('app', 'Subjects', `${props.name}`)}
      <div className="name">{capitalizeWords(props.name!)}</div>
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
