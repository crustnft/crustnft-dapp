import { Box, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ImageCard as ImageCardType } from '../../../@types/imagesGCS';
import Image from '../../../components/Image';
import ImageDetails from './ImageDetails';

type Props = {
  card: ImageCardType;
  onDeleteTask: (id: string) => void;
  index: number;
};

export default function ImageCard({ card, onDeleteTask, index }: Props) {
  const { name, imageUrl } = card;
  const [openDetails, setOpenDetails] = useState(false);

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
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
            card={card}
            isOpen={openDetails}
            onClose={handleCloseDetails}
            onDeleteTask={() => onDeleteTask(card.id)}
          />
        </div>
      )}
    </Draggable>
  );
}
