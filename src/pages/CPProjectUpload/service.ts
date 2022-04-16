export async function getImageDimension(imageUrl: string): Promise<{
  width: number;
  height: number;
}> {
  return new Promise((resolve, reason) => {
    let img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
  });
}
