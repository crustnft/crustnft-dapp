import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { Web3Provider } from '@ethersproject/providers';
import WalletConnect from '@walletconnect/web3-provider';
import { ethers, utils } from 'ethers';
import useAuth from 'hooks/useAuth';
import useWallet from 'hooks/useWallet';
import { Chain } from 'interfaces/chain';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { getChainByChainId } from 'utils/blockchainHandlers';
import Web3Modal, { getProviderInfo } from 'web3modal';
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
  activationTried: boolean;
  library: Web3Provider | undefined;
  account: string | undefined;
  provider: any;
  activate: () => void;
  deactivate: () => void;
  pending: boolean;
  connectedChain: Chain | null;
  connectedChainId: number | null;
  balance: number;
  providerInfo: IProviderInfo | undefined;
  networkNotSupported: boolean;
  switchNetwork: (chainId: number) => void;
  signInWallet: () => void;
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
  '0x1': {
    chainId: '0x1',
    rpcUrls: ['https://mainnet.infura.io/v3/741c5f1257a24106934fe4105c784478'],
    chainName: 'Ethereum',
    nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
    blockExplorerUrls: ['https://etherscan.io'],
    iconUrls: ['https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png']
  },
  '0x4': {
    chainId: '0x4',
    rpcUrls: ['https://mainnet.infura.io/v3/741c5f1257a24106934fe4105c784478'],
    chainName: 'Rinkeby',
    nativeCurrency: { name: 'RIN', decimals: 18, symbol: 'RIN' },
    blockExplorerUrls: ['https://rinkeby.etherscan.io'],
    iconUrls: ['https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png']
  },
  '0x61': {
    chainId: '0x61',
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    chainName: 'TBSC',
    nativeCurrency: { name: 'tBNB', decimals: 18, symbol: 'tBNB' },
    blockExplorerUrls: ['https://testnet.bscscan.com'],
    iconUrls: ['https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png']
  },
  '0x89': {
    chainId: '0x89',
    rpcUrls: ['https://polygonscan.com'],
    chainName: 'Polygon',
    nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
    blockExplorerUrls: ['https://polygon-rpc.com/'],
    iconUrls: ['https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png']
  }
};

const initialContext: Web3ContextProps = {
  active: false,
  activationTried: false,
  library: undefined,
  account: undefined,
  provider: undefined,
  activate: () => {},
  deactivate: () => {},
  pending: false,
  connectedChain: null,
  connectedChainId: null,
  balance: 0,
  providerInfo: undefined,
  networkNotSupported: false,
  switchNetwork: () => {},
  signInWallet: () => {}
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
  const [activationTried, setActivationTried] = useState(false);
  const [library, setLibrary] = useState<Web3Provider | undefined>(undefined);
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [provider, setProvider] = useState<any>(undefined);
  const [pending, setPending] = useState(false);
  const [connectedChain, setConnectedChain] = useState<Chain | null>(null);
  const [connectedChainId, setConnectedChainId] = useState<number | null>(null);
  const [balance, setBalance] = useState<number>(0);
  // const [error, setError] = useState<any>();
  const { onNetworkChange } = useWallet();
  const [providerInfo, setProviderInfo] = useState<IProviderInfo | undefined>(undefined);
  const [networkNotSupported, setNetworkNotSupported] = useState(false);
  const { logout: logOutAuth, challengeLogin, login: loginAuth } = useAuth();

  const web3Modal = useMemo(
    () =>
      new Web3Modal({
        cacheProvider: true, // optional
        providerOptions // required,
      }),
    []
  );

  const activate = useCallback(async () => {
    try {
      setPending(true);
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider, 'any');
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setConnectedChainId(network.chainId);
      setActive(true);
      setPending(false);
      setActivationTried(true);
    } catch (error) {
      // setError(error);
    }
  }, [web3Modal]);

  // connect if cached
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      activate();
    }
  }, [web3Modal, activate]);

  // get balance
  useEffect(() => {
    if (library && account) {
      library.getBalance(account).then((_balance) => {
        const _parsedBalance = Math.round(parseFloat(utils.formatEther(_balance)) * 10000) / 10000;
        setBalance(_parsedBalance);
      });
    }
  }, [library, account, connectedChainId]);

  const refreshState = () => {
    setProvider(undefined);
    setLibrary(undefined);
    setActive(false);
  };

  const deactivate = useCallback(async () => {
    setPending(true);
    setAccount(undefined);

    await logOutAuth();

    if (provider?.disconnect && typeof provider.disconnect === 'function') {
      await provider.disconnect();
    }

    web3Modal.clearCachedProvider();

    refreshState();

    setPending(false);
  }, [logOutAuth, provider, web3Modal]);

  useEffect(() => {
    if (!connectedChainId) return;
    const chain = getChainByChainId(connectedChainId);
    if (chain) {
      setConnectedChain(chain);
      onNetworkChange(chain);
    } else {
      setNetworkNotSupported(true);
    }
  }, [connectedChainId, onNetworkChange]);

  const switchNetwork = async (chainId: number) => {
    try {
      await (library as any).provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: toHex(chainId) }]
      });

      const chain = getChainByChainId(chainId);
      if (!chain) return;
      onNetworkChange(chain);
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await (library as any).provider.request({
            method: 'wallet_addEthereumChain',
            params: [networkParams[toHex(chainId)]]
          });
          const chain = getChainByChainId(chainId);
          if (!chain) return;
          onNetworkChange(chain);
        } catch (error) {
          // setError(error);
        }
      }
    }
  };

  useEffect(() => {
    const info = getProviderInfo(provider);
    setProviderInfo(info as IProviderInfo);

    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log('accountsChanged', accounts);

        if (accounts) {
          logOutAuth();
          setAccount(accounts[0]);
        }
      };

      const handleChainChanged = (_hexChainId: string) => {
        console.log('chainChanged', _hexChainId);
        setConnectedChainId(parseInt(_hexChainId, 16));
      };

      const handleDisconnect = (error: any) => {
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
  }, [provider, deactivate, logOutAuth]);

  const signInWallet = useCallback(async () => {
    if (library && account) {
      const signingMessage = await challengeLogin(account);
      if (!signingMessage) return;
      const signature = await (library as any).provider.request({
        method: 'personal_sign',
        params: [signingMessage, account]
      });

      loginAuth(account, signature);
    }
  }, [account, library, challengeLogin, loginAuth]);

  return (
    <Web3Context.Provider
      value={{
        active,
        activationTried,
        library,
        account,
        provider,
        activate,
        deactivate,
        pending,
        connectedChain,
        connectedChainId,
        balance,
        providerInfo,
        networkNotSupported,
        switchNetwork,
        signInWallet
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
