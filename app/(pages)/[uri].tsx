import { useLocale } from "@/hooks";
import { Text } from "@/components/ui";
import { spacing } from "@/theme/spacing";
import { palette } from "@/theme/palette";
import { useAppUri } from "@/components/Uri";
import { IconButton } from "@/components/ui/buttons";
import { ActivityIndicator, StyleSheet, View } from "react-native";



export default function AppUri() {
  const { t } = useLocale();
  const { goBack, loading, error } = useAppUri();


  return (
    <View
      style={styles.container}
    >
      {loading ?
        <ActivityIndicator
          size={spacing.xl}
          color={palette.light.primary}
        /> :
        error ?
          <View
            style={styles.error}
          >
            <IconButton
              shadow
              onPress={goBack}
              variant={'primary'}
              backgroundColor={'card'}
              icon={'warning-outline'}
            />
            <Text
              variant={'body1_m'}
              color={'gray3'}
            >
              {t('uri-error')}
            </Text>
          </View>
          :
          null
      }
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    rowGap: spacing.s,
    alignItems: 'center',
  },
})