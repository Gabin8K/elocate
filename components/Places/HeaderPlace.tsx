import { FC, memo, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { Text } from "../ui";
import { Slider } from "../ui/slider";
import { spacing } from "@/theme/spacing";
import { HeaderChild } from "../layout/header";




export const HeaderPlace: FC = memo(function HeaderPlace() {

  const [value, setValue] = useState(0);

  const km = Math.floor(value / 5);

  return (
    <HeaderChild>
      <Animated.View
        style={styles.container}
      >
        <View>
          <Text
            style={styles.text}
          >
            Showing:{' '}
            <Text
              variant={'body2_b'}
              color={'primary'}
            >
              0 locations
            </Text>
          </Text>
          <Text>
            Within:{' '}
            <Text
              variant={'body2_b'}
              color={'primary'}
            >
              {km} km
            </Text>
          </Text>
        </View>
        <Slider
          onChange={setValue}
        />
      </Animated.View>
    </HeaderChild>
  )
})



const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.s,
    paddingBottom: spacing.m,
    rowGap: spacing.l,
  },
  text: {
    lineHeight: 22,
    paddingRight: spacing.lg,
  }
})