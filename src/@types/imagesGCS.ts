export type Assignee = {
  id: string;
  avatar: string;
  name: string;
};

export type Image = {
  id: string;
  name: string;
};

export type ImagesLayer = {
  id: string;
  name: string;
  imageIds: string[];
};

export type ImagesBoard = {
  images: Image[];
  layers: ImagesLayer[];
  layerOrder: string[];
};
