import { FC, memo } from "react";
import { useMap } from "../MapContext";
import { ModalSheet } from "@/components/ui/modal";
import { Text } from "@/components/ui";
import { useAuth } from "@/providers/AuthProvider";



export const RequestPlaceModal: FC = memo(function RequestPlaceModal() {

  const map = useMap();
  const { auth } = useAuth();

  return (
    <ModalSheet
      open={map.openModal}
      onClose={map.closeModal}
    >
      <Text>
        Vous devez vous connecter pour ajouter un lieu
      </Text>
    </ModalSheet>
  );
})
