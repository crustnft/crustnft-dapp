import useCrustIconProps from 'hooks/useCrustIconProps';
import React from 'react';
import type { IconProps } from '../../../@types/icon';

const IconPlus = (props: IconProps) => {
  const { style, color } = useCrustIconProps(props, { width: 9, ratio: 9 / 10, color: '#161C24' });

  return (
    <svg style={style} viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.49996 1.66663C5.49996 1.11434 5.05224 0.666626 4.49996 0.666626C3.94767 0.666626 3.49996 1.11434 3.49996 1.66663V3.99996H1.16663C0.614341 3.99996 0.166626 4.44767 0.166626 4.99996C0.166626 5.55224 0.614341 5.99996 1.16663 5.99996H3.49996V8.33329C3.49996 8.88558 3.94767 9.33329 4.49996 9.33329C5.05224 9.33329 5.49996 8.88558 5.49996 8.33329V5.99996H7.83329C8.38558 5.99996 8.83329 5.55224 8.83329 4.99996C8.83329 4.44767 8.38558 3.99996 7.83329 3.99996H5.49996V1.66663Z"
        fill={color}
      />
    </svg>
  );
};
export default React.memo(IconPlus);
