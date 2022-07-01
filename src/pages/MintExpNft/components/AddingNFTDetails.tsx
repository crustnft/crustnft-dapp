import { Box, Button, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { QuestionIcon } from 'assets/icons/customIcons';
import { useState } from 'react';
import { Theme } from 'theme';

interface DialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AddingNFTDetailsProps {
  title: string;
  description: string;
  Dialog: ({ openDialog, setOpenDialog }: DialogProps) => JSX.Element;
  items: any;
  ItemRenderer: any;
}

const AddingNFTDetails = ({
  title,
  description,
  Dialog,
  items,
  ItemRenderer
}: AddingNFTDetailsProps) => {
  const theme = useTheme() as Theme;
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <Stack sx={{ mb: '20px' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle1">{title}</Typography>
            <Tooltip title={description} placement="top" arrow={true}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <QuestionIcon />
              </Box>
            </Tooltip>
          </Stack>

          <Button
            sx={{
              width: '50%',
              maxWidth: '200px',
              border: '2px solid',
              borderColor: theme.palette.textField.borderColor,
              py: '11px',

              '&:hover': {
                border: '2px solid',
                borderColor: theme.palette.primary.main
              }
            }}
            onClick={() => {
              setOpenDialog(true);
            }}
            variant="outlined"
          >
            <Typography
              variant="buttonMedium"
              color="text.primary"
              sx={{
                textTransform: 'none',
                '& >span': {
                  mr: '10px'
                }
              }}
            >
              <span>+</span> Add {title}
            </Typography>
          </Button>
        </Stack>

        <Stack sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            {items.map((item: any, index: number) => (
              <Grid key={index} item xs={6} sm={4} md={3}>
                <ItemRenderer {...item} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>

      <Dialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
};

export default AddingNFTDetails;
