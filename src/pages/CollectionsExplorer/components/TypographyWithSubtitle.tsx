import { Stack, Typography } from '@mui/material';

type Acceptedsize =
  | 'button'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'inherit'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | undefined;

export type TitleWithSubtitle = {
  title: String;
  subTitle: String;
  titleSize: Acceptedsize;
  subTitleSize: Acceptedsize;
};

type TitleWithSubtitleProps = {
  titleInput: TitleWithSubtitle;
};

export function TypographyWithSubtitle({ titleInput }: TitleWithSubtitleProps) {
  const { title, subTitle, titleSize, subTitleSize } = titleInput;
  // const titleHeight =
  return (
    <Stack direction="row" spacing={1} sx={{ opacity: 0.5 }} alignItems="baseline">
      <Typography variant={titleSize}>{title}</Typography>
      <Typography variant={subTitleSize}>({subTitle})</Typography>
    </Stack>
  );
}
