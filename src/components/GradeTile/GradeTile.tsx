import './gradetile.scss'

type TilesProps = {
  number: number;
}

const GradeTile = (props: TilesProps) => {
  return (
    <div className="tile">
      <p>{props.number}</p>
    </div>
  );
};

export default GradeTile;
