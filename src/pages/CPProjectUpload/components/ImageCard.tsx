import { Box, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Image as ImageType } from '../../../@types/imagesGCS';
import Image from '../../../components/Image';
import ImageDetails from './ImageDetails';

type Props = {
  image: ImageType;
  onDeleteTask: (id: string) => void;
  index: number;
};

export default function ImageCard({ image, onDeleteTask, index }: Props) {
  const { name, imageUrl } = image;
  const [openDetails, setOpenDetails] = useState(false);

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  return (
    <Draggable draggableId={image.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Paper
            sx={{
              position: 'relative',
              boxShadow: (theme) => theme.customShadows.z1,
              '&:hover': {
                boxShadow: (theme) => theme.customShadows.z16
              }
            }}
          >
            <Box onClick={handleOpenDetails} sx={{ cursor: 'pointer' }}>
              <Box
                sx={{
                  borderRadius: 1,
                  overflow: 'hidden',
                  position: 'relative',
                  transition: (theme) =>
                    theme.transitions.create('opacity', {
                      duration: theme.transitions.duration.shortest
                    })
                }}
              >
                <Image src={imageUrl} sx={{ width: '200px', height: '200px' }} />
              </Box>

              <Typography
                noWrap
                variant="subtitle2"
                sx={{
                  py: 2,
                  maxWidth: '200px',
                  transition: (theme) =>
                    theme.transitions.create('opacity', {
                      duration: theme.transitions.duration.shortest
                    })
                }}
              >
                {name}
              </Typography>
            </Box>
          </Paper>

          <ImageDetails
            image={image}
            isOpen={openDetails}
            onClose={handleCloseDetails}
            onDeleteTask={() => onDeleteTask(image.id)}
          />
        </div>
      )}
    </Draggable>
  );
}
