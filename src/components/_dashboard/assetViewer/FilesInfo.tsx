import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import printerFill from '@iconify/icons-eva/printer-fill';
import archiveFill from '@iconify/icons-eva/archive-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { useTheme } from '@mui/material/styles';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import {
  Box,
  Menu,
  Card,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  CardHeader,
  TableContainer
} from '@mui/material';
// utils
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import { MIconButton } from '../../@material-extend';

function MoreMenuButton() {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <>
        <MIconButton ref={menuRef} size="large" onClick={handleOpen}>
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </MIconButton>
      </>

      <Menu
        open={open}
        anchorEl={menuRef.current}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem>
          <Icon icon={printerFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Renew
          </Typography>
        </MenuItem>
        <MenuItem>
          <Icon icon={archiveFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Add Balance
          </Typography>
        </MenuItem>

        <Divider />
        <MenuItem>
          <Icon icon={downloadFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Download
          </Typography>
        </MenuItem>
        <MenuItem>
          <Icon icon={trash2Outline} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Copy file's address
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default function FilesInfo() {
  const theme = useTheme();

  const MOCK_FILES_INFO = [
    { fileType: 'NFT Content', network: 'Crust', replicas: '12', expireOn: '20-10', prepaid: '12' },
    { fileType: 'Metadata', network: 'Crust', replicas: '12', expireOn: '20-10', prepaid: '12' },
    { fileType: 'NFT Card', network: 'Crust', replicas: '12', expireOn: '20-10', prepaid: '12' }
  ];

  return (
    <Card>
      <CardHeader title="Files Status" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 480 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>File</TableCell>
                <TableCell align="center">Network</TableCell>
                <TableCell align="center">Replicas</TableCell>
                <TableCell align="center">Expire on</TableCell>
                <TableCell align="center">Prepaid</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {MOCK_FILES_INFO.map((row) => (
                <TableRow key={row.fileType}>
                  <TableCell>{row.fileType}</TableCell>
                  <TableCell align="center">{row.network}</TableCell>
                  <TableCell align="center">{row.replicas}</TableCell>
                  <TableCell align="center">{row.expireOn}</TableCell>
                  <TableCell align="center">{row.prepaid}</TableCell>
                  <TableCell align="center">
                    <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={'success'}
                    >
                      Persistent
                    </Label>
                  </TableCell>
                  <TableCell align="right">
                    <MoreMenuButton />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
