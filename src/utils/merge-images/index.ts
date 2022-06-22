// @ts-nocheck
// Original version : https://github.com/lukechilds/merge-images/blob/master/src/index.js

const defaultOptions = {
  format: 'image/png',
  quality: 0.92,
  width: undefined,
  height: undefined,
  Canvas: undefined,
  crossOrigin: undefined,
  useFirstImageAsBackground: false
};

const mergeImages = (sources = [], options = defaultOptions) =>
  new Promise((resolve) => {
    const canvas = options.Canvas ? new options.Canvas() : window.document.createElement('canvas');

    const ctx = canvas.getContext('2d');

    // When sources have loaded
    resolve(
      Promise.all(loadImages(sources, options)).then((images) => {
        // Set canvas dimensions
        canvas.width = getSize('width', options, images);
        canvas.height = getSize('height', options, images);

        // Draw images to canvas
        images.forEach((image) => {
          ctx.globalAlpha = image.opacity ? image.opacity : 1;
          const { width, height } = getFitSize(
            canvas.height,
            canvas.width,
            image.img.height,
            image.img.width
          );
          return ctx.drawImage(image.img, image.x || 0, image.y || 0, width, height);
        });

        if (options.Canvas && options.format === 'image/jpeg') {
          // Resolve data URI for node-canvas jpeg async
          return resolveJpegFormat(canvas, options);
        }

        // Resolve all other data URIs sync
        return canvas.toDataURL(options.format, options.quality);
      })
    );
  });

const loadImage = (source, options) =>
  new Promise((resolve, reject) => {
    const Image = options.Image || window.Image;
    // Convert sources to objects
    if (source.constructor.name !== 'Object') {
      source = { src: source };
    }

    // Resolve source and img when loaded
    const img = new Image();
    img.crossOrigin = options.crossOrigin;
    img.onerror = () => reject(new Error("Couldn't load image"));
    img.onload = () => resolve(Object.assign({}, source, { img }));
    img.src = source.src;
  });

const loadImages = (sources, options) => sources.map((source) => loadImage(source, options));

const resolveJpegFormat = (canvas, options) =>
  new Promise((resolve, reject) => {
    canvas.toDataURL(
      options.format,
      {
        quality: options.quality,
        progressive: false
      },

      (err, jpeg) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(jpeg);
      }
    );
  });

const getSize = (dimension, options, images) => {
  if (options.useFirstImageAsBackground) {
    return images[0].img[dimension];
  }
  return options[dimension] || Math.max(...images.map((image) => image.img[dimension]));
};

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

export default mergeImages;
