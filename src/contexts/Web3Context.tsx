import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { Web3Provider } from '@ethersproject/providers';
import WalletConnect from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import useWallet from 'hooks/useWallet';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import Web3Modal from 'web3modal';

type Web3ContextProps = {
  active: boolean;
  library: Web3Provider | undefined;
  account: string | undefined;
  provider: any;
  activate: () => void;
  deactivate: () => void;
  pending: boolean;
  connectedChainId: number | null;
};

export const networkParams = {
  '0x63564c40': {
    chainId: '0x63564c40',
    rpcUrls: ['https://api.harmony.one'],
    chainName: 'Harmony Mainnet',
    nativeCurrency: { name: 'ONE', decimals: 18, symbol: 'ONE' },
    blockExplorerUrls: ['https://explorer.harmony.one'],
    iconUrls: ['https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png']
  },
  '0xa4ec': {
    chainId: '0xa4ec',
    rpcUrls: ['https://forno.celo.org'],
    chainName: 'Celo Mainnet',
    nativeCurrency: { name: 'CELO', decimals: 18, symbol: 'CELO' },
    blockExplorerUrl: ['https://explorer.celo.org'],
    iconUrls: ['https://celo.org/images/marketplace-icons/icon-celo-CELO-color-f.svg']
  }
};

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK,
    options: {
      appName: 'Web 3 Modal Demo',
      infuraId: '741c5f1257a24106934fe4105c784478' // TODO: replace by JSON RPC url;
    }
  },
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: '741c5f1257a24106934fe4105c784478'
    }
  }
};

const initialContext: Web3ContextProps = {
  active: false,
  library: undefined,
  account: undefined,
  provider: undefined,

  activate: () => {},
  deactivate: () => {},
  pending: false,
  connectedChainId: null
};

export const Web3Context = createContext(initialContext);

const dappId = process.env.BLOCKNATIVE_API_KEY;
export function Web3ContextProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  const [library, setLibrary] = useState<Web3Provider | undefined>(undefined);
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [provider, setProvider] = useState<any>(undefined);
  const [pending, setPending] = useState(false);
  const [modalSelectedWallet, setModalSelectedWallet] = useState<null | string>(null);
  const [connectedChainId, setConnectedChainId] = useState<number | null>(null);
  const [error, setError] = useState<any>();
  const { chain } = useWallet();

  const web3Modal = useMemo(
    () =>
      new Web3Modal({
        cacheProvider: true, // optional
        providerOptions // required,
      }),
    []
  );

  useEffect(() => {
    if (account && provider && connectedChainId && modalSelectedWallet) {
      setActive(true);
    } else {
      setActive(false);
    }
    // FIXME: adding onSelectWallet will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, provider, connectedChainId, modalSelectedWallet]);

  const activate = useCallback(async () => {
    try {
      setPending(true);
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setConnectedChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  }, []);

  const refreshState = () => {};

  const deactivate = useCallback(() => {
    setPending(true);
    web3Modal.clearCachedProvider();
    refreshState();
    setPending(false);
    setActive(false);
    setAccount(undefined);
  }, []);

  return (
    <Web3Context.Provider
      value={{
        active,
        library,
        account,
        provider,

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
