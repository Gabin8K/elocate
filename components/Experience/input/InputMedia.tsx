import { spacing } from "@/theme/spacing";
import { FC, memo, useCallback } from "react";
import { IconButton } from "../../ui/buttons";
import { useMediaFile, useToast } from "@/hooks";
import { Image, StyleSheet, View } from "react-native";
import { component, reusableStyle } from "@/theme/reusables";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";


type InputMediaProps = {
  visible: boolean;
}


export const InputMedia: FC<InputMediaProps> = memo(function InputMedia(props) {
  const { visible } = props;

  const toast = useToast();
  const media = useMediaFile();

  const onPress = useCallback(() => {
    media
      .uploadFile()
      .catch(err => toast.show(String(err.message || err), 'error'))
  }, []);


  const onRemove = useCallback(() => {
    media.reset();
  }, []);


  if (!visible) return null;


  return (
    <View
      style={styles.container}
    >
      <IconButton
        icon={'camera'}
        variant={'text'}
        onPress={onPress}
        iconProps={{
          size: 20,
        }}
      />
      {media.file ?
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          style={styles.imageContainer}
        >
          <Image
            resizeMode={'cover'}
            style={styles.image}
            source={{ uri: media.file.uri }}
          />
          <IconButton
            icon={'close'}
            variant={'text'}
            onPress={onRemove}
            styleContainer={styles.close}
            iconProps={{
              size: 16,
            }}
          />
        </Animated.View> :
        null
      }
    </View>
  )
});



const styles = StyleSheet.create({
  container: {
    ...reusableStyle.row,
  },
  close: {
    width: spacing.m,
    height: spacing.m,
    position: 'absolute',
    top: -spacing.m / 2.5,
    right: -spacing.m / 2.5,
  },
  imageContainer: {
    width: 60,
    height: spacing.xl,
    ...component.shadow,
    borderRadius: spacing.s,
  },
  image: {
    borderRadius: spacing.s,
    ...StyleSheet.absoluteFillObject,
  },
})