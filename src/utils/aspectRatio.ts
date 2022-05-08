export default function aspectRatio(
  ratio: number,
  width?: number | 'auto',
  height?: number | 'auto'
) {
  let h = height;
  let w = width;
  if (!width && !height) {
    w = 'auto';
    h = 'auto';
  } else if (!height || height === 'auto') {
    h = (width as number) / ratio;
  } else if (!width || width === 'auto') {
    w = (height as number) * ratio;
  }
  return { width: w, height: h };
}
