import useLocalStorage from 'hooks/useLocalStorage';
import { createContext, ReactNode } from 'react';
import { SUPPORTED_CHAINS } from '../constants/chains';
import { Chain } from '../interfaces/chain';

type WalletContextProps = {
  chain: Chain;
  onNetworkChange: (chain: Chain) => void;
};

const initialLocalStorage = {
  chain: { ...SUPPORTED_CHAINS[0] }
};

const initialState: WalletContextProps = {
  ...initialLocalStorage,
  onNetworkChange: () => {}
};

const WalletContext = createContext(initialState);

type WalletProviderProps = {
  children: ReactNode;
};

function WalletProvider({ children }: WalletProviderProps) {
  const { value: wallet, setValueInLocalStorage: setWallet } = useLocalStorage('wallet', {
    ...initialLocalStorage
  });

  const onNetworkChange = (chain: Chain) => {
    if (wallet?.chain?.chainId !== chain.chainId) {
      setWallet({ ...wallet, chain });
    }
  };

  return (
    <WalletContext.Provider
      value={{
        ...wallet,
        onNetworkChange
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export { WalletProvider, WalletContext };
