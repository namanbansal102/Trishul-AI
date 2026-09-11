import { http, createConfig } from 'wagmi'
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors'
import { defineChain } from 'viem'

export const botchain = defineChain({
  id: 677,
  name: 'BOT Chain Mainnet',
  nativeCurrency: {
    name: 'BOT',
    symbol: 'BOT',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.botchain.ai'],
      webSocket: ['wss://ws-rpc.botchain.ai'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Botscan',
      url: 'https://scan.botchain.ai',
    },
  },
})

// Get WalletConnect project ID from environment variable
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID'

export const config = createConfig({
  chains: [botchain],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    coinbaseWallet({ appName: 'Trishul AI Chat' }),
  ],
  transports: {
    [botchain.id]: http('https://rpc.botchain.ai'),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
