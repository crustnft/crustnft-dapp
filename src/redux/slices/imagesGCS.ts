import { createSlice } from '@reduxjs/toolkit';
import { getCollectionInfo } from 'clients/crustnft-explore-api/nft-collections';
import omit from 'lodash/omit';
import uuidv4 from 'utils/uuidv4';
import { Image, ImagesLayer } from '../../@types/imagesGCS';
import { dispatch } from '../store';

function objFromArray<Type extends Record<string, any>>(array: Type[], key: string = 'id') {
  return array.reduce<Record<string, Type>>((accumulator, current) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
}

type InitialState = {
  isLoading: boolean;
  isFirstLoaded: boolean;
  error: Error | string | null;
  board: {
    images: Record<string, Image>;
    layers: Record<string, ImagesLayer>;
    layerOrder: string[];
  };
};

const initialState: InitialState = {
  isLoading: false,
  isFirstLoaded: false,
  error: null,
  board: {
    images: {},
    layers: {},
    layerOrder: []
  }
};

const slice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET BOARD
    getBoardSuccess(state, action) {
      state.isLoading = false;
      const board = action.payload;
      const images = objFromArray<Image>(board.images);
      const layers = objFromArray<ImagesLayer>(board.layers);
      const { layerOrder } = board;
      state.board = {
        images,
        layers,
        layerOrder
      };
      state.isFirstLoaded = true;
    },

    // CREATE NEW LAYER
    createLayerSuccess(state, action) {
      const newLayer = action.payload;
      state.isLoading = false;
      state.board.layers = {
        ...state.board.layers,
        [newLayer.id]: newLayer
      };
      state.board.layerOrder.push(newLayer.id);
    },

    persistImage(state, action) {
      const layers = action.payload;
      state.board.layers = layers;
    },

    persistLayer(state, action) {
      state.board.layerOrder = action.payload;
    },

    addImage(state, action) {
      const { image, layerId } = action.payload;

      state.board.images[image.id] = image;
      state.board.layers[layerId].imageIds.push(image.id);
    },

    updatePartialImage(state, action) {
      const { image } = action.payload;

      if (state.board.images.hasOwnProperty(image.id)) {
        state.board.images[image.id] = { ...state.board.images[image.id], ...image };
      }
    },

    deleteImage(state, action) {
      const { imageId, layerId } = action.payload;

      state.board.layers[layerId].imageIds = state.board.layers[layerId].imageIds.filter(
        (id) => id !== imageId
      );

      state.board.images = omit(state.board.images, [imageId]);
    },

    // UPDATE LAYER
    updateLayerSuccess(state, action) {
      const layer = action.payload;

      state.isLoading = false;
      state.board.layers[layer.id] = layer;
    },

    // DELETE LAYER
    deleteLayerSuccess(state, action) {
      const { layerId } = action.payload;
      const deletedLayer = state.board.layers[layerId];

      state.isLoading = false;
      state.board.layers = omit(state.board.layers, [layerId]);
      state.board.images = omit(state.board.images, [...deletedLayer.imageIds]);
      state.board.layerOrder = state.board.layerOrder.filter((c) => c !== layerId);
    }
  }
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

export function getBoard(accessToken: string, collectionId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const collectionInfo = await getCollectionInfo(accessToken, collectionId);

      dispatch(slice.actions.getBoardSuccess(collectionInfo));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createLayer(newLayer: { name: string }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.post(
      //   'https://minimal-assets-api.vercel.app/api/kanban/columns/new',
      //   newColumn
      // );

      dispatch(
        slice.actions.createLayerSuccess({ imageIds: [], id: uuidv4(), name: newLayer.name })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateLayer(layerId: string, updateLayer: ImagesLayer) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.post(
      //   'https://minimal-assets-api.vercel.app/api/kanban/columns/update',
      //   {
      //     layerId,
      //     updateLayer
      //   }
      // );
      dispatch(slice.actions.updateLayerSuccess(updateLayer));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteLayer(layerId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      // await axios.post('https://minimal-assets-api.vercel.app/api/kanban/columns/delete', {
      //   layerId
      // });
      dispatch(slice.actions.deleteLayerSuccess({ layerId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function persistLayer(newLayerOrder: string[]) {
  return () => {
    dispatch(slice.actions.persistLayer(newLayerOrder));
  };
}

export function persistImage(layers: Record<string, ImagesLayer>) {
  return () => {
    dispatch(slice.actions.persistImage(layers));
  };
}

export function addImage({ image, layerId }: { image: Partial<Image>; layerId: string }) {
  return () => {
    dispatch(slice.actions.addImage({ image, layerId }));
  };
}

export function updatePartialImage({ image }: { image: Partial<Image> }) {
  return () => {
    dispatch(slice.actions.updatePartialImage({ image }));
  };
}

export function deleteImage({ imageId, layerId }: { imageId: string; layerId: string }) {
  return () => {
    dispatch(slice.actions.deleteImage({ imageId, layerId }));
  };
}

const mock_board_2 = {
  images: [
    {
      id: '98bf6e8b-becc-485b-9c3f-a7d09392c48d',
      name: 'Yellow',
      imageUrl: 'https://minimal-assets-api.vercel.app/assets/images/feeds/feed_2.jpg'
    },
    {
      id: 'ab9cebca-6cb4-4847-aa17-3b261b3dd0fb',
      name: 'Multi',
      imageUrl: 'https://minimal-assets-api.vercel.app/assets/images/feeds/feed_4.jpg'
    },
    {
      id: 'ab9cebca-6cb4-4847-aa17-3b261b3d1234',
      name: 'Multi',
      imageUrl: 'https://minimal-assets-api.vercel.app/assets/images/feeds/feed_1.jpg'
    },
    {
      id: 'ab9cebca-6cb4-4847-aa17-3b261b3d1235',
      name: 'Multi',
      imageUrl: 'https://minimal-assets-api.vercel.app/assets/images/feeds/feed_3.jpg'
    },
    {
      id: 'ab9cebca-6cb4-4847-aa17-3b261b3d1236',
      name: 'Multi',
      imageUrl: 'https://minimal-assets-api.vercel.app/assets/images/feeds/feed_5.jpg'
    }
  ],
  layers: [
    {
      id: '8cd887ec-b3bc-11eb-8529-0242ac130003',
      name: 'Background',
      imageIds: [
        '98bf6e8b-becc-485b-9c3f-a7d09392c48d',
        'ab9cebca-6cb4-4847-aa17-3b261b3d1236',
        'ab9cebca-6cb4-4847-aa17-3b261b3d1234',
        'ab9cebca-6cb4-4847-aa17-3b261b3d1235'
      ]
    },
    {
      id: '23008a1f-ad94-4771-b85c-3566755afab7',
      name: 'Upper layer',
      imageIds: ['ab9cebca-6cb4-4847-aa17-3b261b3dd0fb']
    }
  ],
  layerOrder: ['8cd887ec-b3bc-11eb-8529-0242ac130003', '23008a1f-ad94-4771-b85c-3566755afab7']
};
