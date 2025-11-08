"use client"

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { motion } from 'framer-motion'
import { Wallet, LogOut, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export function WalletConnectButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [showConnectors, setShowConnectors] = useState(false)

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <motion.button
        onClick={() => disconnect()}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-all border border-white/20 backdrop-blur-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <CheckCircle className="w-4 h-4 text-green-400" />
        <span className="text-sm font-medium">{formatAddress(address)}</span>
        <LogOut className="w-4 h-4 text-white/60 hover:text-white/90" />
      </motion.button>
    )
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setShowConnectors(!showConnectors)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black hover:bg-white/90 transition-all font-medium"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isPending}
      >
        <Wallet className="w-4 h-4" />
        <span className="text-sm">{isPending ? 'Connecting...' : 'Connect Wallet'}</span>
      </motion.button>

      {showConnectors && (
        <motion.div
          className="absolute top-full mt-2 right-0 bg-black/95 backdrop-blur-xl rounded-lg border border-white/10 shadow-xl min-w-[200px] z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="p-2">
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => {
                  connect({ connector })
                  setShowConnectors(false)
                }}
                disabled={isPending}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-left text-sm text-white/90 hover:text-white"
              >
                <Wallet className="w-4 h-4" />
                <span>{connector.name}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
