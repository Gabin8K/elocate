
import { AsyncStorageGetItem, AsyncStorageRemoveItem, AsyncStorageSetItem } from "@/utils";
import { createContext, FunctionComponent, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";


type AuthCtx = {
  auth: Auth | null;
  loading: boolean;
  setAuth: (auth: Auth | null) => void;
}

export const AuthContext = createContext<AuthCtx>({
  auth: null,
  loading: true,
  setAuth: () => { },
})


export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context;
}


const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [auth, _setAuth] = useState<Auth | null>(null)
  const [loading, setLoading] = useState(true)

  const setAuth = useCallback((auth: Auth | null) => {
    if (auth) {
      AsyncStorageSetItem('auth', auth)
    } else {
      AsyncStorageRemoveItem('auth')
    }
    _setAuth(auth)
  }, [])

  useEffect(() => {
    const findSession = async () => {
      try {
        const auth = await AsyncStorageGetItem<Auth>('auth')
        if (auth) {
          setAuth(auth)
          return;
        }
      } finally {
        setLoading(false)
      }
    }
    findSession()
  }, [])


  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


export default AuthProvider;
