import { FC, memo } from "react";
import { useTheme } from "@/hooks";
import { StyleSheet, View } from "react-native";
import { Text } from "../ui";
import { spacing } from "@/theme/spacing";
import { HeaderChild } from "../layout/header";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useScrollAnimated } from "@/providers/ScrollAnimatedProvider";


export const HeaderExperience: FC = memo(function HeaderExperience() {
  return (
    <HeaderChild>
      <HeaderExperienceContent />
    </HeaderChild>
  )
})



const HeaderExperienceContent: FC = memo(function HeaderExperienceContent() {

  const { colors } = useTheme();

  const { offsetY } = useScrollAnimated();

  const uas = useAnimatedStyle(() => {
    const height = interpolate(offsetY.value, [0, 100], [95, 0], 'clamp');
    const opacity = interpolate(offsetY.value, [0, 50], [1, 0], 'clamp');

    return {
      height,
      opacity,
    }
  }, []);


  return (
    <Animated.View
      style={[
        uas,
        styles.container,
      ]}
    >
      <Ionicons
        name={'sparkles-outline'}
        color={colors.text}
        size={spacing.m}
      />
      <View
        style={styles.content}
      >
        <Text
          color={'gray4'}
        >
          Dites en quelques mots votre expérience avec Elocate.
        </Text>
        <Text
          color={'gray4'}
          variant={'body2_m'}
          style={styles.text}
        >
          Cela nous aidera à améliorer les futures versions.
        </Text>
      </View>
    </Animated.View>
  )
})



const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flexDirection: 'row',
    paddingTop: spacing.m,
    columnGap: spacing.s,
  },
  content: {
    width: '80%',
    rowGap: spacing.xs,
  },
  text: {
    backgroundColor: 'rgba(0,0,0,.03)',
    borderRadius: 5,
    padding: spacing.xs,
  }
})