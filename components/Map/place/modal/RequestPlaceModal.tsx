import { FC, memo } from "react";
import { useMap } from "../../MapContext";
import { ModalSheet } from "@/components/ui/modal";
import { useAuth } from "@/providers/AuthProvider";
import { StyleSheet, View } from "react-native";
import { spacing } from "@/theme/spacing";
import { LoginContent } from "./LoginContent";
import { FormContent } from "./FormContent";



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

  return (
    <View
      style={styles.container}
    >
      {!auth ?
        <LoginContent /> :
        <FormContent />
      }
    </View>
  );
});


const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.s,
    paddingBottom: spacing.m,
    rowGap: spacing.m,
  }
})