// @mui
import { Button, Divider, Drawer, OutlinedInput, Stack, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChangeEvent, useRef, useState } from 'react';
// /@types
import { ImageCard } from '../../../@types/imagesGCS';
import { IconButtonAnimate } from '../../../components/animate';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
// hooks
import useResponsive from '../../../hooks/useResponsive';
import { useDatePicker } from './ImageAdd';
import ImageAttachments from './ImageAttachments';

// ----------------------------------------------------------------------

const PRIORITIZES = ['low', 'medium', 'hight'];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  width: 140,
  fontSize: 13,
  flexShrink: 0,
  color: theme.palette.text.secondary
}));

// ----------------------------------------------------------------------

type Props = {
  card: ImageCard;
  isOpen: boolean;
  onClose: VoidFunction;
  onDeleteTask: VoidFunction;
};

export default function ImageDetails({ card, isOpen, onClose, onDeleteTask }: Props) {
  const isDesktop = useResponsive('up', 'sm');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [taskCompleted, setTaskCompleted] = useState(card.completed);

  const [prioritize, setPrioritize] = useState('low');

  const { name, description, due, assignee, attachments, comments } = card;

  const {
    dueDate,
    startTime,
    endTime,
    isSameDays,
    isSameMonths,
    onChangeDueDate,
    openPicker,
    onOpenPicker,
    onClosePicker
  } = useDatePicker({
    date: due
  });

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const handleToggleCompleted = () => {
    setTaskCompleted((prev) => !prev);
  };

  const handleChangePrioritize = (event: ChangeEvent<HTMLInputElement>) => {
    setPrioritize(event.target.value);
  };

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={onClose}
        anchor="right"
        PaperProps={{ sx: { width: { xs: 1, sm: 480 } } }}
      >
        <Stack p={2.5} direction="row" alignItems="center">
          {!isDesktop && (
            <>
              <Tooltip title="Back">
                <IconButtonAnimate onClick={onClose} sx={{ mr: 1 }}>
                  <Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />
                </IconButtonAnimate>
              </Tooltip>
            </>
          )}

          <Button
            size="small"
            variant="outlined"
            color={taskCompleted ? 'primary' : 'inherit'}
            startIcon={
              taskCompleted && <Iconify icon={'eva:checkmark-fill'} width={16} height={16} />
            }
            onClick={handleToggleCompleted}
          >
            {taskCompleted ? 'Complete' : 'Mark as complete'}
          </Button>

          <Stack direction="row" spacing={1} justifyContent="flex-end" flexGrow={1}>
            <Tooltip title="Like this">
              <IconButtonAnimate size="small">
                <Iconify icon={'ic:round-thumb-up'} width={20} height={20} />
              </IconButtonAnimate>
            </Tooltip>

            <>
              <Tooltip title="Attachment">
                <IconButtonAnimate size="small" onClick={handleAttach}>
                  <Iconify icon={'eva:attach-2-fill'} width={20} height={20} />
                </IconButtonAnimate>
              </Tooltip>
              <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
            </>

            <Tooltip title="Delete task">
              <IconButtonAnimate onClick={onDeleteTask} size="small">
                <Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
              </IconButtonAnimate>
            </Tooltip>

            <Tooltip title="More actions">
              <IconButtonAnimate size="small">
                <Iconify icon={'eva:more-horizontal-fill'} width={20} height={20} />
              </IconButtonAnimate>
            </Tooltip>
          </Stack>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ px: 2.5, py: 3 }}>
            <OutlinedInput
              fullWidth
              multiline
              size="small"
              placeholder="Image Name"
              value={name}
              sx={{
                typography: 'h6',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }
              }}
            />
            <Stack direction="row" alignItems="center">
              <LabelStyle>Trait Name</LabelStyle>
              <Stack direction="row" flexWrap="wrap" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Black
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center">
              <LabelStyle>Rarity</LabelStyle>
              <Stack direction="row" flexWrap="wrap" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  10%
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center">
              <LabelStyle>File name</LabelStyle>
              <Stack direction="row" flexWrap="wrap" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  hihihi.jpg
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center">
              <LabelStyle>Image dimension</LabelStyle>
              <Stack direction="row" flexWrap="wrap" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  200px x 200px
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center">
              <LabelStyle>File size</LabelStyle>
              <Stack direction="row" flexWrap="wrap" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  1MB
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row">
              <LabelStyle sx={{ mt: 2 }}>Image Preview</LabelStyle>
              <Stack direction="row" flexWrap="wrap">
                <ImageAttachments attachments={attachments} />
              </Stack>
            </Stack>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
