import Jimp from 'jimp';

export function getFitSize(
  preferHeight: number,
  preferWidth: number,
  height: number,
  width: number
) {
  let scaleRatio = preferWidth / width;

  let newHeight = Math.ceil(height * scaleRatio);
  let newWidth = Math.ceil(width * scaleRatio);

  if (newHeight - preferHeight > 1) {
    scaleRatio = preferHeight / height;

    newHeight = Math.ceil(height * scaleRatio);
    newWidth = Math.ceil(width * scaleRatio);
  }
  return {
    height: newHeight > preferHeight ? preferHeight : newHeight,
    width: newWidth > preferWidth ? preferWidth : newWidth
  };
}

async function resizeImage(preferHeight: number, preferWidth: number, image: any) {
  const { width, height } = image.bitmap;
  const fitSize = getFitSize(preferHeight, preferWidth, height, width);
  image.resize(fitSize.width, fitSize.height);
  return image;
}

export async function normalizeAndMergeImages(layers: string[]) {
  const backgroundImage = layers[0];
  layers.shift();

  const backgroundJimp = await Jimp.read(backgroundImage);
  const { height, width } = backgroundJimp.bitmap;

  for (let i = 0; i < layers.length; i++) {
    const imageJimp = await Jimp.read(layers[i]);
    resizeImage(height, width, imageJimp);
    backgroundJimp.composite(imageJimp, 0, 0);
  }
  // eslint-disable-next-line @typescript-eslint/return-await
  return await backgroundJimp.getBase64Async(Jimp.MIME_PNG);
}
