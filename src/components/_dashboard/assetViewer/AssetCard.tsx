import { Icon } from '@iconify/react';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import heartFill from '@iconify/icons-eva/heart-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import messageSquareFill from '@iconify/icons-eva/message-square-fill';
// material
import {
  Box,
  Link,
  Card,
  Stack,
  Checkbox,
  Typography,
  CardHeader,
  IconButton,
  FormControlLabel
} from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import { MAvatar } from '../../@material-extend';
import { AssetAndOwnerType } from '../../../pages/AssetViewer';
import { shortenAddress } from 'utils/formatAddress';
import { LineScalePulseOutRapid } from 'react-pure-loaders';

// ----------------------------------------------------------------------

export default function AssetCard({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [isLiked, setLiked] = useState(true);
  const [likes, setLikes] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  };

  const handleClickComment = () => {
    commentInputRef.current?.focus();
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<MAvatar src={assetAndOwner.ownerIcon} alt="uniqueIcon" />}
        title={
          <Link to="#" variant="subtitle2" color="text.primary" component={RouterLink}>
            {shortenAddress(assetAndOwner.ownerAddress, 8)}
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {fDate(Date.now())}
          </Typography>
        }
        // action={
        //   <IconButton>
        //     <Icon icon={moreVerticalFill} width={20} height={20} />
        //   </IconButton>
        // }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Box>
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
            <Box
              component="img"
              alt="post media"
              src={assetAndOwner.imageUrl}
              onLoad={() => setLoading(false)}
              sx={{
                display: loading ? 'none' : 'block'
              }}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%', display: loading ? 'flex' : 'none', mt: 5 }}
          >
            <LineScalePulseOutRapid color={'#637381'} loading={loading} />
          </Stack>
        </Box>

        {/* <Stack direction="row" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
                checked={isLiked}
                icon={<Icon icon={heartFill} />}
                checkedIcon={<Icon icon={heartFill} />}
                onChange={isLiked ? handleUnlike : handleLike}
              />
            }
            label={fShortenNumber(likes)}
            sx={{ minWidth: 72, mr: 0 }}
          />

          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleClickComment}>
            <Icon icon={messageSquareFill} width={20} height={20} />
          </IconButton>
          <IconButton>
            <Icon icon={shareFill} width={20} height={20} />
          </IconButton>
        </Stack> */}
        <Stack>
          <Typography variant="subtitle1">{assetAndOwner.name}</Typography>
          <Typography variant="body2">{assetAndOwner.description}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
