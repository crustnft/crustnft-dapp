import { Box, Link, Typography } from '@mui/material';
import isString from 'lodash/isString';
import { ReactNode } from 'react';
//
import Breadcrumbs, { Props as BreadcrumbsProps } from './Breadcrumbs';

interface Props extends BreadcrumbsProps {
  action?: ReactNode;
  heading: string;
  moreLink?: string | string[];
  headingLink?: string;
}

export default function HeaderBreadcrumbs({
  links,
  action,
  heading,
  headingLink,
  moreLink = '' || [],
  sx,
  ...other
}: Props) {
  return (
    <Box sx={{ ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Link href={headingLink} underline="none">
            <Typography variant="h4" gutterBottom>
              {heading}
            </Typography>
          </Link>

          <Breadcrumbs links={links} {...other} />
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>

      <Box sx={{ mt: 2 }}>
        {isString(moreLink) ? (
          <Link href={moreLink} target="_blank" rel="noopener" variant="body2" underline="none">
            {moreLink}
          </Link>
        ) : (
          moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: 'table' }}
              underline="none"
            >
              {href}
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
}
