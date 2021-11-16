// material
import { Button, Typography, TextField, Stack } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

export default function FaqsForm() {
  return (
    <Stack spacing={3} sx={{ maxWidth: 600, m: 'auto' }}>
      <MotionInView variants={varFadeInUp}>
        <Typography variant="h4" sx={{ textAlign: 'center', my: 5 }}>
          Haven't found the right help?
        </Typography>
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <TextField fullWidth label="Name" />
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <TextField fullWidth label="Email" />
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <TextField fullWidth label="Subject" />
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <TextField fullWidth label="Enter your message here." multiline rows={4} />
      </MotionInView>

      <MotionInView variants={varFadeInUp} sx={{ textAlign: 'center', m: 'auto' }}>
        <Button size="large" variant="contained">
          Submit Now
        </Button>
      </MotionInView>
    </Stack>
  );
}
