import { Typography } from '@mui/material';
import { ReactNode } from 'react';

const Section = ({ title, children }: { title: string; children?: ReactNode }) => {
  return (
    <>
      <Typography variant="h5" color="text.primary" sx={{ mt: '40px', mb: '25px' }}>
        {title}
      </Typography>
      {children}
    </>
  );
};

export default Section;
