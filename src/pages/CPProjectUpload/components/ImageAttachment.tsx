import { useState } from 'react';
import Image from '../../../components/Image';
import LightboxModal from '../../../components/LightboxModal';

type Props = {
  imageUrl: string;
};

export default function ImageAttachment({ imageUrl }: Props) {
  const [openLightbox, setOpenLightbox] = useState(false);

  const imagesLightbox = imageUrl;

  const handleOpenLightbox = (url: string) => {
    setOpenLightbox(true);
  };

  return (
    <>
      <Image
        src={imageUrl}
        onClick={() => handleOpenLightbox(imageUrl)}
        sx={{
          m: 0.5,
          width: 64,
          height: 64,
          borderRadius: 1,
          cursor: 'pointer'
        }}
      />

      <LightboxModal
        images={[imagesLightbox]}
        mainSrc={imagesLightbox}
        photoIndex={0}
        setPhotoIndex={() => {}}
        isOpen={openLightbox}
        onCloseRequest={() => setOpenLightbox(false)}
      />
    </>
  );
}
