export type PropertyProps = {
  propType: string;
  name: string;
};

export type LevelProps = {
  levelType: string;
  value: number;
  max: number;
};

export type StatProps = {
  statType: string;
  value: number;
  max: number;
};

export type BoostProps = {
  boostType: string;
  displayType: 'boost_percentage' | 'boost_number';
  value: number;
};
