import './boostertile.scss';

type BoosterTileProps = {
    booster: { name: string, svg: string, quantity: number, desc: string, rarity: string }
}

const BoosterTile = (props: BoosterTileProps) => {

    const booster = props.booster;

    const content = (
        <div className="booster-tile">
            <p>{booster.name}</p>
            <img src={booster.svg} alt={booster.name} />
            <div className="booster-quantity">
                <p>{booster.quantity}</p>
            </div>
        </div>
    );

    return content;
}

export default BoosterTile