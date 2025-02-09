import { Text } from "@/components/ui";
import { common } from "@/theme/palette";
import { StyleSheet } from "react-native";
import { spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { authService } from "@/services/auth";
import { Button } from "@/components/ui/buttons";
import { useLocale, useTheme, useToast } from "@/hooks";
import { FC, Fragment, memo, useCallback, useState } from "react";


type LoginContentProps = {
  label?: string;
}


export const LoginContent: FC<LoginContentProps> = memo(function LoginContent(props) {
  const { label } = props;

  const toast = useToast();
  const { t } = useLocale();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const onLogin = useCallback(() => {
    setLoading(true);
    authService
      .onGoogleSignin()
      .finally(() => setLoading(false))
      .catch((err) => toast.show(t('login-content-login-error')));
  }, [t]);

  return (
    <Fragment>
      <Text
        variant={'body1_m'}
        style={{ textAlign: 'center' }}
      >
        {t('login-content-required-account')}
      </Text>
      <Text
        style={[
          styles.info,
          { borderColor: colors.divider }
        ]}
      >
        {label || t('login-content-login-to-add-place')}
      </Text>
      <Button
        onPress={onLogin}
        loading={loading}
        endIcon={
          <Ionicons
            name={'logo-google'}
            color={common.gray1}
            size={24}
          />
        }
      >
        {t('login-content-login-with')}
      </Button>
    </Fragment>
  );
});


const styles = StyleSheet.create({
  info: {
    borderWidth: 1,
    borderRadius: spacing.s,
    padding: spacing.s,
  }
})