import { Button, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { ImageCard as ImageCardProps, ImagesColumn as Column } from '../../../@types/imagesGCS';
import Iconify from '../../../components/Iconify';
import { addTask, deleteColumn, deleteTask, updateColumn } from '../../../redux/slices/imagesGCS';
import { RootState, useDispatch } from '../../../redux/store';
import uuidv4 from '../../../utils/uuidv4';
import ImageAdd from './ImageAdd';
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

  const [open, setOpen] = useState(false);

  const { name, cardIds, id } = column;

  const handleOpenAddTask = () => {
    setOpen((prev) => !prev);
  };

  const handleCloseAddTask = () => {
    setOpen(false);
  };

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

  const handleAddTask = (task: any) => {
    dispatch(addTask({ card: task, columnId: id }));
    handleCloseAddTask();
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

            <Droppable droppableId={id} type="task">
              {(provided) => (
                <Stack ref={provided.innerRef} {...provided.droppableProps} spacing={2} width={280}>
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

            <Stack spacing={2} sx={{ pb: 3 }}>
              {open && <ImageAdd onAddTask={handleAddTask} onCloseAddTask={handleCloseAddTask} />}

              <Button
                fullWidth
                size="large"
                color="inherit"
                startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
                onClick={handleOpenAddTask}
                sx={{ fontSize: 14 }}
              >
                Add Images
              </Button>
            </Stack>
            <Stack>
              <UploadFile onAddTask={handleAddTask} onCloseAddTask={handleCloseAddTask} />
            </Stack>
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}

const DropZoneStyle = styled('div')(({ theme }) => ({
  width: 64,
  height: 64,
  fontSize: 24,
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  border: `dashed 1px ${theme.palette.divider}`,
  '&:hover': { opacity: 0.72 }
}));

type UploadFileProps = {
  onAddTask: (task: ImageCardProps) => void;
  onCloseAddTask: VoidFunction;
};

function UploadFile({ onAddTask, onCloseAddTask }: UploadFileProps) {
  const handleDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      onAddTask({
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

        <Iconify icon={'eva:plus-fill'} sx={{ color: 'text.secondary' }} />
      </DropZoneStyle>
    </>
  );
}
