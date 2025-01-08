import { Keyboard } from 'react-native';
import { useEffect, useState } from 'react';


type KeyboardState = {
  visible: boolean;
  height: number;
}

const initialState: KeyboardState = {
  visible: false,
  height: 0,
}


export function useKeyboard() {

  const [state, setState] = useState<KeyboardState>(initialState);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      const { height } = e.endCoordinates;
      setState({ visible: true, height });
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setState({ visible: false, height: 0 });
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return state;
}