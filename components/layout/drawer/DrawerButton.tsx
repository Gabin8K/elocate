import { Text } from "@/components/ui";
import { common, } from "@/theme/palette";
import { reusableStyle } from "@/theme/reusables";
import { spacing } from "@/theme/spacing";
import { display } from "@/utils/formater";
import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { FC, memo, ReactNode } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";


export type DrawerButtonProps = {
  icon?: keyof typeof Ionicons.glyphMap;
  href?: Href;
  children: ReactNode;
}


export type DrawerUserProps = {
  uri?: string;
  username?: string;
}




export const DrawerButton: FC<DrawerButtonProps> = memo(function DrawerLayout(props) {
  const { icon: Icon, href, children } = props;

  const onPress = () => {
    if (!href) return;
    router.navigate(href);
  }

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: 'rgba(0,0,0,0.1)',
      }}
      style={styles.container}
    >
      <View style={styles.row}>
        <Ionicons
          name={Icon}
          size={24}
        />
        <Text
          variant={'body1_m'}
        >
          {children}
        </Text>
      </View>
      <View style={styles.divider} />
    </Pressable>
  );
})




export const DrawerUser: FC<DrawerUserProps> = (function DrawerUser(props) {
  const { uri, username } = props;

  return (
    <View
      style={styles.container}
    >
      <View style={styles.row}>
        {uri ?
          <Image
            source={{ uri }}
            style={styles.image}
          /> :
          <Ionicons
            name={'person-outline'}
            size={24}
          />
        }
        <Text
          variant={'body1_m'}
        >
          {display(username || 'Non connecté', 10)}
        </Text>
      </View>
      <View style={styles.divider} />
    </View>
  )
});



const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: spacing.m,
    paddingHorizontal: spacing.m,
  },
  row: {
    ...reusableStyle.row,
    columnGap: spacing.s,
  },
  image: {
    width: 25,
    height: 25,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: common.divider,
  },
  divider: {
    height: 1,
    width: "100%",
    marginTop: spacing.m,
    backgroundColor: common.divider,
  }
})