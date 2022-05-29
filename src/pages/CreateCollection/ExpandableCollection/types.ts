export type Property = {
  name: string;
  value: string;
};
export type CollectionBoostDisplayType = 'boost_number' | 'boost_percentage';
export type CollectionFormType = {
  properties: Array<Property>;
  levels: Array<{
    levelType: string;
    value: number;
    max: number;
  }>;
  stats: Array<{
    statType: string;
    value: number;
    max: number;
  }>;
  boosts: Array<{
    boostType: string;
    value: number;
    displayType: CollectionBoostDisplayType;
  }>;
};
export type CollectionComplexInputFormType<T extends keyof CollectionFormType> = {
  [k: string]: CollectionFormType[T];
};
