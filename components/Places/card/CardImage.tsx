import { useTheme } from "@/hooks";
import { spacing } from "@/theme/spacing";
import { FC, memo, useCallback } from "react";
import { Image, Pressable, StyleSheet } from "react-native";


type CardImageProps = {
  uri: string;
}



export const CardImage: FC<CardImageProps> = memo(function CardImage(props) {
  const { uri } = props;

  const { mode } = useTheme();

  const onPress = useCallback(() => {
    // setUri(uri);
  }, [uri]);


  return (
    <Pressable
      onPress={onPress}
    >
      <Image
        source={{ uri }}
        style={[
          styles.image,
          { backgroundColor: mode === 'light' ? 'rgba(0,0,0,.05)' : 'rgba(255,255,255,.05)' }
        ]}
      />
    </Pressable>
  )
})



const styles = StyleSheet.create({
  image: {
    width: '100%',
    objectFit: 'contain',
    height: spacing.height * .15,
  }
})