import { FC, memo } from "react";
import { useLocale } from "@/hooks";
import { Text } from "@/components/ui";
import Constants from 'expo-constants';
import { spacing } from "@/theme/spacing";
import { StyleSheet, View } from "react-native";



export const DrawerDevInfo: FC = memo(function DrawerDevInfo() {

  const { t } = useLocale();

  const year = new Date().getFullYear();
  const version = Constants.expoConfig?.version || '0.0.0';
  
  return (
    <View
      style={styles.container}
    >
      <Text
        color={'gray3'}
        variant={'caption'}
      >
        v{version} - © {year}
      </Text>
      <View
        style={styles.row}
      >
        <Text
          color={'gray3'}
          variant={'caption'}
        >
          {t('drawer-app-developer-mail')} {' '}
        </Text>
        <Text
          color={'gray3'}
          variant={'caption_m'}
        >
          gabindjomo21@gmail.com
        </Text>
      </View>
    </View>
  )
});



const styles = StyleSheet.create({
  container: {
    bottom: spacing.m,
    alignSelf: 'center',
    position: 'absolute',
    paddingBottom: spacing.xs,
    paddingHorizontal: spacing.m,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});