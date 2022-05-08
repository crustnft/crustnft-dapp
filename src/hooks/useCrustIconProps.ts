import { useMemo } from 'react';
import aspectRatio from 'utils/aspectRatio';
import { IconProps } from '../@types/icon';

export default function useCrustIconProps(
  props: IconProps,
  defaultProps: Partial<IconProps> = {}
): IconProps {
  const p = { ...defaultProps, ...props };
  const { width, height } = p.ratio ? aspectRatio(p.ratio, p.width, p.height) : p;
  const style = useMemo(() => ({ ...(p.style || {}), width, height }), [p.style, width, height]);
  return {
    ...p,
    width,
    height,
    style
  };
}
