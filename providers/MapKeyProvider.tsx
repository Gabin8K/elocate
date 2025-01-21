import { FunctionComponent, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";


export interface MapKeyCtx {
  key: number;
  setKey: (key: number) => void;
}

export const PortalContext = createContext<MapKeyCtx>({
  key: 0,
  setKey: () => { }
})



export const useMapKey = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('useMapKey must be used within a MapKeyProvider');
  }
  return context;
}


export const MapKeyRefresh: React.FC = () => {
  const context = useContext(PortalContext);

  useEffect(() => {
    return () => {
      context.setKey(context.key + 1);
    }
  }, []);

  return null;
}



const MapKeyProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [key, setKey] = useState(0);

  return (
    <PortalContext.Provider
      value={{
        key,
        setKey
      }}
    >
      {children}
    </PortalContext.Provider>
  )
}

export default MapKeyProvider;