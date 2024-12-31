import { FC, Fragment, memo, useCallback, useState } from "react";
import { Text } from "@/components/ui";
import { StyleSheet } from "react-native";
import { spacing } from "@/theme/spacing";
import { common } from "@/theme/palette";
import { Button } from "@/components/Buttons";
import { Ionicons } from "@expo/vector-icons";
import { authService } from "@/services/auth";
import { useToast } from "@/hooks";




export const LoginContent: FC = memo(function LoginContent() {

  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const onLogin = useCallback(() => {
    setLoading(true);
    authService
      .onGoogleSignin()
      .finally(() => setLoading(false))
      .catch((err) => toast.show(String(err || err.message)));
  }, []);

  return (
    <Fragment>
      <Text
        variant={'body1_m'}
        style={{ textAlign: 'center' }}
      >
        Compte requis
      </Text>
      <Text
        style={styles.info}
      >
        Vous devez vous connecter pour ajouter un lieu
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
        Se connecter avec
      </Button>
    </Fragment>
  );
});


const styles = StyleSheet.create({
  info: {
    borderWidth: 1,
    borderRadius: spacing.s,
    padding: spacing.s,
    borderColor: common.divider,
  }
})