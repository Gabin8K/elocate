import { Text } from "@/components/ui";
import { reusableStyle } from "@/theme/reusables";
import { FC, memo } from "react";
import { StyleSheet, View } from "react-native";
import MapOutlineSvg from "@/assets/svg/map-outline.svg";
import { palette } from "@/theme/palette";
import { DrawerButton, DrawerButtonProps } from "./DrawerButton";
import { spacing } from "@/theme/spacing";
import AddPlaceSvg from "@/assets/svg/add-place.svg";
import SettingSvg from "@/assets/svg/setting.svg";
import ProfileSvg from "@/assets/svg/profile.svg";
import ExperienceSvg from "@/assets/svg/experience.svg";





export const DrawerContent: FC = memo(function DrawerLayout() {

  const buttons: DrawerButtonProps[] = [
    {
      children: "Ajouter une place",
      href: '/place',
      icon: AddPlaceSvg,
    },
    {
      children: "Profile",
      href: '/profile',
      icon: ProfileSvg,
    },
    {
      children: "Expereinces",
      href: '/experience',
      icon: ExperienceSvg,
    },
    {
      children: "Settings",
      href: '/setting',
      icon: SettingSvg,
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
          variant={'subtitle_b'}
        >
          EL
        </Text>
        <MapOutlineSvg
          stroke={palette.light.primary}
        />
        <Text variant={'subtitle_b'}>
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