import { FC, Fragment, memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import { spacing } from "@/theme/spacing";
import { IconButton } from "@/components/ui/buttons";
import { useTheme } from "@/hooks";
import { NearMeProvider, useNearMe } from "./NearMeContext";
import { NearMeSlider } from "./NearMeSlider";
import Animated, { LinearTransition, ZoomIn } from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";



export const NearMeComponent: FC = memo(function NearMeComponent() {
  return (
    <NearMeProvider>
      <NearMeContent />
    </NearMeProvider>
  );
});




const NearMeContent: FC = memo(function NearMeContent() {
  const near = useNearMe();
  const { colors } = useTheme();

  const onOpen = useCallback(() => {
    near.setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    near.setOpen(false);
  }, []);


  return (
    <Fragment>
      {!near.open ?
        <Animated.View
          entering={ZoomIn}
          style={styles.buttonOpen}
        >
          <IconButton
            shadow
            onPress={onOpen}
            backgroundColor={'card'}
            android_ripple={{
              color: colors.gray2,
              radius: 100,
            }}
          >
            <MaterialIcons
              size={24}
              name={'near-me'}
              color={colors.text}
            />
          </IconButton>
        </Animated.View> :
        null
      }
      <Animated.View
        layout={LinearTransition}
        style={[
          styles.container,
          {
            backgroundColor: colors.card,
            boxShadow: near.open ? `0 4 4 ${colors.shadow}, 0 -4 4 ${colors.shadow}` : undefined,
          }
        ]}
      >
        {near.open ?
          <Fragment>
            <IconButton
              shadow
              onPress={onClose}
              icon={'chevron-collapse'}
              backgroundColor={'card'}
              styleContainer={styles.buttonClose}
              iconProps={{
                size: 16,
              }}
            />
            <NearMeSlider />
          </Fragment>
          :
          null
        }
      </Animated.View>
    </Fragment >
  );
});




const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: spacing.m,
    borderRadius: spacing.m,
    bottom: spacing.height * .15,
  },
  buttonClose: {
    right: -spacing.s,
    top: -spacing.s,
    width: spacing.l,
    height: spacing.l,
    position: 'absolute',
  },
  buttonOpen: {
    zIndex: 2,
    position: 'absolute',
    right: spacing.s,
    bottom: spacing.height * .15,
  },
})