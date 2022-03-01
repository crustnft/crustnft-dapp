export type CardComment = {
  id: string;
  avatar: string;
  name: string;
  createdAt: Date | string | number;
  messageType: 'image' | 'text';
  message: string;
};

export type Assignee = {
  id: string;
  avatar: string;
  name: string;
};

export type ImageCard = {
  id: string;
  name: string;
  description?: string;
  assignee: Assignee[];
  due: [number | null, number | null];
  attachments: string[];
  comments: CardComment[];
  completed: boolean;
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
