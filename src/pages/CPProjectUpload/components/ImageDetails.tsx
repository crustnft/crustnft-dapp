import { Divider, Drawer, OutlinedInput, Stack, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { Image } from '../../../@types/imagesGCS';
import { IconButtonAnimate } from '../../../components/animate';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import useResponsive from '../../../hooks/useResponsive';
import { updatePartialImage } from '../../../redux/slices/imagesGCS';
import { useDispatch } from '../../../redux/store';
import ImageAttachment from './ImageAttachment';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  width: 140,
  fontSize: 13,
  flexShrink: 0,
  color: theme.palette.text.secondary
}));

// ----------------------------------------------------------------------

type Props = {
  image: Image;
  isOpen: boolean;
  onClose: VoidFunction;
  onDeleteTask: VoidFunction;
};

export default function ImageDetails({ image, isOpen, onClose, onDeleteTask }: Props) {
  const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'sm');

  const nameInputRef = useRef<HTMLInputElement>(null);

  const { name, imageUrl, id } = image;
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
    dispatch(updatePartialImage({ card: { id, name: localName } }));
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

          <Stack direction="row" spacing={1} justifyContent="flex-end" flexGrow={1}>
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
              size="small"
              placeholder="Image Name"
              inputRef={nameInputRef}
              onChange={handleChangeName}
              onKeyUp={handleKeyUpNameInput}
              onBlur={handleUpdateName}
              value={localName}
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
                <ImageAttachment imageUrl={imageUrl} />
              </Stack>
            </Stack>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
