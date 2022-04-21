export type CreateContractDto = {
  id: string;
  chainId: number;
  contractAddress: string;
  contractContent: string;
  published: boolean;
  collectionType: 'expandable' | 'cryptopunks';
};

export type GenerateNftCollectionDto = {
  id: string;
  collectionSize: number;
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
  Canceled = 'canceled',
  Failed = 'failed'
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
  txHash?: string;
  whiteList?: string[];
  updatedAt?: string;
  collectionSize?: number;
  generatedNfts?: number;
}

export type CreateNftCollectionDto = Omit<
  NftCollectionDto,
  | 'id'
  | 'collectionCID'
  | 'metadataCID'
  | 'status'
  | 'createdAt'
  | 'creator'
  | 'updatedAt'
  | 'collectionSize'
  | 'generatedNfts'
>;

export type UpdateNftCollectionDto = Omit<
  NftCollectionDto,
  | 'collectionCID'
  | 'metadataCID'
  | 'createdAt'
  | 'status'
  | 'creator'
  | 'updatedAt'
  | 'collectionSize'
  | 'generatedNfts'
>;

export const EMPTY_CREATENFTCOLLECTIONDTO: CreateNftCollectionDto = {
  images: [],
  layers: [],
  layerOrder: [],
  name: '',
  description: ''
};

export interface CreateCollectionDto {
  account: string;
  id: string;
  socialUrls?: string[];
  avatarCID?: string;
  coverCID?: string;
  description?: string;
}
