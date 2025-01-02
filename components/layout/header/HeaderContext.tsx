import { SharedValue, useSharedValue } from "react-native-reanimated";
import { createContext, FC, FunctionComponent, PropsWithChildren, ReactNode, useContext, useEffect, useState } from "react";



interface HeaderContextType {
  offsetY: SharedValue<number>;
  child: ReactNode;
  setChild: (child: ReactNode) => void;
}


export const HeaderContext = createContext<HeaderContextType>({
  offsetY: {} as SharedValue<number>,
  child: null,
  setChild: () => { },
});


export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}




export const HeaderChild: FC<PropsWithChildren> = ({ children }) => {
  const header = useHeader();

  useEffect(() => {
    header.setChild(children);
    return () => {
      header.setChild(null);
    }
  }, [children]);

  return null;
}




export const HeaderProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const offsetY = useSharedValue(0);
  const [child, setChild] = useState<ReactNode>(null);


  return (
    <HeaderContext.Provider
      value={{
        offsetY,
        child,
        setChild,
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}