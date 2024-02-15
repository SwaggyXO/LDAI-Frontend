import './tiles.scss'

type TilesProps = {
  number: number;
}

const Tiles = (props: TilesProps) => {
  return (
    <div className="tile">
      <p>{props.number}</p>
    </div>
  );
};

export default Tiles;
