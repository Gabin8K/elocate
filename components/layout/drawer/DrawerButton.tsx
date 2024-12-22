import { Text } from "@/components/ui";
import { palette } from "@/theme/palette";
import { reusableStyle } from "@/theme/reusables";
import { spacing } from "@/theme/spacing";
import { Href, router } from "expo-router";
import { FC, memo, ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SvgProps } from "react-native-svg";


export type DrawerButtonProps = {
  icon?: FC<SvgProps>;
  href?: Href;
  children: ReactNode;
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
        {Icon ?
          <Icon /> :
          null
        }
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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: spacing.m,
  },
  row:{
    ...reusableStyle.row,
    columnGap: spacing.s,
    paddingTop: spacing.m,
  },
  divider: {
    height: 1,
    width: "100%",
    marginTop: spacing.m,
    backgroundColor: palette.common.divider,
  }
})