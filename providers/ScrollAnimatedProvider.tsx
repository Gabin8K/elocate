import { SharedValue, useSharedValue } from "react-native-reanimated";
import { createContext, FunctionComponent, PropsWithChildren, useContext } from "react";

type Direction = 'up' | 'down';

type ScrollAnimatedCtx = {
  offsetY: SharedValue<number>;
  direction: SharedValue<Direction>;
}

export const ScrollAnimatedContext = createContext<ScrollAnimatedCtx>({
  offsetY: {} as SharedValue<number>,
  direction: {} as SharedValue<Direction>,
})


export const useScrollAnimated = () => {
  const context = useContext(ScrollAnimatedContext)
  if (!context) {
    throw new Error('useScrollAnimated must be used within an ScrollAnimatedProvider')
  }
  return context;
}



const ScrollAnimatedProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  
  const offsetY = useSharedValue(0);
  const direction = useSharedValue<Direction>('down');

  return (
    <ScrollAnimatedContext.Provider
      value={{
        offsetY,
        direction,
      }}
    >
      {children}
    </ScrollAnimatedContext.Provider>
  )
}


export default ScrollAnimatedProvider;