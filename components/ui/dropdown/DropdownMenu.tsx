import { FC, memo, useCallback } from "react";
import { Text } from "../Text";
import { useTheme } from "@/hooks";
import { spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { DropdownList } from "./DropdownList";
import { reusableStyle } from "@/theme/reusables";
import { DropdownProvider, useDropdown } from "./DropdownContext";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


export type DropdownItem = {
  label: string;
  value: string;
}

export interface DropdownMenuProps {
  placeholder?: string;
  placeholderStyle?: React.ComponentProps<typeof Text>;
  dropdownItems: DropdownItem[];
  onItemPress?: (item: DropdownItem) => void;
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


const DropdownMenuContent: FC<DropdownMenuProps> = memo(function DropdownMenu(props) {
  const { placeholder, placeholderStyle } = props;

  const { colors } = useTheme();
  const dropdown = useDropdown();

  const active = useSharedValue(0);
  const rotate = useSharedValue(0);

  const uas = useAnimatedStyle(() => {
    return {
      borderColor: active.value ? colors.primary : colors.text
    }
  }, [colors]);


  const uasRotate = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotate.value}deg` }
      ]
    }
  }, []);


  const onPress = useCallback(() => {
    rotate.value = withTiming(rotate.value === 0 ? -90 : 0);
    dropdown.setOpen(!dropdown.open);
  }, [dropdown]);


  return (
    <Pressable
      onPressIn={() => (active.value = withTiming(1))}
      onPressOut={() => (active.value = withTiming(0))}
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
          style={[uasRotate]}
        >
          <Ionicons
            name={'chevron-down'}
            size={16}
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
    paddingVertical: spacing.m,
    ...reusableStyle.row,
    borderRadius: spacing.s,
    justifyContent: 'space-between',
  },
})