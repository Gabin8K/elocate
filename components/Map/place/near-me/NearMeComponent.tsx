import { StyleSheet } from "react-native";
import { spacing } from "@/theme/spacing";
import { useMap } from "../../MapContext";
import { NearMeSlider } from "./NearMeSlider";
import { MaterialIcons } from "@expo/vector-icons";
import { useBackhandler, useTheme } from "@/hooks";
import { IconButton } from "@/components/ui/buttons";
import { FC, Fragment, memo, useCallback } from "react";
import { NearMeProvider, useNearMe } from "./NearMeContext";
import Animated, { LinearTransition, ZoomIn } from "react-native-reanimated";



type NearMeContentProps = {
  loading?: boolean;
  showing: number;
  defaultValue: number;
  onRadiusChange: (value: number) => void;
}


export const NearMeComponent: FC = memo(function NearMeComponent() {
  const map = useMap();

  const onRadiusChange = useCallback(async (value: number) => {
    map.onRadiusChange(value);
    const camera = await map.mapRef.current?.getCamera();
    const zoom = 10;
    map.mapRef.current?.animateCamera({ ...camera, zoom }, { duration: 500 });
  }, []);

  if (map.loading || map.itinerary?.confirm) return null;

  return (
    <NearMeProvider>
      <NearMeContent
        defaultValue={map.radius}
        loading={map.loadingPlaces}
        showing={map.places.length}
        onRadiusChange={onRadiusChange}
      />
    </NearMeProvider>
  );
});




const NearMeContent: FC<NearMeContentProps> = memo(function NearMeContent(props) {
  const { defaultValue, onRadiusChange } = props;

  const near = useNearMe();
  const { colors } = useTheme();

  const onOpen = useCallback(() => {
    near.setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    near.setOpen(false);
  }, []);


  useBackhandler(() => {
    if (near.open) {
      onClose();
      return true;
    }
    return false;
  });


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
            <NearMeSlider
              showing={props.showing}
              defaultValue={defaultValue}
              onRadiusChange={onRadiusChange}
            />
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
    right: spacing.m,
    bottom: spacing.height * .15,
  },
})