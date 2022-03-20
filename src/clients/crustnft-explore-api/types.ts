export type TCreateContract = {
  txHash: string;
  contractAddress: string;
  account: string;
  chainId: number;
  contractContent: string;
};

export interface Image {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface Layer {
  id: string;
  name: string;
  imageIds: string[];
}

export enum TaskStatus {
  Pending = 'pending',
  Assigned = 'assigned',
  Processing = 'processing',
  Completed = 'completed',
  Canceled = 'canceled'
}
export interface NftCollectionDto {
  id: string;
  images: Image[];
  layers: Layer[];
  layerOrder: string[];
  name: string;
  description: string;
  creator: string;
  createdAt?: string;
  status: TaskStatus;
  collectionCID?: string;
  metadataCID?: string;
}

export type CreateNftCollectionDto = Omit<
  NftCollectionDto,
  'id' | 'collectionCID' | 'metadataCID' | 'status' | 'createdAt' | 'creator'
>;

export type UpdateNftCollectionDto = Omit<
  NftCollectionDto,
  'collectionCID' | 'metadataCID' | 'createdAt' | 'status' | 'creator'
>;

export const EMPTY_CREATENFTCOLLECTIONDTO: CreateNftCollectionDto = {
  images: [],
  layers: [],
  layerOrder: [],
  name: '',
  description: ''
};
