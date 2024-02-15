import './subjecttile.scss';

type SubjectProps = {
    name: string;
    svg: string; 
}

const SubjectTile = (props: SubjectProps) => {

    const name = props.name;
    const svg = props.svg;

    const content = (
        <div className="subject-tile">
            <img src={svg} className="svg-container"></img>
            <div className="name">{name}</div>
        </div>
    )

    return content;
}

export default SubjectTile