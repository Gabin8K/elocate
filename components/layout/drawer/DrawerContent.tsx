import { Text } from "@/components/ui";
import { reusableStyle } from "@/theme/reusables";
import { FC, memo } from "react";
import { StyleSheet, View } from "react-native";
import { palette } from "@/theme/palette";
import { DrawerButton, DrawerButtonProps } from "./DrawerButton";
import { spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";





export const DrawerContent: FC = memo(function DrawerLayout() {

  const buttons: DrawerButtonProps[] = [
    {
      children: "Profile",
      href: '/profile',
      icon: 'person-outline',
    },
    {
      children: "Expereinces",
      href: '/experience',
      icon: 'book-outline',
    },
    {
      children: "Settings",
      href: '/setting',
      icon: 'settings-outline',
    }
  ];


  return (
    <View
      style={styles.container}
    >
      <View
        style={[
          reusableStyle.row,
          {marginHorizontal: spacing.m}
        ]}
      >
        <Text
          variant={'title_b'}
        >
          EL
        </Text>
        <Ionicons
          name={'location-outline'}
          size={24}
          color={palette.light.primary}
        />
        <Text variant={'title_b'}>
          CATE
        </Text>
      </View>
      <View
        style={styles.content}
      >
        {buttons.map((button, index) => (
          <DrawerButton
            key={index}
            {...button}
          />
        ))}
      </View>
    </View>
  );
})


const styles = StyleSheet.create({
  container:{
    paddingVertical: spacing.m,
  },
  content: {
    left:0,
    width: "100%",
    position: "absolute",
    paddingTop: spacing.l,
    top: spacing.height * .07,
  },
})