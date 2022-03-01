import { createSlice } from '@reduxjs/toolkit';
import omit from 'lodash/omit';
import uuidv4 from 'utils/uuidv4';
import { ImageCard, ImagesColumn } from '../../@types/imagesGCS';
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
    cards: Record<string, ImageCard>;
    columns: Record<string, ImagesColumn>;
    columnOrder: string[];
  };
};

const initialState: InitialState = {
  isLoading: false,
  error: null,
  board: {
    cards: {},
    columns: {},
    columnOrder: []
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
      const cards = objFromArray<ImageCard>(board.cards);
      const columns = objFromArray<ImagesColumn>(board.columns);
      const { columnOrder } = board;
      state.board = {
        cards,
        columns,
        columnOrder
      };
    },

    // CREATE NEW COLUMN
    createColumnSuccess(state, action) {
      const newColumn = action.payload;
      state.isLoading = false;
      state.board.columns = {
        ...state.board.columns,
        [newColumn.id]: newColumn
      };
      state.board.columnOrder.push(newColumn.id);
    },

    persistCard(state, action) {
      const columns = action.payload;
      state.board.columns = columns;
    },

    persistColumn(state, action) {
      state.board.columnOrder = action.payload;
    },

    addTask(state, action) {
      const { card, columnId } = action.payload;

      state.board.cards[card.id] = card;
      state.board.columns[columnId].cardIds.push(card.id);
    },

    deleteTask(state, action) {
      const { cardId, columnId } = action.payload;

      state.board.columns[columnId].cardIds = state.board.columns[columnId].cardIds.filter(
        (id) => id !== cardId
      );

      state.board.cards = omit(state.board.cards, [cardId]);
    },

    // UPDATE COLUMN
    updateColumnSuccess(state, action) {
      const column = action.payload;

      state.isLoading = false;
      state.board.columns[column.id] = column;
    },

    // DELETE COLUMN
    deleteColumnSuccess(state, action) {
      const { columnId } = action.payload;
      const deletedColumn = state.board.columns[columnId];

      state.isLoading = false;
      state.board.columns = omit(state.board.columns, [columnId]);
      state.board.cards = omit(state.board.cards, [...deletedColumn.cardIds]);
      state.board.columnOrder = state.board.columnOrder.filter((c) => c !== columnId);
    }
  }
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

// ----------------------------------------------------------------------

const mock_board_2 = {
  cards: [
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
      due: [1646659456363, 1646745856363],
      attachments: ['https://minimal-assets-api.vercel.app/assets/images/feeds/feed_2.jpg'],
      comments: [],
      completed: false
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
      attachments: ['https://minimal-assets-api.vercel.app/assets/images/feeds/feed_4.jpg'],
      comments: [],
      completed: false
    }
  ],
  columns: [
    {
      id: '8cd887ec-b3bc-11eb-8529-0242ac130003',
      name: 'Backlog',
      cardIds: ['98bf6e8b-becc-485b-9c3f-a7d09392c48d']
    },
    {
      id: '23008a1f-ad94-4771-b85c-3566755afab7',
      name: 'Progress',
      cardIds: ['ab9cebca-6cb4-4847-aa17-3b261b3dd0fb']
    }
  ],
  columnOrder: ['8cd887ec-b3bc-11eb-8529-0242ac130003', '23008a1f-ad94-4771-b85c-3566755afab7']
};

export function getBoard() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('https://minimal-assets-api.vercel.app/api/kanban/board');
      console.log(mock_board);
      dispatch(slice.actions.getBoardSuccess(mock_board_2));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createColumn(newColumn: { name: string }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.post(
      //   'https://minimal-assets-api.vercel.app/api/kanban/columns/new',
      //   newColumn
      // );

      dispatch(
        slice.actions.createColumnSuccess({ cardIds: [], id: uuidv4(), name: newColumn.name })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateColumn(columnId: string, updateColumn: ImagesColumn) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.post(
      //   'https://minimal-assets-api.vercel.app/api/kanban/columns/update',
      //   {
      //     columnId,
      //     updateColumn
      //   }
      // );
      dispatch(slice.actions.updateColumnSuccess(updateColumn));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteColumn(columnId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      // await axios.post('https://minimal-assets-api.vercel.app/api/kanban/columns/delete', {
      //   columnId
      // });
      dispatch(slice.actions.deleteColumnSuccess({ columnId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function persistColumn(newColumnOrder: string[]) {
  return () => {
    dispatch(slice.actions.persistColumn(newColumnOrder));
  };
}

// ----------------------------------------------------------------------

export function persistCard(columns: Record<string, ImagesColumn>) {
  return () => {
    dispatch(slice.actions.persistCard(columns));
  };
}

// ----------------------------------------------------------------------

export function addTask({ card, columnId }: { card: Partial<ImageCard>; columnId: string }) {
  return () => {
    dispatch(slice.actions.addTask({ card, columnId }));
  };
}

// ----------------------------------------------------------------------

export function deleteTask({ cardId, columnId }: { cardId: string; columnId: string }) {
  return () => {
    dispatch(slice.actions.deleteTask({ cardId, columnId }));
  };
}

const mock_board = {
  cards: [
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
      attachments: [],
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
      attachments: ['https://minimal-assets-api.vercel.app/assets/images/feeds/feed_2.jpg'],
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
      attachments: [],
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
      attachments: ['https://minimal-assets-api.vercel.app/assets/images/feeds/feed_4.jpg'],
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
      attachments: [],
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
      attachments: [],
      comments: [],
      completed: true
    }
  ],
  columns: [
    {
      id: '8cd887ec-b3bc-11eb-8529-0242ac130003',
      name: 'Backlog',
      cardIds: [
        'deb02f04-9cf8-4f1e-97e0-2fbda84cc6b3',
        '98bf6e8b-becc-485b-9c3f-a7d09392c48d',
        '99fbc02c-de89-4be3-9515-f8bd12227d38'
      ]
    },
    {
      id: '23008a1f-ad94-4771-b85c-3566755afab7',
      name: 'Progress',
      cardIds: ['ab9cebca-6cb4-4847-aa17-3b261b3dd0fb', 'ebf0d26a-78e5-414f-986f-003d8fcd3154']
    },
    {
      id: '37a9a747-f732-4587-a866-88d51c037641',
      name: 'Q&A',
      cardIds: []
    },
    {
      id: '4ac3cd37-b3e1-466a-8e3b-d7d88f6f5d4f',
      name: 'Production',
      cardIds: ['9d98ce30-3c51-4de3-8537-7a4b663ee3af']
    }
  ],
  columnOrder: [
    '8cd887ec-b3bc-11eb-8529-0242ac130003',
    '23008a1f-ad94-4771-b85c-3566755afab7',
    '37a9a747-f732-4587-a866-88d51c037641',
    '4ac3cd37-b3e1-466a-8e3b-d7d88f6f5d4f'
  ]
};
