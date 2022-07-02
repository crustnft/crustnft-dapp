import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import { useEffect } from 'react';

interface ButtonClickOnRenderProps {
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
  [key: string]: any;
}

const ButtonClickOnRender = ({
  disabled,
  loading,
  onClick: handleClick,
  ...props
}: ButtonClickOnRenderProps) => {
  useEffect(() => {
    handleClick();
  }, []);
  return (
    <LoadingButton
      variant="contained"
      disabled={disabled}
      loading={loading}
      sx={{ py: '11px', width: '50%', maxWidth: '230px' }}
      onClick={handleClick}
      {...props}
    >
      <Typography variant="buttonLarge" color="grey.0" sx={{ textTransform: 'none' }}>
        Try Again
      </Typography>
    </LoadingButton>
  );
};

export default ButtonClickOnRender;
