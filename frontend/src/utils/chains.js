export const polygonChain = {
  id: '0x89',
  token: 'MATIC',
  label: 'Polygon',
  shortName: 'poly',
  rpcUrl: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
  blockExplorerUrl: 'https://polygonscan.com',
  color: '#8247e5',
  transactionServiceUrl: 'https://safe-transaction-polygon.safe.global',
  isStripePaymentsEnabled: false
}




const chains = [polygonChain]

export const initialChain = polygonChain

export default chains