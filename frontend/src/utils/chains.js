export const goerliChain = {
  id: '0x5',
  token: 'gETH',
  label: 'Görli',
  shortName: 'gor',
  rpcUrl: `https://eth-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
  blockExplorerUrl: 'https://goerli.etherscan.io',
  color: '#fbc02d',
  transactionServiceUrl: 'https://safe-transaction-goerli.safe.global',
  isStripePaymentsEnabled: false
}




const chains = [goerliChain]

export const initialChain = goerliChain

export default chains