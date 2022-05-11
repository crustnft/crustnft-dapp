import React from 'react';
import { IconProps } from '../../../@types/icon';
import useCrustIconProps from '../../../hooks/useCrustIconProps';
const IconHelpCircle = (props: IconProps) => {
  const { style, color } = useCrustIconProps(props, { width: 16, ratio: 1, color: '#919EAB' });

  return (
    <svg style={style} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99992 13.3334C10.9454 13.3334 13.3333 10.9456 13.3333 8.00004C13.3333 5.05452 10.9454 2.66671 7.99992 2.66671C5.0544 2.66671 2.66659 5.05452 2.66659 8.00004C2.66659 10.9456 5.0544 13.3334 7.99992 13.3334ZM7.99992 14.6667C11.6818 14.6667 14.6666 11.6819 14.6666 8.00004C14.6666 4.31814 11.6818 1.33337 7.99992 1.33337C4.31802 1.33337 1.33325 4.31814 1.33325 8.00004C1.33325 11.6819 4.31802 14.6667 7.99992 14.6667Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.42231 6.33378C7.23795 6.65248 6.83013 6.76139 6.51143 6.57703C6.19272 6.39267 6.08381 5.98485 6.26817 5.66614C6.61298 5.07008 7.25908 4.66663 8.0002 4.66663C9.10477 4.66663 10.0002 5.56206 10.0002 6.66663C10.0002 7.39844 9.55128 7.99595 9.0002 8.33329C8.55754 8.60427 8.83353 9.33329 7.99845 9.33329C7.63026 9.33329 7.33179 9.03482 7.33179 8.66663C7.33179 8.64322 7.33299 8.62009 7.33535 8.59731C7.35384 8.24473 7.51105 7.95785 7.68223 7.74925C7.86301 7.52894 8.10069 7.3491 8.28243 7.24106C9.29358 6.63996 8.06032 5.41022 7.42231 6.33378ZM7.99845 9.99996C7.63026 9.99996 7.33179 10.2984 7.33179 10.6666C7.33179 11.0348 7.63026 11.3333 7.99845 11.3333C8.36664 11.3333 8.66512 11.0348 8.66512 10.6666C8.66512 10.2984 8.36664 9.99996 7.99845 9.99996Z"
        fill={color}
      />
    </svg>
  );
};
export default React.memo(IconHelpCircle);
