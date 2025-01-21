import { FC, memo } from "react";
import { Place, useMap } from "../../MapContext";
import { ModalSheet } from "@/components/ui/modal";
import { useAuth } from "@/providers/AuthProvider";
import { StyleSheet, View } from "react-native";
import { spacing } from "@/theme/spacing";
import { LoginContent } from "./LoginContent";
import { FormContent } from "./FormContent";


type ContentProps = {
  newPlace?: Place;
}



export const RequestPlaceModal: FC = memo(function RequestPlaceModal() {
  const map = useMap();

  return (
    <ModalSheet
      open={map.openModal}
      onClose={map.closeModal}
    >
      <RequestPlaceModalContent
        newPlace={map.newPlace}
      />
    </ModalSheet>
  );
});




const RequestPlaceModalContent: FC<ContentProps> = memo(function RequestPlaceModalContent(props) {
  const { newPlace } = props;
  const { auth } = useAuth();

  if(!newPlace) return null;

  return (
    <View
      style={styles.container}
    >
      {!auth ?
        <LoginContent /> :
        <FormContent
          newPlace={newPlace}
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