import { component } from "@/theme/reusables";
import { spacing } from "@/theme/spacing";
import { FC, memo, useCallback } from "react";
import { Image, Pressable, StyleSheet } from "react-native";


type CardImageProps = {
  uri: string;
}



export const CardImage: FC<CardImageProps> = memo(function CardImage(props) {
  const { uri } = props;

  const onPress = useCallback(() => {

  }, [uri]);


  return (
    <Pressable
      onPress={onPress}
    >
      <Image
        source={{ uri }}
        style={styles.image}
      />
    </Pressable>
  )
})



const styles = StyleSheet.create({
  image: {
    width: '100%',
    objectFit: 'cover',
    ...component.shadow,
    height: spacing.height * .15,
  }
})