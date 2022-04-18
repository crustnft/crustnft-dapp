import { Box, Input, Paper } from '@mui/material';
import { UPLOAD_IMAGE_PUBLIC_BUCKET } from 'constants/gcpApis';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Image as ImageType } from '../../../@types/imagesGCS';
import Image from '../../../components/Image';
import useWeb3 from '../../../hooks/useWeb3';
import { updatePartialImage } from '../../../redux/slices/imagesGCS';
import { useDispatch } from '../../../redux/store';
import ImageDetails from './ImageDetails';

type Props = {
  image: ImageType;
  onDeleteImage: (id: string) => void;
  index: number;
};

export default function ImageCard({ image, onDeleteImage, index }: Props) {
  const dispatch = useDispatch();
  const { account } = useWeb3();
  const { name, id } = image;

  const imageUrl = UPLOAD_IMAGE_PUBLIC_BUCKET + '/' + account?.toLowerCase() + '/' + id;
  const [openDetails, setOpenDetails] = useState(false);

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const nameInputRef = useRef<HTMLInputElement>(null);
  const [localName, setLocalName] = useState(name);
  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalName(event.target.value);
  };

  const handleKeyUpNameInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && nameInputRef.current) {
      nameInputRef.current.blur();
    }
  };

  const handleUpdateName = () => {
    dispatch(updatePartialImage({ image: { id, name: localName } }));
  };

  return (
    <Draggable draggableId={image.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Paper
            sx={{
              position: 'relative',
              '&:hover': {
                boxShadow: (theme) => theme.customShadows.z16
              }
            }}
          >
            <Box>
              <Box
                sx={{
                  borderRadius: 1,
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: (theme) =>
                    theme.transitions.create('opacity', {
                      duration: theme.transitions.duration.shortest
                    })
                }}
                onClick={handleOpenDetails}
              >
                <Image src={imageUrl} sx={{ width: '200px', height: '200px' }} />
              </Box>
              <Input
                size="small"
                sx={{
                  px: 1,
                  typography: 'subtitle2'
                }}
                disableUnderline
                inputRef={nameInputRef}
                onChange={handleChangeName}
                onKeyUp={handleKeyUpNameInput}
                onBlur={handleUpdateName}
                value={localName}
              />
            </Box>
          </Paper>

          <ImageDetails
            image={image}
            isOpen={openDetails}
            onClose={handleCloseDetails}
            onDeleteImage={() => onDeleteImage(image.id)}
          />
        </div>
      )}
    </Draggable>
  );
}
