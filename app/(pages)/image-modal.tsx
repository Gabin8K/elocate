import { spacing } from "@/theme/spacing";
import { IconButton } from "@/components/ui/buttons";
import { Image, StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";


type Params = {
  uri: string;
}


export default function ImageModal() {
  const { uri } = useLocalSearchParams<Params>();

  const onPress = () => {
    router.back();
  }

  return (
    <View
      style={styles.container}
    >
      <IconButton
        onPress={onPress}
        icon={'arrow-back'}
        styleContainer={styles.icon}
      />
      <Image
        source={{ uri }}
        style={styles.image}
        resizeMode={'cover'}
      />
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    top: spacing.xl,
    left: spacing.s,
    position: 'absolute',
  },
  image: {
    width: '100%',
    objectFit: 'cover',
    backgroundColor: 'black',
    height: spacing.height * .5,
  },
})