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

interface TypographyWithSubtitleProps {
  title: string;
  subTitle: string;
  titleSize: Acceptedsize;
  subTitleSize: Acceptedsize;
  [key: string]: unknown;
}

export function TypographyWithSubtitle({
  title,
  subTitle,
  titleSize,
  subTitleSize,
  ...other
}: TypographyWithSubtitleProps) {
  return (
    <Stack direction="row" spacing={1} alignItems="baseline">
      <Typography variant={titleSize} {...other}>
        {title}
      </Typography>
      <Typography variant={subTitleSize} sx={{ opacity: 0.5 }} {...other}>
        {subTitle}
      </Typography>
    </Stack>
  );
}
