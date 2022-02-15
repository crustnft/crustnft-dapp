import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Iconify from '../../../components/Iconify';
import type { HandleNextBackButton } from '../CreateCollection.types';

export default function ConfigureSmartContract({
  handleBackButtonClick,
  handleNextButtonClick
}: HandleNextBackButton) {
  const theme = useTheme();
  return (
    <Card sx={{ p: 3 }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
            Configuration of Smart Contract
          </Typography>
          <Paper
            sx={{
              p: 3,
              mb: 2,
              width: 1,
              position: 'relative',
              border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
            }}
          >
            <Typography variant="overline" sx={{ display: 'block', color: 'text.secondary' }}>
              Settings
            </Typography>
            <TextField
              id="nameSmartContract"
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              id="tokenSymbol"
              label="Token Symbol"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Divider sx={{ my: 3 }} />
            <Typography
              variant="overline"
              sx={{ mb: 2, display: 'block', color: 'text.secondary' }}
            >
              Features
            </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Enumerable" />
              <FormControlLabel control={<Checkbox />} label="Burnable" />
            </FormGroup>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ height: '42px' }}>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button variant="outlined">Copy</Button>
              <Button variant="outlined">Download</Button>
            </Stack>
          </Box>
          <Box
            component={SyntaxHighlighter}
            language={'javascript'}
            style={androidstudio}
            padding={`${theme.spacing(2)} !important`}
            borderRadius={2}
            margin={`${theme.spacing(0)} !important`}
            bgcolor={'#21325b !important'}
          >
            {`
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable {
    constructor() ERC721("MyToken", "MTK") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
        `}
          </Box>
        </Grid>
      </Grid>

      <Box>
        <Button
          onClick={handleBackButtonClick}
          size="small"
          startIcon={<Iconify icon={'fluent:next-28-regular'} rotate={2} />}
        >
          Back
        </Button>
        <Button
          onClick={handleNextButtonClick}
          size="small"
          startIcon={<Iconify icon={'fluent:next-28-regular'} />}
        >
          Next
        </Button>
      </Box>
    </Card>
  );
}
