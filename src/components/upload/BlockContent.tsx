import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import { UploadIcon } from 'assets/icons/customIcons';
import { Theme } from 'theme';

export default function BlockContent() {
  const theme = useTheme() as Theme;
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column', md: 'row' }}
      sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
    >
      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography gutterBottom variant="subtitle1" color="text.tertiary">
          PNG, JPEG or GIF. Max 3GB
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: '11px 22px',
            backgroundColor: 'background.quaternary',
            borderRadius: '8px',
            boxShadow: theme.customShadows.z12
          }}
        >
          <UploadIcon fill={theme.palette.text.primary} />
          <Typography variant="buttonMedium" sx={{ color: 'text.primary', ml: '5px' }}>
            Choose file
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}
