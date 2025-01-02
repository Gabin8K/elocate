import { useTheme } from '@/hooks';
import { Theme } from '@/theme';
import { spacing } from '@/theme/spacing';
import { component } from '@/theme/reusables';
import React, { memo, useEffect, useState } from 'react';
import { Pressable, StyleSheet, ViewProps } from 'react-native';
import Animated, { LinearTransition, useAnimatedStyle, withTiming } from 'react-native-reanimated';


export type SwitchProps = {
  variant?: keyof Theme['colors'];
  checked?: boolean;
  style?: ViewProps['style'];
  onChecked?: (checked: boolean) => void;
}



export const Switch = memo<SwitchProps>(function Switch(props) {
  const { style, variant = 'primary' } = props;

  const { colors } = useTheme();
  const [checked, setChecked] = useState(props.checked ?? false);

  const onChecked = () => {
    setChecked(!checked);
    props.onChecked?.(!checked);
  }


  const uas = useAnimatedStyle(() => {
    const backgroundColor = withTiming(checked ? colors[variant] : colors.gray4);
    const borderColor = withTiming(checked ? colors[variant] : colors.gray4);
    return {
      borderColor,
      backgroundColor,
    }
  }, [checked, variant]);


  useEffect(() => {
    setChecked(props.checked ?? false);
  }, [props.checked]);


  return (
    <Pressable
      role={'switch'}
      aria-checked={checked}
      onPress={onChecked}
      style={[
        styles.container,
        {
          flexDirection: checked ? 'row-reverse' : 'row',
          borderColor: checked ? colors[variant] : colors.gray4,
        },
        style,
      ]}
    >
      <Animated.View
        layout={LinearTransition}
        style={[
          uas,
          styles.switch
        ]}
      />
    </Pressable>
  )
});

const styles = StyleSheet.create({
  container: {
    padding: 2,
    borderWidth: 1,
    width: spacing.xl,
    ...component.shadow,
    borderRadius: spacing.lg,
  },
  switch: {
    width: spacing.m,
    height: spacing.m,
    ...component.shadow,
    borderRadius: spacing.m,
  }
});