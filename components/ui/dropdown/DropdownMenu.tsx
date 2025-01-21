import { Text } from "../Text";
import { useTheme } from "@/hooks";
import { spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { DropdownList } from "./DropdownList";
import { FC, memo, useCallback } from "react";
import { reusableStyle } from "@/theme/reusables";
import { Pressable } from "react-native-gesture-handler";
import { LayoutChangeEvent, StyleSheet } from "react-native";
import { DropdownProvider, useDropdown } from "./DropdownContext";
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";


export type DropdownItem = {
  label: string;
  value: string;
}

export interface DropdownMenuProps {
  placeholder?: string;
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
  const { onLayout, placeholder, placeholderStyle } = props;

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
          styles.container
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
  text: {
    flex: 1,
  },
  icon: {
    maxWidth: 16,
  },
})