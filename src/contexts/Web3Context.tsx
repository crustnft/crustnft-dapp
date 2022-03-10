import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { Web3Provider } from '@ethersproject/providers';
import WalletConnect from '@walletconnect/web3-provider';
import { ethers, utils } from 'ethers';
import useWallet from 'hooks/useWallet';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import Web3Modal, { getInjectedProvider, getProviderInfo } from 'web3modal';

interface IProviderInfo {
  id: string;
  type: string;
  check: string;
  name: string;
  logo: string;
  description?: string;
  package?: {
    required?: string[];
  };
}

type Web3ContextProps = {
  active: boolean;
  library: Web3Provider | undefined;
  account: string | undefined;
  provider: any;
  activate: () => void;
  deactivate: () => void;
  pending: boolean;
  connectedChainId: number | null;
  connectWalletConnect: () => void;
  balance: number;
  providerInfo: IProviderInfo | undefined;
};

export const truncateAddress = (address: string) => {
  if (!address) return 'No Account';
  const match = address.match(/^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const toHex = (num: number) => {
  const val = Number(num);
  return '0x' + val.toString(16);
};

export const networkParams: any = {
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

const initialContext: Web3ContextProps = {
  active: false,
  library: undefined,
  account: undefined,
  provider: undefined,
  activate: () => {},
  deactivate: () => {},
  pending: false,
  connectedChainId: null,
  connectWalletConnect: () => {},
  balance: 0,
  providerInfo: undefined
};

const providerOptions = {
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

export const Web3Context = createContext(initialContext);

export function Web3ContextProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  const [library, setLibrary] = useState<Web3Provider | undefined>(undefined);
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [provider, setProvider] = useState<any>(undefined);
  const [pending, setPending] = useState(false);
  const [connectedChainId, setConnectedChainId] = useState<number | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [error, setError] = useState<any>();
  const { chain: selectedChain } = useWallet();
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [providerInfo, setProviderInfo] = useState<IProviderInfo | undefined>(undefined);

  const web3Modal = useMemo(
    () =>
      new Web3Modal({
        cacheProvider: true, // optional
        providerOptions // required,
      }),
    []
  );

  const connectWalletConnect = async () => {
    const provider = await web3Modal.connectTo('walletconnect');
    console.log(provider);
  };

  const activate = useCallback(async () => {
    try {
      setPending(true);
      const provider = await web3Modal.connect();
      console.log(provider);
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      console.log(network);
      console.log(getInjectedProvider());
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setConnectedChainId(network.chainId);
      setActive(true);
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      activate();
    }
  }, [web3Modal, activate]);

  useEffect(() => {
    if (library && account) {
      library.getBalance(account).then((_balance) => {
        const _parsedBalance = Math.round(parseFloat(utils.formatEther(_balance)) * 10000) / 10000;
        setBalance(_parsedBalance);
      });
    }
  }, [library, account]);

  useEffect(() => {
    const info = getProviderInfo(provider);
    setProviderInfo(info as IProviderInfo);
  }, [provider]);

  const refreshState = () => {};

  const deactivate = useCallback(() => {
    setPending(true);
    web3Modal.clearCachedProvider();
    refreshState();
    setPending(false);
    setActive(false);
    setAccount(undefined);
  }, []);

  // FIXME: can't use Web3Provider type
  const switchNetwork = async (library: any) => {
    try {
      await library.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: toHex(42220) }]
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: 'wallet_addEthereumChain',
            params: [networkParams[toHex(42220)]]
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log('accountsChanged', accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId: number) => {
        setConnectedChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log('disconnect', error);
        deactivate();
      };

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, [provider]);

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
        connectedChainId,
        connectWalletConnect,
        balance,
        providerInfo
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
