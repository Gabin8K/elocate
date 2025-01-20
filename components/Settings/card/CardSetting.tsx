import { FC, memo, } from "react";
import { useTheme } from "@/hooks";
import { Text } from "@/components/ui";
import { spacing } from "@/theme/spacing";
import { StyleSheet, View } from "react-native";
import { reusableStyle } from "@/theme/reusables";
import { CardSettingAction, CardSettingActionProps } from "./CardSettingAction";
import { common } from "@/theme/palette";
import Animated, { LinearTransition } from "react-native-reanimated";


export interface CardSettingProps {
  title: string;
  value?: string;
  action: CardSettingActionProps;
}



export const CardSetting: FC<CardSettingProps> = memo(function CardSetting(props) {
  const { title, value, action } = props;

  const { colors } = useTheme();

  return (
    <View
      style={styles.container}
    >
      <Text
        variant={'body2_m'}
        style={styles.title}
      >
        {title}
      </Text>
      <View
        style={[
          styles.content,
          { 
            backgroundColor: colors.card,
            boxShadow: `4 4 30 ${colors.shadow}`,
          },
        ]}
      >
        <Animated.View
          layout={LinearTransition}
          style={styles.value}
        >
          <Text>
            {value}
          </Text>
        </Animated.View>
        <CardSettingAction
          {...action}
        />
      </View>
    </View>
  )
})



const styles = StyleSheet.create({
  container: {
    rowGap: spacing.s,
  },
  title:{
    paddingLeft: spacing.s,
  },
  content: {
    padding: spacing.m,
    ...reusableStyle.row,
    columnGap: spacing.s,
    borderRadius: spacing.s,
    justifyContent: 'space-between',
  },
  value: {
    flex: 1,
    height: '100%',
    borderRightWidth: 1,
    ...reusableStyle.row,
    marginRight: spacing.m,
    borderColor: common.gray2,
  }
})