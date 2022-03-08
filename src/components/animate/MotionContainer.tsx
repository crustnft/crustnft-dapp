// material
import { motion } from 'framer-motion';
import { Box, BoxProps } from '../@c-components';
//
import { varWrapEnter } from './variants';

// ----------------------------------------------------------------------

interface MotionContainerProps extends BoxProps {
  initial?: boolean | string;
  open?: boolean;
}

export default function MotionContainer({ open, children, ...other }: MotionContainerProps) {
  return (
    <Box
      component={motion.div}
      initial={false}
      animate={open ? 'animate' : 'exit'}
      variants={varWrapEnter}
      {...other}
    >
      {children}
    </Box>
  );
}
