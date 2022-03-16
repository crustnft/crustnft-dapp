import { Box, Typography } from '@mui/material';
import * as React from 'react';

type cornerType = 'all' | 'top-right' | 'bottom-right' | 'bottom-left';

export const cornerPosition: cornerType[] = ['all', 'top-right', 'bottom-left', 'bottom-right'];

type ArgsProps = {
  text: string;
  corner: cornerType;
  props?: any;
};

const EmptyNFT = ({ text, corner, props }: ArgsProps) => (
  <svg
    viewBox="0 0 381 256"
    width="100%"
    height="100%"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {corner === 'all' ? (
      <rect
        x={3}
        y={3}
        width={375}
        height={250}
        rx={30}
        stroke="#C4C4C4"
        strokeWidth={4.166}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="0 10"
      />
    ) : (
      <></>
    )}

    {corner === 'top-right' ? (
      <path
        d="M3,3 h345 A 30 30 0 0 1 378 33 v220 h-375 z"
        stroke="#C4C4C4"
        strokeWidth={4.166}
        strokeLinecap="round"
        strokeDasharray="0 10"
      />
    ) : (
      <></>
    )}

    {corner === 'bottom-left' ? (
      <path
        d="M3,3 h375 v250 h-335 A 30 30 0 0 1 3 223 z"
        stroke="#C4C4C4"
        strokeWidth={4.166}
        strokeLinecap="round"
        strokeDasharray="0 10"
      />
    ) : (
      <></>
    )}

    {corner === 'bottom-right' ? (
      <path
        d="M3,3 h375 v220 A 30 30 0 0 1 348 253 h-345 z"
        stroke="#C4C4C4"
        strokeWidth={4.166}
        strokeLinecap="round"
        strokeDasharray="0 10"
      />
    ) : (
      <></>
    )}

    <path
      d="M189.514 48v51.874M165 73.937h49.027"
      stroke="#C4C4C4"
      strokeWidth={5.249}
      strokeLinecap="round"
    />
    <foreignObject x="65" y="120" width="250" height="80">
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="h5" sx={{ opacity: 0.3 }}>
          {text}
        </Typography>
      </Box>
    </foreignObject>
  </svg>
);

export default EmptyNFT;
