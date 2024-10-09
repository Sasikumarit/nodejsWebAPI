import React from 'react'

const AppContext = React.createContext({
  setPageTitle: () => {},
})

const usePageTitle = () => {
  const { setPageTitle } = React.useContext(AppContext)
  const { Provider } = AppContext

  return {setPageTitle, Provider }
}

export default usePageTitle