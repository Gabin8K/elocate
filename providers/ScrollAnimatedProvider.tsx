import { runOnJS, SharedValue, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { createContext, FC, FunctionComponent, PropsWithChildren, useContext, useEffect, useState } from "react";

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

  const isScrolling = useSharedValue(false);
  const context = useContext(ScrollAnimatedContext);
  const [canGoToUp, setCanGoToUp] = useState(false);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      if (context.offsetY.value > e.contentOffset.y) {
        if (isScrolling.value) {
          context.direction.value = 'up';
        }
      } else if (context.offsetY.value < e.contentOffset.y) {
        if (isScrolling.value) {
          context.direction.value = 'down';
        }
      }
      context.offsetY.value = e.contentOffset.y;

      if (e.contentOffset.y > 450 && !canGoToUp) {
        runOnJS(setCanGoToUp)(true);
      }
      if (e.contentOffset.y < 450 && canGoToUp) {
        runOnJS(setCanGoToUp)(false);
      }
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
  }, [canGoToUp]);

  if (!context) {
    throw new Error('useScrollAnimated must be used within an ScrollAnimatedProvider')
  }
  
  return {
    ...context,
    onScroll,
    canGoToUp,
  };
}






export const ScrollAnimatedCleanup: FC = () => {
  const context = useContext(ScrollAnimatedContext);

  if (!context) {
    throw new Error('useScrollAnimatedCleanup must be used within an ScrollAnimatedProvider')
  }

  useEffect(() => {
    return () => {
      context.offsetY.value = 0;
      context.direction.value = 'up';
    }
  }, []);

  return null;
}






const ScrollAnimatedProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

  const offsetY = useSharedValue(0);
  const direction = useSharedValue<Direction>('up');

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