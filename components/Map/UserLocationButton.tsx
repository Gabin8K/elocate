import { useTheme } from "@/hooks";
import { StyleSheet } from "react-native";
import { spacing } from "@/theme/spacing";
import { IconButton } from "@/components/ui/buttons";
import MapView, { Camera } from "react-native-maps";
import { FC, memo, RefObject, useCallback } from "react";


type UserLocationButtonProps = {
  camera: Camera;
  hasItinerary: boolean;
  mapRef: RefObject<MapView>;
}


export const UserLocationButton: FC<UserLocationButtonProps> = memo(function UserLocationButton(props) {
  const { mapRef, camera, hasItinerary } = props;

  const { colors } = useTheme();

  const onPress = useCallback(() => {
    mapRef.current?.animateCamera(camera, { duration: 500 });
  }, [camera]);

  if (hasItinerary) return null;


  return (
    <IconButton
      shadow
      onPress={onPress}
      icon={'locate-outline'}
      backgroundColor={'card'}
      styleContainer={styles.container}
      iconProps={{
        size: 16,
        color: colors.primary,
      }}
      android_ripple={{
        color: colors.gray2,
        radius: 100,
      }}
    />
  );
});




const styles = StyleSheet.create({
  container: {
    right: spacing.l,
    width: spacing.l,
    height: spacing.l,
    position: 'absolute',
    bottom: spacing.height * .23,
  },
})