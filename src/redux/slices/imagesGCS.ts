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
  error: Error | string | null;
  board: {
    images: Record<string, Image>;
    layers: Record<string, ImagesLayer>;
    layerOrder: string[];
  };
};

const initialState: InitialState = {
  isLoading: false,
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

    persistCard(state, action) {
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

    deleteTask(state, action) {
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

// ----------------------------------------------------------------------

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

export function getBoard(accessToken: string, collectionId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const collectionInfo = await getCollectionInfo(accessToken, collectionId);
      console.log('collectionInfo', collectionInfo);

      // dispatch(
      //   slice.actions.getBoardSuccess({
      //     cards: collectionInfo.images,
      //     columns: collectionInfo.layers,
      //     columnOrder: collectionInfo.layerOrder
      //   })
      // );
      dispatch(slice.actions.getBoardSuccess(mock_board_2));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

export function persistLayer(newLayerOrder: string[]) {
  return () => {
    dispatch(slice.actions.persistLayer(newLayerOrder));
  };
}

// ----------------------------------------------------------------------

export function persistCard(layers: Record<string, ImagesLayer>) {
  return () => {
    dispatch(slice.actions.persistCard(layers));
  };
}

// ----------------------------------------------------------------------

export function addImage({ image, layerId }: { image: Partial<Image>; layerId: string }) {
  return () => {
    dispatch(slice.actions.addImage({ image, layerId }));
  };
}

// ----------------------------------------------------------------------

export function updatePartialImage({ card }: { card: Partial<Image> }) {
  return () => {
    dispatch(slice.actions.updatePartialImage({ card }));
  };
}

// ----------------------------------------------------------------------

export function deleteTask({ imageId, layerId }: { imageId: string; layerId: string }) {
  return () => {
    dispatch(slice.actions.deleteTask({ imageId, layerId }));
  };
}

const mock_board = {
  images: [
    {
      id: 'deb02f04-9cf8-4f1e-97e0-2fbda84cc6b3',
      name: 'Call with sales of HubSpot',
      description:
        'Duis condimentum lacus finibus felis pellentesque, ac auctor nibh fermentum. Duis sed dui ante. Phasellus id eros tincidunt, dictum lorem vitae, pellentesque sem. Aenean eu enim sit amet mauris rhoncus mollis. Sed enim turpis, porta a felis et, luctus faucibus nisi. Phasellus et metus fermentum, ultrices arcu aliquam, facilisis justo. Cras nunc nunc, elementum sed euismod ut, maximus eget nibh. Phasellus condimentum lorem neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce sagittis pharetra eleifend. Suspendisse potenti.',
      assignee: [
        {
          id: '473d2720-341c-49bf-94ed-556999cf6ef7',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg',
          name: 'Lucian Obrien'
        }
      ],
      due: [1646661671287, 1646748071287],
      imageUrl: [],
      comments: [
        {
          id: '1874ef88-0467-4831-a144-fe0ee034d080',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_1.jpg',
          name: 'Jayvion Simon',
          createdAt: '2022-03-01T14:01:11.288Z',
          messageType: 'text',
          message: 'Assumenda nam repudiandae rerum fugiat vel maxime.'
        },
        {
          id: 'ae127000-fba3-4889-a263-cf5b2cbb104c',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg',
          name: 'Lucian Obrien',
          createdAt: '2022-02-28T13:01:11.288Z',
          messageType: 'text',
          message: 'Quis veniam aut saepe aliquid nulla.'
        },
        {
          id: '31b3e0e1-1df5-4bbd-8221-445037cb6320',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_3.jpg',
          name: 'Deja Brady',
          createdAt: '2022-02-27T12:01:11.288Z',
          messageType: 'text',
          message: 'Reprehenderit ut voluptas sapiente ratione nostrum est.'
        },
        {
          id: '2a4d9ec5-f74d-464f-a4a0-c2811ac808da',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_4.jpg',
          name: 'Harrison Stein',
          createdAt: '2022-02-26T11:01:11.288Z',
          messageType: 'image',
          message: 'https://minimal-assets-api.vercel.app/assets/images/feeds/feed_7.jpg'
        },
        {
          id: '4c29dbbf-aab6-4505-8bba-a7d1f4dcda1b',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_5.jpg',
          name: 'Reece Chung',
          createdAt: '2022-02-25T10:01:11.288Z',
          messageType: 'text',
          message: 'Quo quia sit nihil nemo doloremque et.'
        },
        {
          id: 'babc6b7e-f867-4f53-b5b6-7d70d1f9c159',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_6.jpg',
          name: 'Lainey Davidson',
          createdAt: '2022-02-24T09:01:11.288Z',
          messageType: 'image',
          message: 'https://minimal-assets-api.vercel.app/assets/images/feeds/feed_9.jpg'
        },
        {
          id: '5ffb6316-d8f4-44c9-b889-a3a3964c7cd0',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_7.jpg',
          name: 'Cristopher Cardenas',
          createdAt: '2022-02-23T08:01:11.288Z',
          messageType: 'text',
          message: 'Tempora officiis consequuntur architecto nostrum autem nam adipisci.'
        },
        {
          id: '422cdc7c-d8f7-480d-bd41-72f18bea9448',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_8.jpg',
          name: 'Melanie Noble',
          createdAt: '2022-02-22T07:01:11.288Z',
          messageType: 'text',
          message: 'Voluptas sunt magni adipisci praesentium saepe.'
        }
      ],
      completed: true
    },
    {
      id: '98bf6e8b-becc-485b-9c3f-a7d09392c48d',
      name: 'Interview for the Asis. Sales Manager',
      description: 'We are looking for vue experience and of course node js strong knowledge',
      assignee: [
        {
          id: '473d2720-341c-49bf-94ed-556999cf6ef7',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg',
          name: 'Deja Brady'
        },
        {
          id: 'b8395203-887c-46f5-a85f-339b2d75c98b',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_3.jpg',
          name: 'Harrison Stein'
        },
        {
          id: '18e23ac9-c874-43e4-8163-2d37f15f3367',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_4.jpg',
          name: 'Reece Chung'
        },
        {
          id: 'a3be5485-03bf-47a6-b553-a9cf9f070ed8',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_5.jpg',
          name: 'Lainey Davidson'
        },
        {
          id: '048f6343-7a65-4873-a570-eb6ff4eb1ba3',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_6.jpg',
          name: 'Cristopher Cardenas'
        }
      ],
      due: [1646661671287, 1646748071287],
      imageUrl: ['https://minimal-assets-api.vercel.app/assets/images/feeds/feed_2.jpg'],
      comments: [],
      completed: false
    },
    {
      id: '99fbc02c-de89-4be3-9515-f8bd12227d38',
      name: 'Change the height of the top bar because it looks too chunky',
      description:
        'We nede to make it aggressive with pricing because it’s in their interest to acquire us',
      assignee: [],
      due: [null, null],
      imageUrl: [],
      comments: [],
      completed: true
    },
    {
      id: 'ab9cebca-6cb4-4847-aa17-3b261b3dd0fb',
      name: 'Integrate Stripe API',
      description:
        'We nede to make it aggresive with pricing because it’s in their interest to acquire us',
      assignee: [
        {
          id: 'b8395203-887c-46f5-a85f-339b2d75c98b',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_3.jpg',
          name: 'Melanie Noble'
        },
        {
          id: 'a3be5485-03bf-47a6-b553-a9cf9f070ed8',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_6.jpg',
          name: 'Chase Day'
        }
      ],
      due: [null, null],
      imageUrl: ['https://minimal-assets-api.vercel.app/assets/images/feeds/feed_4.jpg'],
      comments: [],
      completed: false
    },
    {
      id: 'ebf0d26a-78e5-414f-986f-003d8fcd3154',
      name: 'Update the customer API for payments',
      description:
        'We need to make it aggresive with pricing because it’s in their interest to acquire us',
      assignee: [
        {
          id: '473d2720-341c-49bf-94ed-556999cf6ef7',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg',
          name: 'Shawn Manning'
        }
      ],
      due: [null, null],
      imageUrl: [],
      comments: [],
      completed: true
    },
    {
      id: '9d98ce30-3c51-4de3-8537-7a4b663ee3af',
      name: 'Release minimals DS',
      description: 'Production',
      assignee: [
        {
          id: '473d2720-341c-49bf-94ed-556999cf6ef7',
          avatar: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg',
          name: 'Soren Durham'
        }
      ],
      due: [null, null],
      imageUrl: [],
      comments: [],
      completed: true
    }
  ],
  layers: [
    {
      id: '8cd887ec-b3bc-11eb-8529-0242ac130003',
      name: 'Backlog',
      imageIds: [
        'deb02f04-9cf8-4f1e-97e0-2fbda84cc6b3',
        '98bf6e8b-becc-485b-9c3f-a7d09392c48d',
        '99fbc02c-de89-4be3-9515-f8bd12227d38'
      ]
    },
    {
      id: '23008a1f-ad94-4771-b85c-3566755afab7',
      name: 'Progress',
      imageIds: ['ab9cebca-6cb4-4847-aa17-3b261b3dd0fb', 'ebf0d26a-78e5-414f-986f-003d8fcd3154']
    },
    {
      id: '37a9a747-f732-4587-a866-88d51c037641',
      name: 'Q&A',
      imageIds: []
    },
    {
      id: '4ac3cd37-b3e1-466a-8e3b-d7d88f6f5d4f',
      name: 'Production',
      imageIds: ['9d98ce30-3c51-4de3-8537-7a4b663ee3af']
    }
  ],
  layerOrder: [
    '8cd887ec-b3bc-11eb-8529-0242ac130003',
    '23008a1f-ad94-4771-b85c-3566755afab7',
    '37a9a747-f732-4587-a866-88d51c037641',
    '4ac3cd37-b3e1-466a-8e3b-d7d88f6f5d4f'
  ]
};
