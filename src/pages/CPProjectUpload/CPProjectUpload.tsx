import { Button, Container, Stack } from '@mui/material';
import {
  getCollectionInfo,
  updateCPCollection
} from 'clients/crustnft-explore-api/nft-collections';
import { NftCollectionDto, UpdateNftCollectionDto } from 'clients/crustnft-explore-api/types';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import { getBoard, persistImage, persistLayer } from '../../redux/slices/imagesGCS';
import { useDispatch, useSelector } from '../../redux/store';
import ImagesLayer from './components/ImagesLayer';
import ImagesLayerAdd from './components/ImagesLayerAdd';
import PreviewDialog from './components/PreviewDialog';
import ToggleButton from './components/ToggleButton';

export default function CPProjectUpload() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { board, isFirstLoaded } = useSelector((state) => state.image);
  const { accessToken, isAuthenticated } = useAuth();
  const { signInWallet } = useWeb3();
  const [collectionInfo, setCollectionInfo] = useState<NftCollectionDto | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [collectionStatus, setCollectionStatus] = useState<string>('pending');
  const [collectionProcessed, setCollectionProcessed] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken && id) {
      dispatch(getBoard(accessToken, id));
    }
  }, [dispatch, accessToken, id]);

  // FIXME: workaround for the first load
  useEffect(() => {
    if (!isEmpty(board.layers) && !isEmpty(board.layerOrder) && collectionInfo) {
      const { id, name, description } = collectionInfo;
      const updateDto = {
        id,
        name,
        description
      };
      updateCPCollection(
        {
          ...updateDto,
          layerOrder: board.layerOrder,
          images: Object.values(board.images),
          layers: Object.values(board.layers)
        } as UpdateNftCollectionDto,
        accessToken
      );
    }
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

      setCollectionStatus(_collectionInfo.status);
      setCollectionProcessed(_collectionInfo.status !== 'pending');
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
        persistImage({
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
      persistImage({
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
          headingLink="#/tenK-collection"
          links={[
            {
              name: collectionInfo?.name || 'Back to collection details',
              href: `/collection-details/${id}`
            },
            {
              name: 'Upload Image'
            }
          ]}
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="vertical"
            type="column"
            isDropDisabled={collectionProcessed}
          >
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
                  <ImagesLayer
                    index={index}
                    key={layerId}
                    layer={board.layers[layerId]}
                    collectionProcessed={collectionProcessed}
                  />
                ))}

                {provided.placeholder}
                {!collectionProcessed && <ImagesLayerAdd />}
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
        <Button
          variant="contained"
          color="info"
          sx={{ mt: 5 }}
          onClick={() => {
            setOpen(true);
          }}
        >
          Review and generate
        </Button>
        <ToggleButton open={open} setOpen={setOpen} />
        <PreviewDialog
          open={open}
          setOpen={setOpen}
          name={collectionInfo?.name || ''}
          status={collectionInfo?.status || ''}
          collectionCid={collectionInfo?.collectionCID || ''}
          metadataCid={collectionInfo?.metadataCID || ''}
        />
      </Container>
    </Page>
  );
}
