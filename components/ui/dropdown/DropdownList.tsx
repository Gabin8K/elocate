import { FC, memo, useCallback, useMemo } from "react";
import { Text } from "../Text";
import { ListRenderItemInfo, Platform, Pressable, StyleSheet } from "react-native";
import { useDropdown } from "./DropdownContext";
import { DropdownItem } from "./DropdownMenu";
import { spacing } from "@/theme/spacing";
import { FlatList } from "react-native-gesture-handler";
import { common } from "@/theme/palette";
import { useTheme } from "@/hooks";


export interface DropdownListProps {
  items: DropdownItem[];
  onItemPress?: (item: DropdownItem) => void;
}

type RenderItemProps = DropdownItem & {
  onItemPress?: (item: DropdownItem) => void;
};


export const DropdownList: FC<DropdownListProps> = memo(function DropDownMenu(props) {
  const { items, onItemPress } = props;

  const { colors } = useTheme();
  const dropdown = useDropdown();

  const renderItem = useMemo(() => function renderItem({ item }: ListRenderItemInfo<DropdownItem>) {
    return (
      <RenderItem
        {...item}
        onItemPress={onItemPress}
      />
    );
  }, [items]);

  if (!dropdown.open) return;

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderTopColor: colors.text,
        }
      ]}
    />
  );
});





const RenderItem: FC<RenderItemProps> = memo(function RenderItem(props) {
  const { label, onItemPress } = props;
  const dropdown = useDropdown();

  const backgroundColor = Platform.select({
    android: common.transparent,
    default: common.gray2,
  });

  const onPress = useCallback(() => {
    dropdown.setIten(props);
    onItemPress?.(props);
  }, [dropdown.setIten, props]);

  return (
    <Pressable
      android_ripple={{
        color: common.gray2,
      }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        pressed ? { backgroundColor } : {},
        { backgroundColor: dropdown.item?.value === props.value ? common.gray2 : common.transparent }
      ]}
    >
      <Text>
        {label}
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