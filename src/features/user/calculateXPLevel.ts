const calculateXPLevel = (totalXp: number): number => {
  let level = 1;
  let xpToNextLevel = 2000;

  while (totalXp >= xpToNextLevel) {
    totalXp -= xpToNextLevel;
    if (level < 10) {
      xpToNextLevel = 2000;
    } else if (level < 100) {
      xpToNextLevel = 2000 + ((level + level - 1) * 100);
    } else {
      return 100;
    }
    level++;
  }

  return level;
};


export default calculateXPLevel;
