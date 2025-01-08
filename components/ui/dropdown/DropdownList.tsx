import { FC, memo, useCallback, useMemo } from "react";
import { Text } from "../Text";
import { useDropdown } from "./DropdownContext";
import { DropdownItem } from "./DropdownMenu";
import { spacing } from "@/theme/spacing";
import { FlatList } from "react-native-gesture-handler";
import { common } from "@/theme/palette";
import { useTheme } from "@/hooks";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ListRenderItemInfo, Platform, Pressable, StyleSheet } from "react-native";


export interface DropdownListProps {
  portal?: boolean;
  items: DropdownItem[];
  onItemPress?: (item: DropdownItem) => void;
}

type RenderItemProps = {
  item: DropdownItem;
  onItemPress?: (item: DropdownItem) => void;
}


export const DropdownList: FC<DropdownListProps> = memo(function DropDownMenu(props) {
  const { portal, items, onItemPress } = props;

  const { colors } = useTheme();
  const dropdown = useDropdown();

  const renderItem = useMemo(() => function renderItem({ item }: ListRenderItemInfo<DropdownItem>) {
    return (
      <RenderItem
        item={item}
        onItemPress={onItemPress}
      />
    );
  }, [items]);

  if (!dropdown.open && !portal) return;

  return (
    <Animated.View
      {...portal ?
        {
          entering: FadeIn,
          exiting: FadeOut,
        } :
        { entering: FadeIn.delay(100) }
      }
    >
      <FlatList
        data={items}
        renderItem={renderItem}
        nestedScrollEnabled
        style={[
          styles.container,
          {
            backgroundColor: colors.card,
            borderTopColor: colors.text,
            boxShadow: `0 4 4 ${colors.shadow}, 0 0 4 ${colors.shadow}`,
          }
        ]}
      />
    </Animated.View>
  );
});





const RenderItem: FC<RenderItemProps> = memo(function RenderItem(props) {
  const { item, onItemPress } = props;

  const { colors, mode } = useTheme();
  const dropdown = useDropdown();

  const backgroundColor = Platform.select({
    android: common.transparent,
    default: common.gray2,
  });

  const onPress = useCallback(() => {
    dropdown.setItem(item);
    onItemPress?.(item);
  }, [dropdown.setItem, props]);

  return (
    <Pressable
      android_ripple={{
        color: common.gray2,
      }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        pressed ? { backgroundColor } : {},
        {
          backgroundColor: dropdown.item?.value === item.value ?
            mode === 'light' ? colors.gray2 : colors.background :
            common.transparent,
        }
      ]}
    >
      <Text>
        {item.label}
      </Text>
    </Pressable>
  );
});




const styles = StyleSheet.create({
  container: {
    height: 100,
    borderTopWidth: 1,
    overflow: 'hidden',
    borderRadius: spacing.s,
    boxShadow: `0 4 4 ${common.gray2}, 0 0 4 ${common.gray2}`,
  },
  pressable: {
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.s,
  }
})