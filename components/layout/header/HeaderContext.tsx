import { createContext, FC, FunctionComponent, PropsWithChildren, ReactNode, useContext, useEffect, useRef, useState } from "react";



interface HeaderContextType {
  child: ReactNode;
  setChild: (child: ReactNode) => void;
  canBackHandler: React.MutableRefObject<() => boolean>;
}


export const HeaderContext = createContext<HeaderContextType>({
  child: null,
  setChild: () => { },
  canBackHandler: { current: () => false },
});


export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}


export const useHeaderBackHandler = (callback: () => boolean) => {
  const header = useHeader();

  useEffect(() => {
    header.canBackHandler.current = callback;
    return () => {
      header.canBackHandler.current = () => false;
    }
  }, [callback]);
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
  const [child, setChild] = useState<ReactNode>(null);
  const canBackHandler = useRef<() => boolean>(() => false);

  return (
    <HeaderContext.Provider
      value={{
        child,
        setChild,
        canBackHandler,
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}