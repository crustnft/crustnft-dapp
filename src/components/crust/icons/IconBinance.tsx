import React from 'react';
import { IconProps } from '../../../@types/icon';
import useCrustIconProps from '../../../hooks/useCrustIconProps';

const IconBinance = (props: IconProps) => {
  const { color, style } = useCrustIconProps(props, { width: 42, ratio: 1, color: '#f3ba2f' });
  return (
    <svg style={style} viewBox="0 0 126.61 126.61" xmlns="http://www.w3.org/2000/svg">
      <g fill={color}>
        <path d="m38.73 53.2 24.59-24.58 24.6 24.6 14.3-14.31-38.9-38.91-38.9 38.9z" />
        <path d="m0 63.31 14.3-14.31 14.31 14.31-14.31 14.3z" />
        <path d="m38.73 73.41 24.59 24.59 24.6-24.6 14.31 14.29-38.9 38.91-38.91-38.88z" />
        <path d="m98 63.31 14.3-14.31 14.31 14.3-14.31 14.32z" />
        <path d="m77.83 63.3-14.51-14.52-10.73 10.73-1.24 1.23-2.54 2.54 14.51 14.5 14.51-14.47z" />
      </g>
    </svg>
  );
};
export default React.memo(IconBinance);
