import { FC, memo, } from "react";
import { Text } from "@/components/ui";
import { useTheme } from "@/hooks";
import { spacing } from "@/theme/spacing";
import { StyleSheet, View } from "react-native";
import { reusableStyle } from "@/theme/reusables";


type CardSettingProps = {
  title: string;
  value?: string;
  children: React.ReactNode;
}



export const CardSetting: FC<CardSettingProps> = memo(function CardSetting(props) {
  const { title, value, children } = props;

  const { colors } = useTheme();

  return (
    <View
      style={styles.container}
    >
      <Text>
        {title}
      </Text>
      <View
        style={[
          styles.content,
          { backgroundColor: colors.card },
        ]}
      >
        <Text>
          {value}
        </Text>
        {children}
      </View>
    </View>
  )
})



const styles = StyleSheet.create({
  container: {
    rowGap: spacing.m,
  },
  content: {
    padding: spacing.m,
    ...reusableStyle.row,
    borderRadius: spacing.m,
    justifyContent: 'space-between',
  }
})