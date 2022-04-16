type TImage = {
  name: string;
  id: string;
};

type TLayer = {
  id: string;
  name: string;
  imageIds: string[];
};

export type TProject = {
  collectionCID?: string;
  createdAt?: string;
  creator: string;
  description?: string;
  id: string;
  images?: TImage[];
  layerOrder: string[];
  layers?: TLayer[];
  metadataCID?: string;
  name: string;
  status?: string;
};
