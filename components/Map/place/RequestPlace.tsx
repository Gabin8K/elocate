import { Text } from "@/components/ui";
import { spacing } from "@/theme/spacing";
import { FC, Fragment, memo } from "react";
import { Place, useMap } from "../MapContext";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, } from "react-native";
import { Button } from "@/components/ui/buttons";
import { PointRipple, ripples } from "../marker";
import { Portal } from "@/providers/PortalProvider";
import { useValidationPlace } from "@/services/hooks";
import { component, reusableStyle } from "@/theme/reusables";
import { useBackhandler, useLocale, useTheme } from "@/hooks";
import Animated, { Easing, SlideInDown, SlideOutDown } from "react-native-reanimated";


type RenderRequestPlaceProps = {
  place: Place;
  closePlace: () => void;
  confirmRequestPlace: () => void;
}



export const RequestPlace: FC = memo(function RequestPlace() {
  const map = useMap();

  useBackhandler(() => {
    if (map.newPlace?.open) {
      map.closePlace();
      return true;
    }
    return false;
  });


  return (
    <Portal
      name={'request-place'}
    >
      {map.newPlace?.open ?
        <RenderRequestPlace
          place={map.newPlace}
          closePlace={map.closePlace}
          confirmRequestPlace={map.confirmRequestPlace}
        /> :
        null
      }
    </Portal>
  );
});






const RenderRequestPlace: FC<RenderRequestPlaceProps> = memo(function RenderRequestPlace(props) {
  const { place, closePlace, confirmRequestPlace } = props;

  const { t } = useLocale();

  const { colors, mode } = useTheme();
  const validation = useValidationPlace(place);

  return (
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
        {validation.valid !== false ?
          <Fragment>
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
          </Fragment> :
          <View
            style={styles.content}
          >
            <Ionicons
              size={spacing.l}
              color={colors.error}
              name={'warning-outline'}
            />
            <Text
              color={'error'}
              variant={'body2_m'}
            >
              {t('places-confirm-btn')}
            </Text>
          </View>
        }
      </View>
      <View
        style={styles.buttons}
      >
        <Button
          variant={'text'}
          onPress={confirmRequestPlace}
          disabled={!validation.valid}
          loading={validation.loading}
          textStyle={{
            color: mode === 'light' ? 'gray1' : 'background'
          }}
        >
          {t('request-place-modal-btn-yes')}
        </Button>
        <Button
          variant={'error'}
          onPress={closePlace}
        >
          {t('request-place-modal-btn-no')}
        </Button>
      </View>
    </Animated.View>
  );
});




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
  content: {
    ...reusableStyle.row,
    columnGap: spacing.s,
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
