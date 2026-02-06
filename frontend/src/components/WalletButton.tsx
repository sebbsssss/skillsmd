import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useCallback } from 'react'

interface WalletButtonProps {
  className?: string
  children?: React.ReactNode
}

export function WalletButton({ className = '', children }: WalletButtonProps) {
  const { publicKey, disconnect, connecting, wallet, connect } = useWallet()
  const { setVisible } = useWalletModal()

  const handleClick = useCallback(async () => {
    if (publicKey) {
      await disconnect()
    } else if (wallet) {
      // If wallet is selected but not connected, try connecting
      try {
        await connect()
      } catch (error) {
        console.error('Connection error:', error)
        setVisible(true)
      }
    } else {
      // No wallet selected, open modal
      setVisible(true)
    }
  }, [publicKey, wallet, disconnect, connect, setVisible])

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  if (connecting) {
    return (
      <button 
        disabled
        className={`px-4 py-2 lg:px-6 font-bold text-sm brutal-border-4 shadow-brutal bg-brutal-yellow text-brutal-black ${className}`}
      >
        Connecting...
      </button>
    )
  }

  if (publicKey) {
    return (
      <button 
        onClick={handleClick}
        className={`px-4 py-2 lg:px-6 font-bold text-sm brutal-border-4 shadow-brutal brutal-btn bg-brutal-green flex items-center gap-2 ${className}`}
      >
        <span className="w-2 h-2 bg-brutal-black rounded-full animate-pulse"></span>
        {formatAddress(publicKey.toBase58())}
      </button>
    )
  }

  return (
    <button 
      onClick={handleClick}
      className={`px-4 py-2 lg:px-6 font-bold text-sm brutal-border-4 shadow-brutal brutal-btn bg-brutal-purple text-white ${className}`}
    >
      {children || 'Connect Wallet'}
    </button>
  )
}
