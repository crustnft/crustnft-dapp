import { Container, Stack } from '@mui/material';
import { getCollectionInfo } from 'clients/crustnft-explore-api/nft-collections';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import { getBoard, persistCard, persistLayer } from '../../redux/slices/imagesGCS';
import { useDispatch, useSelector } from '../../redux/store';
import ImagesLayer from './components/ImagesLayer';
import ImagesLayerAdd from './components/ImagesLayerAdd';

export default function CPProjectUpload() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.image);
  const { accessToken, isAuthenticated } = useAuth();
  const { signInWallet } = useWeb3();
  const [collectionInfo, setCollectionInfo] = useState<any>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken && id) {
      dispatch(getBoard(accessToken, id));
    }
  }, [dispatch, accessToken, id]);

  useEffect(() => {
    console.log('board', board);
  }, [board]);

  useEffect(() => {
    if (!isAuthenticated) {
      signInWallet();
    }
  }, [signInWallet]);

  useEffect(() => {
    const getCollection = async () => {
      if (!id) return;
      const _collectionInfo = await getCollectionInfo(accessToken, id);

      if (!_collectionInfo) {
        setError(true);
        return;
      }

      setCollectionInfo(_collectionInfo);
    };

    getCollection();
  }, [id]);

  const onDragEnd = (result: DropResult) => {
    // Reorder card
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      const newLayerOrder = Array.from(board.layerOrder);
      newLayerOrder.splice(source.index, 1);
      newLayerOrder.splice(destination.index, 0, draggableId);

      console.log('newLayerOrder', newLayerOrder);

      dispatch(persistLayer(newLayerOrder));
      return;
    }

    const start = board.layers[source.droppableId];
    const finish = board.layers[destination.droppableId];

    if (start.id === finish.id) {
      const updatedImageIds = [...start.imageIds];
      updatedImageIds.splice(source.index, 1);
      updatedImageIds.splice(destination.index, 0, draggableId);

      const updatedLayer = {
        ...start,
        imageIds: updatedImageIds
      };

      dispatch(
        persistCard({
          ...board.layers,
          [updatedLayer.id]: updatedLayer
        })
      );
      return;
    }

    const startImageIds = [...start.imageIds];
    startImageIds.splice(source.index, 1);
    const updatedStart = {
      ...start,
      imageIds: startImageIds
    };

    const finishImageIds = [...finish.imageIds];
    finishImageIds.splice(destination.index, 0, draggableId);
    const updatedFinish = {
      ...finish,
      imageIds: finishImageIds
    };

    dispatch(
      persistCard({
        ...board.layers,
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
            { name: collectionInfo?.name, href: `/project-details/${id}` },
            {
              name: 'Upload Image'
            }
          ]}
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="vertical" type="column">
            {(provided) => (
              <Stack
                {...provided.droppableProps}
                ref={provided.innerRef}
                direction="column"
                alignItems="flex-start"
                spacing={3}
                sx={{ height: 'calc(100% - 32px)', overflowY: 'hidden' }}
              >
                {board.layerOrder.map((layerId, index) => (
                  <ImagesLayer index={index} key={layerId} layer={board.layers[layerId]} />
                ))}

                {provided.placeholder}
                <ImagesLayerAdd />
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </Page>
  );
}
