import { Theme } from "@/theme";
import { createContext, FunctionComponent, PropsWithChildren, ReactNode, useState } from "react";


export type ToastCtx = {
  state: ToastState;
  show: (message: ReactNode, color?: Color) => void;
  cancel: () => void;
}

type Color = keyof Theme['colors']
type ToastState = {
  message?: ReactNode;
  color: keyof Theme['colors'];
}

export const ToastContext = createContext<ToastCtx>({} as ToastCtx);



const ToastProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<ToastState>({ color: 'text' })

  const show = (message: ReactNode, color: Color = 'text') => {
    setState({ message, color })
  }

  const cancel = () => {
    setState({ message: undefined, color: 'text' })
  }

  return (
    <ToastContext.Provider
      value={{
        state,
        show,
        cancel
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}


export default ToastProvider;