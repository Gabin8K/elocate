import { FC, Fragment, memo, useCallback } from "react";
import { useMap } from "../MapContext";
import { ModalSheet } from "@/components/ui/modal";
import { Text } from "@/components/ui";
import { useAuth } from "@/providers/AuthProvider";
import { StyleSheet, View } from "react-native";
import { spacing } from "@/theme/spacing";
import { common } from "@/theme/palette";
import { Button } from "@/components/Buttons";
import { Ionicons } from "@expo/vector-icons";
import { authService } from "@/services/auth";
import { useToast } from "@/hooks";



export const RequestPlaceModal: FC = memo(function RequestPlaceModal() {
  const map = useMap();

  return (
    <ModalSheet
      open={map.openModal}
      onClose={map.closeModal}
    >
      <RequestPlaceModalContent />
    </ModalSheet>
  );
});




const RequestPlaceModalContent: FC = memo(function RequestPlaceModalContent() {
  const { auth } = useAuth();
  const toast = useToast();

  const onLogin = useCallback(() => {
    authService
      .onGoogleSignin()
      .catch((err) => toast.show(String(err || err.message)));
  }, []);

  return (
    <View
      style={styles.container}
    >
      {!auth ?
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
        </Fragment> :
        <Fragment>
          <Text>
            Formulaire de demande de lieu
          </Text>
        </Fragment>
      }
    </View>
  );
});


const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.s,
    rowGap: spacing.m,
  },
  info: {
    borderWidth: 1,
    borderRadius: spacing.s,
    padding: spacing.s,
    borderColor: common.divider,
  }
})