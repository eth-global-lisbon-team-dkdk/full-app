import { AccountAbstractionProvider } from '../../store/accountAbstractionContext'

const Providers = ({ children }) => {
  return (
    <AccountAbstractionProvider>{children}</AccountAbstractionProvider>
  )
}

export default Providers