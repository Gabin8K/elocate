import { Place } from "../../MapContext";
import { FC, Fragment, memo } from "react";
import { spacing } from "@/theme/spacing";
import { ImageInput } from "./ImageInput";
import { StyleSheet, View } from "react-native";
import { Button } from "@/components/ui/buttons";
import { Text, TextInput } from "@/components/ui";
import { DropdownMenu } from "@/components/ui/dropdown";
import { useAddressFromCoords } from "@/services/hooks";


type FormContentProps = {
  newPlace: Place;
}

export const FormContent: FC<FormContentProps> = memo(function FormContent(props) {
  const { newPlace } = props;

  const { data } = useAddressFromCoords(newPlace.coordinate);


  return (
    <Fragment>
      <Text
        variant={'body1_m'}
        style={{ textAlign: 'center' }}
      >
        Ajouter un lieu
      </Text>
      <View
        style={styles.content}
      >
        <DropdownMenu
          placeholder={'Selectionner l\'adresse'}
          dropdownItems={data}
        />
        <TextInput
          multiline
          placeholder={'Description...'}
        />
        <ImageInput />
        <Button
          layout
          style={styles.button}
          containerStyle={styles.buttonContainer}
        >
          Soumettre
        </Button>
      </View>
    </Fragment>
  );
});


const styles = StyleSheet.create({
  content: {
    rowGap: spacing.s,
  },
  button: {
    marginTop: spacing.m,
  },
  buttonContainer: {
    paddingVertical: spacing.m,
  }
})