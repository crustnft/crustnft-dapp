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

export function TypographyWithSubtitle({
  title,
  subTitle,
  titleSize,
  subTitleSize
}: {
  title: String;
  subTitle: String;
  titleSize: Acceptedsize;
  subTitleSize: Acceptedsize;
}) {
  return (
    <Stack direction="row" spacing={1} alignItems="baseline">
      <Typography variant={titleSize}>{title}</Typography>
      <Typography variant={subTitleSize} sx={{ opacity: 0.5 }}>
        {subTitle}
      </Typography>
    </Stack>
  );
}
