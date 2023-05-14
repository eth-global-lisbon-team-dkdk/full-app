import AccountAbstraction from '@safe-global/account-abstraction-kit-poc'
import SafeApiKit from '@safe-global/api-kit'
import { SafeAuthKit, Web3AuthModalPack } from '@safe-global/auth-kit'
import Safe, { EthersAdapter, SafeFactory } from '@safe-global/protocol-kit'
import { GelatoRelayPack } from '@safe-global/relay-kit'
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from '@web3auth/base'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import axios from 'axios'
import { ethers } from 'ethers'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import SwapperAbi from '../abis/Swapper.json'
import usePolling from '../hooks/usePolling'
import { initialChain } from '../utils/chains'
import getChain from '../utils/getChain'

const initialState = {
  isAuthenticated: false,
  loginWeb3Auth: () => {},
  logoutWeb3Auth: () => {},
  deploySafe: () => {},
  setChainId: () => {},
  setSafeSelected: () => {},
  setSafe: () => {},
  safes: [],
  chainId: initialChain.id,
  createTransaction: () => {},
  signAndConfirmTransaction: () => {},
  executeTransaction: () => {},
}

const SWAPPER_ADDRESS = '0x229D64bbd074722DD4e405F07cD8Cf29717D8F87';

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

  // reset React state when you switch the chain
  useEffect(() => {
    setOwnerAddress('')
    setSafes([])
    setChainId(chain.id)
    setWeb3Provider(undefined)
    setSafeSelected('')
    setAuthClient(undefined)
    setSafeDeployed(false)
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
          mfaLevel: 'none'
        },
        adapterSettings: {
          uxMode: 'popup',
          whiteLabel: {
            name: 'Safe'
          }
        }
      })

      const web3AuthModalPack = new Web3AuthModalPack(options, [openloginAdapter], modalConfig)

      const safeAuthKit = await SafeAuthKit.init(web3AuthModalPack, {
        txServiceUrl: getChain(chainId).transactionServiceUrl
      })

      if (safeAuthKit) {
        const { safes, eoa } = await safeAuthKit.signIn()
        const provider = safeAuthKit.getProvider()

        // we set react state with the provided values: owner (eoa address), chain, safes owned & web3 provider
        setChainId(chain.id)
        setOwnerAddress(eoa)
        setSafes(safes || [])
        setWeb3Provider(new ethers.providers.Web3Provider(provider))
        setAuthClient(safeAuthKit)
        setSafeDeployed(safes.length > 0)
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
    setSafeDeployed(false)
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

        const safeSelected = hasSafes ? safes[0] : await safeAccountAbstraction.getSafeAddress();

        setSafeSelected(safeSelected)
        setSafeDeployed(safes.length > 0)
      }
    }

    getSafeAddress()
  }, [safes, web3Provider])

  const [safeDeployed, setSafeDeployed] = useState(false)

  const deploySafe = async () => {
    console.log('deploying safe...')
    const safeAccountConfig = {
      owners: [ownerAddress],
      threshold: 1,
    }

    const protocolWallet = new ethers.Wallet(process.env.REACT_APP_PROTOCOL_PRIVATE_KEY, web3Provider);
    
    const protocolAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: protocolWallet
    })
    
    const safeFactory = await SafeFactory.create({ ethAdapter: protocolAdapter });
    let safeAddress = safeSelected;
    if (!safeDeployed) {
      let maxFeePerGas = ethers.BigNumber.from(40000000000) // fallback to 40 gwei
      let maxPriorityFeePerGas = ethers.BigNumber.from(40000000000) // fallback to 40 gwei
      try {
          const { data } = await axios({
              method: 'get',
              url: 'https://gasstation-mainnet.matic.network/v2'
          })
          maxFeePerGas = ethers.utils.parseUnits(
              Math.ceil(data.fast.maxFee) + '',
              'gwei'
          )
          maxPriorityFeePerGas = ethers.utils.parseUnits(
              Math.ceil(data.fast.maxPriorityFee) + '',
              'gwei'
          )
      } catch {
          // ignore
      }

      const safe = await safeFactory.deploySafe({
        safeAccountConfig, 
        options: {
          maxFeePerGas,
          maxPriorityFeePerGas} 
      });
        
      safeAddress = await safe.getAddress();

      console.log('Your Safe has been deployed:');
      console.log(`https://polygonscan.com/address/${safeAddress}`);
      console.log(`https://app.safe.global/matic:${safeAddress}`);
      setSafeDeployed(true);

      const tx = await protocolWallet.sendTransaction({
        to: safeAddress,
        value: 1,
        maxPriorityFeePerGas,
        maxFeePerGas,
      });
      await tx.wait();
      console.log("Funded safe with 1 MATIC to", safeAddress);
    } else {
      console.log('Your Safe has already been deployed:');
      console.log(`https://app.safe.global/matic:${safeAddress}`);
    }
  }

  const createTransaction = async (amountInWei, tokenOut, receiver) => {
    const iface = new ethers.utils.Interface(SwapperAbi);

    const encodedData = iface.encodeFunctionData("swapETHForTokens", [tokenOut, receiver]);

    // Generate data hash
    const dataHash = ethers.utils.keccak256(encodedData);

    // const safeTransactionData = buildSafeTransaction({
    //   to: ethers.utils.getAddress(SWAPPER_ADDRESS),
    //   data: dataHash,
    //   value: amountInWei,
    // });
    
    const safeTransactionData = buildSafeTransaction({
      to: ethers.utils.getAddress(SWAPPER_ADDRESS),
      data: dataHash,
      value: amountInWei,
    });

    const signer = web3Provider.getSigner();
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer || web3Provider
    });
    const safeSDK = await Safe.create({
      ethAdapter,
      safeSelected,
      chainId: chainId
    })
    
    let maxFeePerGas = ethers.BigNumber.from(40000000000) // fallback to 40 gwei
    let maxPriorityFeePerGas = ethers.BigNumber.from(40000000000) // fallback to 40 gwei
    try {
        const { data } = await axios({
            method: 'get',
            url: 'https://gasstation-mainnet.matic.network/v2'
        })
        maxFeePerGas = ethers.utils.parseUnits(
            Math.ceil(data.fast.maxFee) + '',
            'gwei'
        )
        maxPriorityFeePerGas = ethers.utils.parseUnits(
            Math.ceil(data.fast.maxPriorityFee) + '',
            'gwei'
        )
    } catch {
        // ignore
    }
    // Create a Safe transaction with the provided parameters
    const safeTransaction = await safeSDK.createTransaction({safeTransactionData, options: {
      maxFeePerGas,
      maxPriorityFeePerGas
    }})

    return safeTransaction;
  }

  const signAndConfirmTransaction = async (safeTransaction) => {    
    // Sign transaction to verify that the transaction is coming from owner 1
    const signer = web3Provider.getSigner();
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer || web3Provider
    });

    const safeSDK = await Safe.create({
      ethAdapter,
      safeSelected
    })

    const txServiceUrl = getChain(chainId).transactionServiceUrl
    const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapter })

    const safeTxHash = ethers.utils._TypedDataEncoder.hash({ 
      chainId: chainId,
      verifyingContract: ethers.utils.getAddress(safeSelected), 
    }, EIP712_SAFE_TX_TYPE, safeTransaction.data)
    const senderSignature = await safeSDK.signTransactionHash(safeTxHash);
    console.log('sender signature: ', senderSignature.data);
    
    await safeService.proposeTransaction({
      safeAddress: safeSelected,
      safeTransactionData: safeTransaction.data,
      safeTxHash,
      senderAddress: await signer.getAddress(),
      senderSignature: senderSignature.data,
    })

    const pendingTransactions = await safeService.getPendingTransactions(safeSelected)
    console.log(pendingTransactions)

    await safeService.confirmTransaction(safeTxHash, senderSignature.data);
  }

  const executeTransaction = async (tx) => {
    const safeTxHash = ethers.utils._TypedDataEncoder.hash({ 
      chainId: 137,
      verifyingContract: ethers.utils.getAddress(safeSelected), 
    }, EIP712_SAFE_TX_TYPE, tx.data)
    
    const protocolWallet = new ethers.Wallet(process.env.REACT_APP_PROTOCOL_PRIVATE_KEY, web3Provider);
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: protocolWallet
    });
    
    const safeService = new SafeApiKit({ 
      txServiceUrl: getChain(chainId).transactionServiceUrl, 
      ethAdapter: ethAdapter })
    
    const safeSDK = await Safe.create({
      ethAdapter,
      safeSelected
    })

    let maxFeePerGas = ethers.BigNumber.from(40000000000) // fallback to 40 gwei
    let maxPriorityFeePerGas = ethers.BigNumber.from(40000000000) // fallback to 40 gwei
    try {
        const { data } = await axios({
            method: 'get',
            url: 'https://gasstation-mainnet.matic.network/v2'
        })
        maxFeePerGas = ethers.utils.parseUnits(
            Math.ceil(data.fast.maxFee) + '',
            'gwei'
        )
        maxPriorityFeePerGas = ethers.utils.parseUnits(
            Math.ceil(data.fast.maxPriorityFee) + '',
            'gwei'
        )
    } catch {
        // ignore
    }

    const safeTransaction = await safeService.getTransaction(safeTxHash);
    const executeTxResponse = await safeSDK.executeTransaction(safeTransaction, {
      maxFeePerGas,
      maxPriorityFeePerGas
    });
    const receipt = await executeTxResponse.transactionResponse?.wait()
    
    console.log('Transaction executed:')
    console.log(`https://goerli.etherscan.io/tx/${receipt.transactionHash}`)
  }


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
    deploySafe,

    setChainId,

    safeSelected,
    safeBalance,
    setSafeSelected,
    safeDeployed,

    createTransaction,
    signAndConfirmTransaction,
    executeTransaction,
  }

  return (
    <accountAbstractionContext.Provider value={state}>
      {children}
    </accountAbstractionContext.Provider>
  )
}

const EIP712_SAFE_TX_TYPE = {
  // "SafeTx(address to,uint256 value,bytes data,uint8 operation,uint256 safeTxGas,uint256 baseGas,uint256 gasPrice,address gasToken,address refundReceiver,uint256 nonce)"
  SafeTx: [
      { type: "address", name: "to" },
      { type: "uint256", name: "value" },
      { type: "bytes", name: "data" },
      { type: "uint8", name: "operation" },
      { type: "uint256", name: "safeTxGas" },
      { type: "uint256", name: "baseGas" },
      { type: "uint256", name: "gasPrice" },
      { type: "address", name: "gasToken" },
      { type: "address", name: "refundReceiver" },
      { type: "uint256", name: "nonce" },
  ]
}

const buildSafeTransaction = (template) => {
  return {
      to: template.to,
      value: template.value || 0,
      data: template.data || "0x",
      operation: template.operation || 0,
      safeTxGas: template.safeTxGas || 0,
      baseGas: template.baseGas || 0,
      gasPrice: template.gasPrice || 0,
      gasToken: template.gasToken || ethers.constants.AddressZero,
      refundReceiver: template.refundReceiver || ethers.constants.AddressZero,
  }
}

export { useAccountAbstraction, AccountAbstractionProvider }
