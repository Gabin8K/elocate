import { createContext, FunctionComponent, PropsWithChildren, useContext, useState } from "react";


type DrawerCtx = {
  open: boolean;
  setOpen: (open: boolean) => void;
}


const DrawerContext = createContext<DrawerCtx>({ 
  open: false,
  setOpen: () => { }
});


export const useDrawer = () => {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return ctx;
}


export const DrawerProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <DrawerContext.Provider
      value={{
        open,
        setOpen
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}