import { PaginationItem } from '@mui/material';
import { Theme } from '..';
import { RegularArrowLeftIcon, RegularArrowRightIcon } from '../../assets/icons/customIcons';

// ----------------------------------------------------------------------

export default function Pagination(theme: Theme) {
  return {
    MuiPagination: {
      defaultProps: {
        boundaryCount: 1,
        siblingCount: 0,
        renderItem: (item: any) => (
          <PaginationItem
            components={{ previous: RegularArrowLeftIcon, next: RegularArrowRightIcon }}
            {...item}
          />
        )
      },

      styleOverrides: {
        root: {
          '& .Mui-selected.MuiPaginationItem-page': {
            backgroundColor: theme.palette.tertiary.lighter,
            color: theme.palette.tertiary.dark,
            fontWeight: 400
          }
        }
      }
    }
  };
}
