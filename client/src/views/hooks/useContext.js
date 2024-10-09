import React from 'react'

const AppContext = React.createContext({
  showToastMessage: () => {},
  showLoading: () => {},
})

const useAppContext = () => {
  const {
    showToastMessage,
    showLoading,
  } = React.useContext(AppContext)
  
  const { Provider } = AppContext

  return {
    Provider,
    showToastMessage,
    showLoading,
  }
}

export default useAppContext;