import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Image from '../../../components/Image';
import LightboxModal from '../../../components/LightboxModal';

const DropZoneStyle = styled('div')(({ theme }) => ({
  width: 64,
  height: 64,
  fontSize: 24,
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  border: `dashed 1px ${theme.palette.divider}`,
  '&:hover': { opacity: 0.72 }
}));

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
