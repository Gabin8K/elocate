import { DropdownList } from "./DropdownList";
import Animated, { FadeOut } from "react-native-reanimated";
import PortalProvider, { Portal } from "@/providers/PortalProvider";
import { DropdownProvider, useDropdown } from "./DropdownContext";
import { DropdownMenuContent, DropdownMenuProps } from "./DropdownMenu";
import { FC, Fragment, memo, PropsWithChildren, useCallback, useState } from "react";
import { LayoutChangeEvent, Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";


type Point = {
  pageX: number;
  pageY: number;
}

export type DropdownMenuPortalProps = DropdownMenuProps & {
  stylePortal?: StyleProp<ViewStyle>;
  point?: Partial<Point>;
};



export const DropdownMenuPortalProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <DropdownProvider>
      <PortalProvider>
        {children}
      </PortalProvider>
    </DropdownProvider>
  )
};




export const DropdownMenuPortal: FC<DropdownMenuPortalProps> = memo(function DropdownMenuPortal(props) {
  const { point: _point, stylePortal, ...rest } = props;

  const dropdown = useDropdown();
  const [point, setPoint] = useState<Point>({ pageX: 0, pageY: 0 });

  const left = point.pageX + (_point?.pageX || 0);
  const top = point.pageY + (_point?.pageY || 0);

  const onClose = useCallback(() => {
    dropdown.setOpen(false);
  }, []);


  const onLayout = useCallback(({ target }: LayoutChangeEvent) => {
    target.measure((x, y, width, height, pageX, pageY) => {
      setPoint({ pageX, pageY });
    });
  }, []);


  return (
    <Fragment>
      <Portal
        name={'dropdown-menu'}
      >
        {dropdown.open ?
          <Fragment>
            <Animated.View
              exiting={FadeOut}
              style={[
                styles.container,
                stylePortal,
                {
                  top,
                  left,
                }
              ]}
            >
              <DropdownList
                portal
                items={props.dropdownItems}
                onItemPress={props.onItemPress}
              />
            </Animated.View>
            <Pressable
              onPress={onClose}
              style={styles.full}
            />
          </Fragment> :
          null
        }
      </Portal>
      <DropdownMenuContent
        {...rest}
        onLayout={onLayout}
      />
    </Fragment>
  );
});





const styles = StyleSheet.create({
  full: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    zIndex: 2,
    position: 'absolute',
  }
})