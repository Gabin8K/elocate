import { useLocale } from "@/hooks";
import { Place } from "../../MapContext";
import { spacing } from "@/theme/spacing";
import { ImageInput } from "./ImageInput";
import { FC, Fragment, memo } from "react";
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

  const { t } = useLocale();
  const { data } = useAddressFromCoords(newPlace.coordinate);


  return (
    <Fragment>
      <Text
        variant={'body1_m'}
        style={{ textAlign: 'center' }}
      >
        {t('request-place-modal-form-title')}
      </Text>
      <View
        style={styles.content}
      >
        <DropdownMenu
          placeholder={t('request-place-modal-form-placeholder-address')}
          dropdownItems={data}
          placeholderStyle={{
            style: styles.placeholder,
          }}
        />
        <TextInput
          multiline
          placeholder={t('request-place-modal-form-placeholder-description')}
        />
        <ImageInput />
        <Button
          layout
          style={styles.button}
          containerStyle={styles.buttonContainer}
        >
          {t('request-place-modal-form-btn-submit')}
        </Button>
      </View>
    </Fragment>
  );
});


const styles = StyleSheet.create({
  content: {
    rowGap: spacing.s,
  },
  placeholder: {
    flex: 1,
  },
  button: {
    marginTop: spacing.m,
  },
  buttonContainer: {
    paddingVertical: spacing.m,
  }
})