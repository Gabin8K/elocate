import { createContext, FC, PropsWithChildren, useContext, useState } from "react";
import { DropdownItem } from "./DropdownMenu";


type DropdownContextType = {
  open: boolean;
  item?: DropdownItem;
  setItem: (item: DropdownItem) => void;
  setOpen: (open: boolean) => void;
}

type DropdownState = {
  open: boolean;
  item?: DropdownItem;
}


export const DropdownContext = createContext<DropdownContextType>({
  open: false,
  setOpen: () => { },
  setItem: () => { },
});


export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (context === undefined) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return context;
}



export const DropdownProvider: FC<PropsWithChildren> = ({ children }) => {

  const [state, setState] = useState<DropdownState>({ open: false });

  const setOpen = (open: boolean) => {
    setState({ ...state, open });
  }

  const setItem = (item: DropdownItem) => {
    setState({
      ...state,
      item,
      open: false,
    });
  }

  return (
    <DropdownContext.Provider
      value={{
        open: state.open,
        item: state.item,
        setOpen,
        setItem
      }}
    >
      {children}
    </DropdownContext.Provider>
  )
}