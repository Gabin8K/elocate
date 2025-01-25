import { spacing } from "@/theme/spacing";
import { FormContent } from "./FormContent";
import { FC, memo, useCallback } from "react";
import { LoginContent } from "./LoginContent";
import { StyleSheet, View } from "react-native";
import { Place, useMap } from "../../MapContext";
import { ModalSheet } from "@/components/ui/modal";
import { useAuth } from "@/providers/AuthProvider";


type ContentProps = {
  newPlace?: Place;
  onClose: () => void;
}



export const RequestPlaceModal: FC = memo(function RequestPlaceModal() {
  const map = useMap();

  const onClose = useCallback(() => {
    map.closeModal();
  }, []);

  return (
    <ModalSheet
      open={map.openModal}
      onClose={onClose}
    >
      <RequestPlaceModalContent
        newPlace={map.newPlace}
        onClose={onClose}
      />
    </ModalSheet>
  );
});




const RequestPlaceModalContent: FC<ContentProps> = memo(function RequestPlaceModalContent(props) {
  const { newPlace, onClose } = props;
  const { auth } = useAuth();

  if (!newPlace) return null;

  return (
    <View
      style={styles.container}
    >
      {!auth ?
        <LoginContent /> :
        <FormContent
          newPlace={newPlace}
          onClose={onClose}
        />
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