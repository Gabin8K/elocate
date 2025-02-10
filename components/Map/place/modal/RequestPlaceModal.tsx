import { spacing } from "@/theme/spacing";
import { FormContent } from "./FormContent";
import { PlaceDoc } from "@/services/types";
import { LoginContent } from "./LoginContent";
import { StyleSheet, View } from "react-native";
import { Place, useMap } from "../../MapContext";
import { useAuth } from "@/providers/AuthProvider";
import { FC, memo, useCallback, useRef } from "react";
import { useCurrentLocation } from "@/hooks/useLocation";
import { ModalSheetRef, ModalSheet } from "@/components/ui/modal";


type ContentProps = {
  newPlace?: Place;
  onNewPlace?: (place: PlaceDoc) => void;
  modalRef: React.RefObject<ModalSheetRef>;
}



export const RequestPlaceModal: FC = memo(function RequestPlaceModal() {
  const map = useMap();
  const location = useCurrentLocation();
  const modalRef = useRef<ModalSheetRef>(null);

  const onClose = useCallback(() => {
    map.closeModal();
  }, []);

  const onNewPlace = useCallback((place: PlaceDoc) => {
    if (!location?.coords) return;
    map.addPlace(place, location.coords);
  }, [location?.coords]);


  return (
    <ModalSheet
      ref={modalRef}
      open={map.openModal}
      onClose={onClose}
    >
      <RequestPlaceModalContent
        newPlace={map.newPlace}
        modalRef={modalRef}
        onNewPlace={onNewPlace}
      />
    </ModalSheet>
  );
});




const RequestPlaceModalContent: FC<ContentProps> = memo(function RequestPlaceModalContent(props) {
  const { newPlace, modalRef, onNewPlace } = props;
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
          onNewPlace={onNewPlace}
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