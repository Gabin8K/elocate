import { useMap } from "../MapContext";
import { Text } from "@/components/ui";
import { spacing } from "@/theme/spacing";
import { useLocale, useTheme } from "@/hooks";
import { FC, memo, useCallback } from "react";
import { StyleSheet, View, } from "react-native";
import { Button } from "@/components/ui/buttons";
import { PointRipple, ripples } from "../marker";
import { Portal } from "@/providers/PortalProvider";
import { component, reusableStyle } from "@/theme/reusables";
import Animated, { Easing, SlideInDown, SlideOutDown } from "react-native-reanimated";



export const RequestPlace: FC = memo(function RequestPlace() {

  const map = useMap();
  const { t } = useLocale();

  const { colors, mode } = useTheme();

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
              {t('request-place-modal-title')}
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
              textStyle={{
                color: mode === 'light' ? 'gray1' : 'background'
              }}
            >
              {t('request-place-modal-btn-yes')}
            </Button>
            <Button
              variant={'error'}
              onPress={onClose}
            >
              {t('request-place-modal-btn-no')}
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
    rowGap: spacing.m,
    ...component.shadow,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: spacing.s,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.m,
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
