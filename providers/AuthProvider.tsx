import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useState } from "react";
import firebaseAuth from '@react-native-firebase/auth';
import { Auth } from "@/services/types";


type AuthCtx = {
  auth: Auth | null;
  loading: boolean;
  setAuth: (auth: any) => void;
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
  const [auth, setAuth] = useState<AuthCtx['auth']>(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const subscriber = firebaseAuth().onAuthStateChanged(auth => {
      setAuth(auth as AuthCtx['auth']);
      setLoading(false);
    });
    return subscriber;
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