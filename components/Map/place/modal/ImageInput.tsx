import { Text } from "../../../ui/Text";
import { File } from "@/services/types";
import { spacing } from "@/theme/spacing";
import { display } from "@/utils/formater";
import { FC, memo, useCallback } from "react";
import { Image, StyleSheet, View } from "react-native";
import { IconButton } from "../../../ui/buttons/IconButton";
import { component, reusableStyle } from "@/theme/reusables";
import { useLocale, useMediaFile, useTheme, useToast } from "@/hooks";
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming, ZoomIn, ZoomOut } from "react-native-reanimated";


interface ImageInputProps {
  onImageChange?: (file: File | null) => void;
};



export const ImageInput: FC<ImageInputProps> = memo(function ImageInput(props) {
  const { onImageChange } = props;

  const toast = useToast();
  const { t } = useLocale();
  const media = useMediaFile();
  const { colors } = useTheme();
  const active = useSharedValue(0);


  const onPress = useCallback(() => {
    media
      .uploadFile()
      .then(file => onImageChange?.(file))
      .catch(err => toast.show(String(err.message || err), 'error'))
  }, []);


  const onRemove = useCallback(() => {
    media.reset();
  }, []);


  const uas = useAnimatedStyle(() => {
    return {
      borderColor: active.value ? colors.primary : colors.text
    }
  }, [colors]);


  return (
    <Animated.View
      layout={LinearTransition}
      style={[
        uas,
        styles.container,
      ]}
    >
      <Text
        color={media.file ? 'text' : 'gray3'}
      >
        {media.file ?
          display(media.file.name, 16) :
          t('request-place-modal-form-file')
        }
      </Text>
      <View
        style={styles.endContainer}
      >
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
        <IconButton
          icon={'camera'}
          onPress={onPress}
          variant={'background'}
          onPressIn={() => (active.value = withTiming(1))}
          onPressOut={() => (active.value = withTiming(0))}
          styleContainer={styles.styleContainer}
          style={{
            backgroundColor: colors.gray3,
          }}
          iconProps={{
            size: 20,
          }}
        />
      </View>
    </Animated.View>
  );
});


const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: spacing.s,
    ...reusableStyle.row,
    borderStyle: 'dashed',
    borderRadius: spacing.s,
    paddingVertical: spacing.s,
    justifyContent: 'space-between',
  },
  endContainer: {
    ...reusableStyle.row,
    columnGap: spacing.s,
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
  close: {
    width: spacing.m,
    height: spacing.m,
    position: 'absolute',
    top: -spacing.m / 2.5,
    right: -spacing.m / 2.5,
  },
  styleContainer: {
    width: spacing.lg,
    height: spacing.lg,
  }
})