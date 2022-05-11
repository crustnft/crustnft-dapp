import { Typography } from '@mui/material';
import React from 'react';
import { pxToRem } from 'utils/getFontValue';

type Props = React.PropsWithChildren<{
  label: string;
}>;
const CrustFieldset = ({ label, children }: Props) => (
  <div>
    <Typography
      variant="h5"
      sx={{
        marginTop: pxToRem(32),
        marginBottom: pxToRem(25)
      }}
    >
      {label}
    </Typography>
    {children}
  </div>
);
export default React.memo(CrustFieldset);
