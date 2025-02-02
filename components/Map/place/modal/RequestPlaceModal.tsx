import { spacing } from "@/theme/spacing";
import { FormContent } from "./FormContent";
import { LoginContent } from "./LoginContent";
import { StyleSheet, View } from "react-native";
import { Place, useMap } from "../../MapContext";
import { useAuth } from "@/providers/AuthProvider";
import { FC, memo, useCallback, useRef } from "react";
import { ModalSheetRef, ModalSheet } from "@/components/ui/modal";


type ContentProps = {
  newPlace?: Place;
  modalRef: React.RefObject<ModalSheetRef>;
}



export const RequestPlaceModal: FC = memo(function RequestPlaceModal() {
  const map = useMap();
  const modalRef = useRef<ModalSheetRef>(null);

  const onClose = useCallback(() => {
    map.closeModal();
  }, []);

  return (
    <ModalSheet
      ref={modalRef}
      open={map.openModal}
      onClose={onClose}
    >
      <RequestPlaceModalContent
        newPlace={map.newPlace}
        modalRef={modalRef}
      />
    </ModalSheet>
  );
});




const RequestPlaceModalContent: FC<ContentProps> = memo(function RequestPlaceModalContent(props) {
  const { newPlace, modalRef } = props;
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
          modalRef={modalRef}
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