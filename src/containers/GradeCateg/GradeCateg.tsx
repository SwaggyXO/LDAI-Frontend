import './gradecateg.scss';

type GradeCategProps = {
  heading: string;
  tiles: React.ReactNode[];
}

const GradeCateg = (props: GradeCategProps) => {

  const heading = props.heading;
  const tiles = props.tiles;

  return (
    <div className="grade-categ">
      <div className="header">
        <div className="line-container">
          <div className="line"></div>
        </div>
        <h2>{heading}</h2>
        <div className="line-container">
          <div className="line"></div>
        </div>
      </div>
      <div className="tiles-container">
        {tiles.map((tile, index) => (
          <div key={index}>
            {tile}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradeCateg;