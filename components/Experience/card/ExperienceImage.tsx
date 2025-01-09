import { FC, memo } from "react";
import { spacing } from "@/theme/spacing";
import { Image, Pressable, StyleSheet } from "react-native";


export type ExperienceImageProps = {
  uri: string;
  index: number;
}



export const ExperienceImage: FC<ExperienceImageProps> = memo(function ExperienceImage(props) {
  const { index, uri } = props;

  const onPress = () => {

  }



  return (
    <Pressable
      onPress={onPress}
    >
      <Image
        source={{ uri }}
        style={[
          styles.image,
          {
            marginRight: index % 2 === 0 ? 0 : spacing.lg + spacing.s,
            marginLeft: index % 2 === 0 ? spacing.lg + spacing.s : 0,
          },
        ]}
      />
    </Pressable>
  )
})




const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: spacing.height * 0.2,
    borderRadius: spacing.m,
  },
})