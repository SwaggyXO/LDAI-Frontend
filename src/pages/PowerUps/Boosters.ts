import DoubleXP from '../../assets/XP/Double XP.svg';
import DoubleMarbles from '../../assets/Marbles/Double Marble.svg';
import TimeFreeze from '../../assets/Time Freeze/Time-freeze.png';
import FactHint from '../../assets/Keyword hint/Asset 1.svg';
import Dot from '../../assets/Mascot/SVG/Asset 9.svg';

export const Boosters = [
    {
        name: "Double XP",
        svg: DoubleXP,
        quantity: 2,
        desc: "Doubles the amount of XP Gained from a quiz set.",
        rarity: "Common"
    },
    {
        name: "Double Marbles",
        svg: DoubleMarbles,
        quantity: 2,
        desc: "Doubles the amount of Marbles Gained from a quiz set.",
        rarity: "Common"
    },
    {
        name: "Time Freeze",
        svg: TimeFreeze,
        quantity: 2,
        desc: "Freezes the timer for the current question for a while.",
        rarity: "Rare"
    },
    {
        name: "Fact Hint",
        svg: FactHint,
        quantity: 2,
        desc: "Reveals some facts required for the answer, reduces the time by a little.",
        rarity: "Epic"
    },
    {
        name: "Dot",
        svg: Dot,
        quantity: 1,
        desc: "Automatically answers 2 questions in the set",
        rarity: "Legendary"
    },
]


// Common - (5K)
// Rare - (8K)
// Epic - (15K)
// Legendary - (30K)
