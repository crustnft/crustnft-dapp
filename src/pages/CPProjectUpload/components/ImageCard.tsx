// @mui
import { Box, Checkbox, Paper, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
// @types
import { ImageCard as ImageCardType } from '../../../@types/imagesGCS';
import Iconify from '../../../components/Iconify';
// components
import Image from '../../../components/Image';
//
import ImageDetails from './ImageDetails';

// ----------------------------------------------------------------------

type Props = {
  card: ImageCardType;
  onDeleteTask: (id: string) => void;
  index: number;
};

export default function ImageCard({ card, onDeleteTask, index }: Props) {
  const { name, attachments } = card;
  const [openDetails, setOpenDetails] = useState(false);
  const [completed, setCompleted] = useState(card.completed);

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleChangeComplete = (event: ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Paper
            sx={{
              px: 2,
              width: 1,
              position: 'relative',
              boxShadow: (theme) => theme.customShadows.z1,
              '&:hover': {
                boxShadow: (theme) => theme.customShadows.z16
              },
              ...(attachments.length > 0 && {
                pt: 2
              })
            }}
          >
            <Box onClick={handleOpenDetails} sx={{ cursor: 'pointer' }}>
              {attachments.length > 0 && (
                <Box
                  sx={{
                    pt: '60%',
                    borderRadius: 1,
                    overflow: 'hidden',
                    position: 'relative',
                    transition: (theme) =>
                      theme.transitions.create('opacity', {
                        duration: theme.transitions.duration.shortest
                      }),
                    ...(completed && {
                      opacity: 0.48
                    })
                  }}
                >
                  <Image
                    src={attachments[0]}
                    sx={{ position: 'absolute', top: 0, width: 1, height: 1 }}
                  />
                </Box>
              )}

              <Typography
                noWrap
                variant="subtitle2"
                sx={{
                  py: 3,
                  pl: 5,
                  transition: (theme) =>
                    theme.transitions.create('opacity', {
                      duration: theme.transitions.duration.shortest
                    }),
                  ...(completed && { opacity: 0.48 })
                }}
              >
                {name}
              </Typography>
            </Box>

            <Checkbox
              disableRipple
              checked={completed}
              icon={<Iconify icon={'eva:radio-button-off-outline'} />}
              checkedIcon={<Iconify icon={'eva:checkmark-circle-2-outline'} />}
              onChange={handleChangeComplete}
              sx={{ position: 'absolute', bottom: 15 }}
            />
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
