import { Text } from "../Text";
import { useTheme } from "@/hooks";
import { spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { DropdownList } from "./DropdownList";
import { reusableStyle } from "@/theme/reusables";
import { FC, memo, useCallback } from "react";
import { Pressable } from "react-native-gesture-handler";
import { DropdownProvider, useDropdown } from "./DropdownContext";
import { LayoutChangeEvent, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";


export type DropdownItem = {
  label: string;
  value: string;
}

export interface DropdownMenuProps {
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  placeholderStyle?: React.ComponentProps<typeof Text>;
  dropdownItems: DropdownItem[];
  onItemPress?: (item: DropdownItem) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
}


export const DropdownMenu = memo(function DropdownMenu(props: DropdownMenuProps) {
  return (
    <DropdownProvider>
      <DropdownMenuContent
        {...props}
      />
      <DropdownList
        items={props.dropdownItems}
        onItemPress={props.onItemPress}
      />
    </DropdownProvider>
  );
});


export const DropdownMenuContent: FC<DropdownMenuProps> = memo(function DropdownMenu(props) {
  const { onLayout, placeholder, placeholderStyle, containerStyle } = props;

  const { colors } = useTheme();
  const dropdown = useDropdown();

  const active = useSharedValue(0);

  const uas = useAnimatedStyle(() => {
    return {
      borderColor: active.value ? colors.primary : colors.text
    }
  }, [colors]);


  const rotate = useDerivedValue(() => {
    return withTiming(dropdown.open ? -90 : 0);
  }, [dropdown.open]);


  const uasRotate = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotate.value}deg` }
      ]
    }
  }, [dropdown.open]);


  const onPress = useCallback(() => {
    dropdown.setOpen(!dropdown.open);
  }, [dropdown]);


  return (
    <Pressable
      unstable_pressDelay={100}
      onPressIn={() => (active.value = withTiming(1))}
      onPressOut={() => (active.value = withTiming(0))}
      onLayout={onLayout}
      onPress={onPress}
    >
      <Animated.View
        style={[
          uas,
          styles.container,
          containerStyle,
        ]}
      >
        <Text
          variant={'body2'}
          color={dropdown.item ? 'text' : 'gray3'}
          {...placeholderStyle}
        >
          {dropdown.item ? dropdown.item.label : placeholder}
        </Text>
        <Animated.View
          style={[
            uasRotate,
            styles.icon,
          ]}
        >
          <Ionicons
            name={'chevron-down'}
            size={16}
            color={colors.text}
          />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
});



const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: spacing.s,
    ...reusableStyle.row,
    columnGap: spacing.s,
    borderRadius: spacing.s,
    paddingVertical: spacing.m,
    justifyContent: 'space-between',
  },
  icon: {
    maxWidth: 16,
  },
})