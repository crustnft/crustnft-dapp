import { Paper, Stack } from '@mui/material';
import ScrollBar from 'components/Scrollbar';
import { useSnackbar } from 'notistack';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { ImagesLayer as Layer } from '../../../@types/imagesGCS';
import { addImage, deleteImage, deleteLayer, updateLayer } from '../../../redux/slices/imagesGCS';
import { RootState, useDispatch } from '../../../redux/store';
import ImageCard from './ImageCard';
import ImagesAdd from './ImagesAdd';
import ImagesLayerToolBar from './ImagesLayerToolBar';
type Props = {
  layer: Layer;
  index: number;
};

export default function ImagesLayer({ layer, index }: Props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { board } = useSelector((state: RootState) => state.image);

  const { name, imageIds, id } = layer;

  const handleDeleteImage = (imageId: string) => {
    dispatch(deleteImage({ imageId, layerId: id }));
  };

  const handleUpdateLayer = async (newName: string) => {
    try {
      if (newName !== name) {
        dispatch(updateLayer(id, { ...layer, name: newName }));
        enqueueSnackbar('Update success!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteLayer = async () => {
    try {
      dispatch(deleteLayer(id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddImage = (image: any) => {
    dispatch(addImage({ image, layerId: id }));
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
          sx={{ px: 2, bgcolor: 'background.paper', width: '100%' }}
        >
          <Stack {...provided.dragHandleProps}>
            <ImagesLayerToolBar
              layerName={name}
              onDelete={handleDeleteLayer}
              onUpdate={handleUpdateLayer}
            />
            <ScrollBar>
              <Stack direction="row" spacing={2}>
                {imageIds.length !== 0 && (
                  <Droppable droppableId={id} type="task" direction="horizontal">
                    {(provided) => (
                      <Stack
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        spacing={2}
                        direction="row"
                      >
                        {imageIds.map((imageId, index) => (
                          <ImageCard
                            key={imageId}
                            onDeleteImage={handleDeleteImage}
                            image={board?.images[imageId]}
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
            </ScrollBar>
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}
