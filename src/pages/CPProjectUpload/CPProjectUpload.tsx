import { Container, Stack } from '@mui/material';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Page from '../../components/Page';
import { getBoard, persistCard, persistColumn } from '../../redux/slices/imagesGCS';
import { useDispatch, useSelector } from '../../redux/store';
import ImagesColumn from './components/ImagesColumn';
import ImagesColumnAdd from './components/ImagesColumnAdd';
import SkeletonImagesColumn from './components/SkeletonImagesColumn';
// ----------------------------------------------------------------------

export default function CPProjectUpload() {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.image);

  useEffect(() => {
    dispatch(getBoard());
  }, [dispatch]);

  useEffect(() => {
    console.log('board', board);
  }, [board]);

  const onDragEnd = (result: DropResult) => {
    // Reorder card
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      dispatch(persistColumn(newColumnOrder));
      return;
    }

    const start = board.columns[source.droppableId];
    const finish = board.columns[destination.droppableId];

    if (start.id === finish.id) {
      const updatedCardIds = [...start.cardIds];
      updatedCardIds.splice(source.index, 1);
      updatedCardIds.splice(destination.index, 0, draggableId);

      const updatedColumn = {
        ...start,
        cardIds: updatedCardIds
      };

      dispatch(
        persistCard({
          ...board.columns,
          [updatedColumn.id]: updatedColumn
        })
      );
      return;
    }

    const startCardIds = [...start.cardIds];
    startCardIds.splice(source.index, 1);
    const updatedStart = {
      ...start,
      cardIds: startCardIds
    };

    const finishCardIds = [...finish.cardIds];
    finishCardIds.splice(destination.index, 0, draggableId);
    const updatedFinish = {
      ...finish,
      cardIds: finishCardIds
    };

    dispatch(
      persistCard({
        ...board.columns,
        [updatedStart.id]: updatedStart,
        [updatedFinish.id]: updatedFinish
      })
    );
  };

  return (
    <Page title="Upload Images" sx={{ height: 1 }}>
      <Container maxWidth="lg" sx={{ mt: { lg: -3 } }}>
        <HeaderBreadcrumbs
          heading="Dashboard"
          links={[
            { name: 'Project Name', href: '/project-details' },
            {
              name: 'Upload Image'
            }
          ]}
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <Stack
                {...provided.droppableProps}
                ref={provided.innerRef}
                direction="row"
                alignItems="flex-start"
                spacing={3}
                sx={{ height: 'calc(100% - 32px)', overflowY: 'hidden' }}
              >
                {!board.columnOrder.length ? (
                  <SkeletonImagesColumn />
                ) : (
                  board.columnOrder.map((columnId, index) => (
                    <ImagesColumn index={index} key={columnId} column={board.columns[columnId]} />
                  ))
                )}

                {provided.placeholder}
                <ImagesColumnAdd />
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </Page>
  );
}
