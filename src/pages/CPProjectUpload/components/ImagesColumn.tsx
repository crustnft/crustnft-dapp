import { Paper, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { ImagesColumn as Column } from '../../../@types/imagesGCS';
import { addImage, deleteColumn, deleteTask, updateColumn } from '../../../redux/slices/imagesGCS';
import { RootState, useDispatch } from '../../../redux/store';
import ImageCard from './ImageCard';
import ImagesAdd from './ImagesAdd';
import ImagesColumnToolBar from './ImagesColumnToolBar';
type Props = {
  column: Column;
  index: number;
};

export default function ImagesColumn({ column, index }: Props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { board } = useSelector((state: RootState) => state.image);

  const { name, cardIds, id } = column;

  const handleDeleteTask = (cardId: string) => {
    dispatch(deleteTask({ cardId, columnId: id }));
  };

  const handleUpdateColumn = async (newName: string) => {
    try {
      if (newName !== name) {
        dispatch(updateColumn(id, { ...column, name: newName }));
        enqueueSnackbar('Update success!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteColumn = async () => {
    try {
      dispatch(deleteColumn(id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddImage = (task: any) => {
    dispatch(addImage({ card: task, columnId: id }));
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
          sx={{ px: 2, bgcolor: 'grey.5008' }}
        >
          <Stack spacing={3} {...provided.dragHandleProps}>
            <ImagesColumnToolBar
              columnName={name}
              onDelete={handleDeleteColumn}
              onUpdate={handleUpdateColumn}
            />

            {cardIds.length !== 0 && (
              <Droppable droppableId={id} type="task">
                {(provided) => (
                  <Stack
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    spacing={2}
                    width={280}
                  >
                    {cardIds.map((cardId, index) => (
                      <ImageCard
                        key={cardId}
                        onDeleteTask={handleDeleteTask}
                        card={board?.cards[cardId]}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </Stack>
                )}
              </Droppable>
            )}

            <Stack>
              <ImagesAdd onAddImage={handleAddImage} onCloseAddImage={() => {}} />
            </Stack>
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}