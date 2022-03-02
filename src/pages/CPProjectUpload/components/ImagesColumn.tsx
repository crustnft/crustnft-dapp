import { Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { ImageCard as ImageCardProps, ImagesColumn as Column } from '../../../@types/imagesGCS';
import Iconify from '../../../components/Iconify';
import { addImage, deleteColumn, deleteTask, updateColumn } from '../../../redux/slices/imagesGCS';
import { RootState, useDispatch } from '../../../redux/store';
import uuidv4 from '../../../utils/uuidv4';
import ImageCard from './ImageCard';
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
              <UploadFile onAddImage={handleAddImage} onCloseAddImage={() => {}} />
            </Stack>
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}

const DropZoneStyle = styled('div')(({ theme }) => ({
  width: '100%',
  fontSize: 24,
  marginBottom: 20,
  backgroundColor: '#fafafa',
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  border: `dashed 1px ${theme.palette.divider}`,
  '&:hover': { opacity: 0.72 }
}));

type UploadFileProps = {
  onAddImage: (task: ImageCardProps) => void;
  onCloseAddImage: VoidFunction;
};

function UploadFile({ onAddImage, onCloseAddImage }: UploadFileProps) {
  const handleDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      onAddImage({
        imageUrl: URL.createObjectURL(file),
        name: file.name,
        id: uuidv4()
      });
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop
  });

  return (
    <>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 })
        }}
      >
        <input {...getInputProps()} />

        <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={2}
          alignItems="center"
          width="100%"
          sx={{ padding: 2 }}
        >
          <Iconify icon={'eva:plus-fill'} sx={{ color: 'text.secondary' }} />

          <Stack direction="column">
            <Typography variant="body2">Click to add or drag images</Typography>
            <Typography variant="caption">Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
          </Stack>
        </Stack>
      </DropZoneStyle>
    </>
  );
}
