import React from 'react';
import { IconProps } from '../../../@types/icon';
import useCrustIconProps from '../../../hooks/useCrustIconProps';
const IconEditFilled = (props: IconProps) => {
  const { style, color } = useCrustIconProps(props, { width: 16, ratio: 1, color: '#161C24' });
  return (
    <svg style={style} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="14" width="12" height="1.33333" rx="0.666667" fill="#161C24" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.72384 7.66663L2.39052 7.99994C2.14048 8.24999 2 8.58913 2 8.94275V11.3333C2 12.0697 2.59695 12.6666 3.33333 12.6666H5.72386C6.07748 12.6666 6.41662 12.5261 6.66667 12.2761L6.99998 11.9428L2.72384 7.66663Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.66675 6.72382L7.72394 2.66663L12.0001 6.94277L7.94289 11L3.66675 6.72382Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.081 1.13803C11.2999 0.356984 10.0336 0.356984 9.25255 1.13803L8.66675 1.72384L12.9429 5.99998L13.5287 5.41417C14.3097 4.63313 14.3097 3.3668 13.5287 2.58575L12.081 1.13803Z"
        fill={color}
      />
    </svg>
  );
};
export default React.memo(IconEditFilled);
