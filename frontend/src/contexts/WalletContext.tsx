import { FC, ReactNode, useMemo, useCallback } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { clusterApiUrl } from '@solana/web3.js'
import { WalletError } from '@solana/wallet-adapter-base'

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css'

interface Props {
  children: ReactNode
}

export const WalletContextProvider: FC<Props> = ({ children }) => {
  // Use devnet for hackathon
  const endpoint = useMemo(() => clusterApiUrl('devnet'), [])
  
  // Only Phantom for now - can add more later
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
  ], [])

  // Handle wallet errors
  const onError = useCallback((error: WalletError) => {
    console.error('[Wallet Error]', error)
    // You could add a toast notification here
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError}>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
