import { Web3Provider } from '@ethersproject/providers';
import Onboard from 'bnc-onboard';
import { API, Wallet } from 'bnc-onboard/dist/src/interfaces';
import useWallet from 'hooks/useWallet';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

type Web3ContextProps = {
  active: boolean;
  library: Web3Provider | undefined;
  account: string | undefined;
  provider: API | undefined;
  onboard: API | undefined;
  activate: () => void;
  deactivate: () => void;
  pending: boolean;
  connectedChainId: number | null;
};

const initialContext: Web3ContextProps = {
  active: false,
  library: undefined,
  account: undefined,
  provider: undefined,
  onboard: undefined,
  activate: () => {},
  deactivate: () => {},
  pending: false,
  connectedChainId: null
};

export const Web3Context = createContext(initialContext);

const wallets = [
  { walletName: 'metamask' },
  {
    walletName: 'walletConnect',
    infuraKey: '741c5f1257a24106934fe4105c784478'
  },
  {
    walletName: 'ledger',
    infuraKey: '741c5f1257a24106934fe4105c784478'
  }
  // { walletName: 'coinbase' },
  // { walletName: 'status' },
  // {
  //   walletName: 'lattice',
  //   appName: 'Yearn Finance',
  //   rpcUrl
  // },
  // { walletName: 'walletLink', rpcUrl },
  // { walletName: 'torus' },
  // { walletName: 'authereum', disableNotifications: true },
  // { walletName: 'trust', rpcUrl },
  // { walletName: 'opera' },
  // { walletName: 'operaTouch' },
  // { walletName: 'imToken', rpcUrl },
  // { walletName: 'meetone' }
];

const dappId = process.env.BLOCKNATIVE_API_KEY;

export function Web3ContextProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  const [library, setLibrary] = useState<Web3Provider | undefined>(undefined);
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [provider, setProvider] = useState<API | undefined>(undefined);
  const [pending, setPending] = useState(false);
  const [modalSelectedWallet, setModalSelectedWallet] = useState<null | string>(null);
  const [connectedChainId, setConnectedChainId] = useState<number | null>(null);
  const {
    chain,
    selectedWallet: previousSelectedWallet,
    onSelectWallet,
    onDisconnectWallet
  } = useWallet();

  useEffect(() => {
    if (account && provider && connectedChainId && modalSelectedWallet) {
      setActive(true);
      onSelectWallet(modalSelectedWallet);
    } else {
      setActive(false);
    }
    // FIXME: adding onSelectWallet will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, provider, connectedChainId, modalSelectedWallet]);

  const onboard = useMemo(
    () =>
      Onboard({
        dappId,
        hideBranding: true,
        networkId: chain?.chainId || 1,
        walletSelect: {
          wallets: [
            { walletName: 'metamask' },
            {
              walletName: 'walletConnect',
              infuraKey: '741c5f1257a24106934fe4105c784478'
            }
          ]
        },
        subscriptions: {
          wallet: (wallet: Wallet) => {
            if (wallet.provider) {
              setProvider(wallet.provider);
              setLibrary(new Web3Provider(wallet.provider, 'any'));
              setModalSelectedWallet(wallet.name);
            } else {
              setProvider(undefined);
              setLibrary(undefined);
            }
          },
          address: (address) => {
            setAccount(address);
          },
          network: (network) => {
            setConnectedChainId(network);
          }
        }
      }),
    [chain, setProvider, setLibrary, setAccount]
  );

  const activate = useCallback(() => {
    setPending(true);

    onboard
      .walletSelect(previousSelectedWallet)
      .catch(console.error)
      .then((res) => {
        if (res) {
          return onboard.walletCheck();
        }
      })
      .then(() => {
        setPending(false);
      });
  }, [previousSelectedWallet, onboard]);

  const deactivate = useCallback(() => {
    setPending(true);
    onboard.walletReset();
    onDisconnectWallet();
    setModalSelectedWallet(null);
    onSelectWallet('');
    setPending(false);
    setActive(false);
    setAccount(undefined);
  }, [onboard, onDisconnectWallet, onSelectWallet]);

  return (
    <Web3Context.Provider
      value={{
        active,
        library,
        account,
        provider,
        onboard,
        activate,
        deactivate,
        pending,
        connectedChainId
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
