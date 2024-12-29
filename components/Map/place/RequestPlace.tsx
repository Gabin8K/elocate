import { FC, memo, useCallback } from "react";
import { StyleSheet, View, } from "react-native";
import { component, reusableStyle } from "@/theme/reusables";
import { spacing } from "@/theme/spacing";
import { useTheme } from "@/hooks";
import { useMap } from "../MapContext";
import { Text } from "@/components/ui";
import { Portal } from "@/providers/PortalProvider";
import Animated, { Easing, SlideInDown, SlideOutDown } from "react-native-reanimated";
import { PointRipple, ripples } from "./PointRipple";
import { Button } from "@/components/Buttons";



export const RequestPlace: FC = memo(function RequestPlace() {

  const map = useMap();
  const { colors } = useTheme();

  const onClose = useCallback(() => {
    map.closePlace();
  }, []);

  const onConfirm = useCallback(() => {
    map.confirmRequestPlace();
  }, []);

  return (
    <Portal
      name={'request-place'}
    >
      {map.newPlace?.open ?
        <Animated.View
          entering={
            SlideInDown
              .springify()
              .damping(50)
          }
          exiting={
            SlideOutDown
              .duration(1000)
              .easing(Easing.ease)
          }
          style={[
            styles.container,
            { backgroundColor: colors.card }
          ]}
        >
          <View
            style={reusableStyle.row}
          >
            <Text
              variant={'body2_m'}
            >
              Voulez-vous ajouter se lieu
            </Text>
            <View
              style={styles.ripples}
            >
              {ripples.map((index) => (
                <PointRipple
                  key={index}
                  index={index}
                />
              ))}
            </View>
            <Text variant={'body2_m'}>?</Text>
          </View>
          <View
            style={styles.buttons}
          >
            <Button
              variant={'text'}
              onPress={onConfirm}
            >
              Oui
            </Button>
            <Button
              variant={'error'}
              onPress={onClose}
            >
              Non
            </Button>
          </View>
        </Animated.View> :
        null
      }
    </Portal>
  );
})



const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    bottom: spacing.l,
    alignSelf: 'center',
    position: 'absolute',
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.m,
    borderRadius: spacing.s,
    rowGap: spacing.m,
    ...component.shadow,
  },
  ripples: {
    ...reusableStyle.row,
    width: spacing.l,
  },
  buttons: {
    ...reusableStyle.row,
    justifyContent: 'center',
    columnGap: spacing.s,
  }
})