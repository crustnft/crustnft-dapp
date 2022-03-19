export type Assignee = {
  id: string;
  avatar: string;
  name: string;
};

export type ImageCard = {
  id: string;
  name: string;
  imageUrl: string;
};

export type ImagesColumn = {
  id: string;
  name: string;
  cardIds: string[];
};

export type ImagesBoard = {
  cards: ImageCard[];
  columns: ImagesColumn[];
  columnOrder: string[];
};
