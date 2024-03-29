import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getContractsByAccount } from 'clients/crustnft-explore-api/contracts';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { useEffect, useState } from 'react';
import { Theme } from 'theme';
import CollectionInfo from './CollectionInfo';
import CreateContractDialog from './CreateContractDialog';

const useStyles = makeStyles({
  root: {
    height: 'calc(100% - 30px)',
    marginRight: '30px',
    aspectRatio: '1',
    '&:hover': {
      border: '2px solid'
    }
  }
});

interface AvailableCollectionsProps {
  selectedContractAddr: string;
  setSelectedContractAddr: React.Dispatch<React.SetStateAction<string>>;
  defaultContractAddr: string;
}

const AvailableCollections = ({
  selectedContractAddr,
  defaultContractAddr,
  setSelectedContractAddr
}: AvailableCollectionsProps) => {
  const theme = useTheme() as Theme;
  const { accessToken } = useAuth();
  const { account, connectedChainId } = useWeb3();
  const [collections, setCollections] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newContractCreated, setNewContractCreated] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    if (account && accessToken && newContractCreated) {
      getContractsByAccount(accessToken, 50, account.toLowerCase()).then((res) => {
        setCollections(
          res.data?.data?.filter(
            (collection: any) =>
              collection.collectionType === 'expandable' && collection.chainId === connectedChainId
          )
        );
        setNewContractCreated(false);
      });
    }
  }, [account, accessToken, connectedChainId, newContractCreated]);

  return (
    <Box
      sx={{
        mt: 1,
        width: '100%',
        aspectRatio: '4',
        overflowX: 'overlay',
        '&:hover': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.light
          }
        },
        '&::-webkit-scrollbar': {
          height: '8px'
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '8px',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: theme.palette.primary.main
          }
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'inherit'
        }
      }}
    >
      <Stack
        direction="row"
        sx={{
          height: '100%',
          flexGrow: 1,
          minWidth: 'max-content'
        }}
      >
        <Button
          variant="outlined"
          className={classes.root}
          sx={{
            minWidth: 'unset',
            backgroundColor: 'background.secondary',
            border: '2px dashed',
            borderColor: 'background.quinary'
          }}
          onClick={() => {
            setSelectedContractAddr('');
            setOpenDialog(true);
          }}
          disabled={!!defaultContractAddr}
        >
          <Stack alignItems="center">
            <Typography
              variant="subtitle1"
              color="text.tertiary"
              sx={{ textTransform: 'none' }}
              gutterBottom
            >
              New collection
            </Typography>
            <Box
              sx={{
                p: '11px 22px',
                borderRadius: '8px',
                '& span': { mr: '13px' },
                backgroundColor: 'accent.main'
              }}
            >
              <Typography variant="buttonMedium" color="grey.0">
                <span>+</span>Create
              </Typography>
            </Box>
          </Stack>
        </Button>
        <CreateContractDialog
          open={openDialog}
          onClose={() => {
            setNewContractCreated(true);
            setOpenDialog(false);
          }}
        />

        {collections.map((collection) => (
          <CollectionInfo
            key={collection.id}
            contractAddr={collection.contractAddress}
            chainId={collection.chainId}
            onClick={() => {
              setSelectedContractAddr(collection.contractAddress);
            }}
            disabled={
              defaultContractAddr ? defaultContractAddr !== collection.contractAddress : false
            }
            className={classes.root}
            sx={{
              backgroundColor:
                selectedContractAddr === collection.contractAddress
                  ? 'accent.lighter'
                  : 'background.secondary',
              border: '2px solid',
              borderColor:
                selectedContractAddr === collection.contractAddress
                  ? 'accent.main'
                  : 'background.quinary'
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default AvailableCollections;
