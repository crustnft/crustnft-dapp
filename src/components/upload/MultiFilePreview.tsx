import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { fData } from '../../utils/formatNumber';
import getFileData from '../../utils/getFileData';
import { varFade } from '../animate/version310';
import Iconify from '../Iconify';
import { UploadMultiFileProps } from './type';

export default function MultiFilePreview({ file, onRemove }: UploadMultiFileProps) {
  if (file === null) return <></>;

  const { name, size } = getFileData(file);
  return (
    <List disablePadding sx={{ my: 3 }}>
      <AnimatePresence>
        <ListItem
          component={motion.div}
          {...varFade().inRight}
          sx={{
            my: 1,
            px: 2,
            py: 0.75,
            borderRadius: 0.75,
            border: (theme) => `solid 1px ${theme.palette.divider}`
          }}
        >
          <Iconify
            icon={'eva:file-fill'}
            sx={{ width: 28, height: 28, color: 'text.secondary', mr: 2 }}
          />

          <ListItemText
            primary={typeof file === 'string' ? file : name}
            secondary={typeof file === 'string' ? '' : fData(size || 0)}
            primaryTypographyProps={{ variant: 'subtitle2' }}
            secondaryTypographyProps={{ variant: 'caption' }}
          />

          {onRemove && (
            <IconButton edge="end" size="small" onClick={() => onRemove(file)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButton>
          )}
        </ListItem>
      </AnimatePresence>
    </List>
  );
}
