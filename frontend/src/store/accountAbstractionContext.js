import AccountAbstraction from '@safe-global/account-abstraction-kit-poc'
import { SafeAuthKit, Web3AuthModalPack } from '@safe-global/auth-kit'
import { GelatoRelayPack } from '@safe-global/relay-kit'
import { ethers, utils } from 'ethers'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from '@web3auth/base'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import usePolling from '../hooks/usePolling'
import { initialChain } from '../utils/chains'
import getChain from '../utils/getChain'

const initialState = {
  isAuthenticated: false,
  loginWeb3Auth: () => {},
  logoutWeb3Auth: () => {},
  relayTransaction: async () => {},
  setChainId: () => {},
  setSafeSelected: () => {},
  onRampWithStripe: async () => {},
  safes: [],
  chainId: initialChain.id,
  isRelayerLoading: true,
  openStripeWidget: async () => {},
  closeStripeWidget: async () => {}
}

const accountAbstractionContext = createContext(initialState)

const useAccountAbstraction = () => {
  const context = useContext(accountAbstractionContext)

  if (!context) {
    throw new Error('useAccountAbstraction should be used within a AccountAbstraction Provider')
  }

  return context
}

const AccountAbstractionProvider = ({ children }) => {
  // owner address from the email  (provided by web3Auth)
  const [ownerAddress, setOwnerAddress] = useState('')

  // safes owned by the user
  const [safes, setSafes] = useState([])

  // chain selected
  const [chainId, setChainId] = useState(initialChain.id)

  // web3 provider to perform signatures
  const [web3Provider, setWeb3Provider] = useState()

  const isAuthenticated = !!ownerAddress && !!chainId
  const chain = getChain(chainId) || initialChain

  // authClient
  const [authClient, setAuthClient] = useState()

  // onRampClient
  // const [onRampClient, setOnRampClient] = useState()

  // reset React state when you switch the chain
  useEffect(() => {
    setOwnerAddress('')
    setSafes([])
    setChainId(chain.id)
    setWeb3Provider(undefined)
    setSafeSelected('')
    setAuthClient(undefined)
  }, [chain])

  // auth-kit implementation
  const loginWeb3Auth = useCallback(async () => {
    try {
      const options = {
        clientId: process.env.REACT_APP_WEB3AUTH_CLIENT_ID || '',
        web3AuthNetwork: 'testnet',
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: getChain(chainId).id,
          rpcTarget: getChain(chainId).rpcUrl
        },
        uiConfig: {
          theme: 'dark',
          loginMethodsOrder: ['google', 'facebook']
        }
      }

      const modalConfig = {
        [WALLET_ADAPTERS.TORUS_EVM]: {
          label: 'torus',
          showOnModal: false
        },
        [WALLET_ADAPTERS.METAMASK]: {
          label: 'metamask',
          showOnDesktop: true,
          showOnMobile: false
        }
      }

      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: 'mandatory'
        },
        adapterSettings: {
          uxMode: 'popup',
          whiteLabel: {
            name: 'Safe'
          }
        }
      })

      const web3AuthModalPack = new Web3AuthModalPack(options, [openloginAdapter], modalConfig)

      const safeAuth = await SafeAuthKit.init(web3AuthModalPack)

      if (safeAuth) {
        const { safes, eoa } = await safeAuth.signIn()
        const provider = safeAuth.getProvider()

        // we set react state with the provided values: owner (eoa address), chain, safes owned & web3 provider
        setChainId(chain.id)
        setOwnerAddress(eoa)
        setSafes(safes || [])
        setWeb3Provider(new ethers.providers.Web3Provider(provider))
        setAuthClient(safeAuth)
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }, [chain, chainId])

  const logoutWeb3Auth = () => {
    authClient?.signOut()
    setOwnerAddress('')
    setSafes([])
    setChainId(chain.id)
    setWeb3Provider(undefined)
    setSafeSelected('')
    setAuthClient(undefined)
    setGelatoTaskId(undefined)
  }

  // TODO: add disconnect owner wallet logic ?

  // current safe selected by the user
  const [safeSelected, setSafeSelected] = useState('')

  // conterfactual safe Address if its not deployed yet
  useEffect(() => {
    const getSafeAddress = async () => {
      if (web3Provider) {
        const signer = web3Provider.getSigner()
        const relayPack = new GelatoRelayPack()
        const safeAccountAbstraction = new AccountAbstraction(signer)

        await safeAccountAbstraction.init({ relayPack })

        const hasSafes = safes.length > 0

        const safeSelected = hasSafes ? safes[0] : await safeAccountAbstraction.getSafeAddress()

        setSafeSelected(safeSelected)
      }
    }

    getSafeAddress()
  }, [safes, web3Provider])

  const [isRelayerLoading, setIsRelayerLoading] = useState(false)
  const [gelatoTaskId, setGelatoTaskId] = useState()

  // refresh the Gelato task id
  useEffect(() => {
    setIsRelayerLoading(false)
    setGelatoTaskId(undefined)
  }, [chainId])

  // relay-kit implementation using Gelato
  const relayTransaction = async () => {
    if (web3Provider) {
      setIsRelayerLoading(true)

      const signer = web3Provider.getSigner()
      const relayPack = new GelatoRelayPack()
      const safeAccountAbstraction = new AccountAbstraction(signer)

      await safeAccountAbstraction.init({ relayPack })

      // we use a dump safe transfer as a demo transaction
      const dumpSafeTransafer = [
        {
          to: safeSelected,
          data: '0x',
          value: utils.parseUnits('0.01', 'ether').toString(),
          operation: 0 // OperationType.Call,
        }
      ]

      const options = {
        isSponsored: false,
        gasLimit: '600000', // in this alfa version we need to manually set the gas limit
        gasToken: ethers.constants.AddressZero // native token
      }

      const gelatoTaskId = await safeAccountAbstraction.relayTransaction(dumpSafeTransafer, options)

      setIsRelayerLoading(false)
      setGelatoTaskId(gelatoTaskId)
    }
  }

  // we can pay Gelato tx relayer fees with native token & USDC
  // TODO: ADD native Safe Balance polling
  // TODO: ADD USDC Safe Balance polling

  // fetch safe address balance with polling
  const fetchSafeBalance = useCallback(async () => {
    const balance = await web3Provider?.getBalance(safeSelected)

    return balance?.toString()
  }, [web3Provider, safeSelected])

  const safeBalance = usePolling(fetchSafeBalance)

  const state = {
    ownerAddress,
    chainId,
    chain,
    safes,

    isAuthenticated,

    web3Provider,

    loginWeb3Auth,
    logoutWeb3Auth,

    setChainId,

    safeSelected,
    safeBalance,
    setSafeSelected,

    isRelayerLoading,
    relayTransaction,
    gelatoTaskId
  }

  return (
    <accountAbstractionContext.Provider value={state}>
      {children}
    </accountAbstractionContext.Provider>
  )
}

export { useAccountAbstraction, AccountAbstractionProvider }
