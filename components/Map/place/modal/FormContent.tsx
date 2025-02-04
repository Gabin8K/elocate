import { useLocale } from "@/hooks";
import { Place } from "../../MapContext";
import { spacing } from "@/theme/spacing";
import { common } from "@/theme/palette";
import { ImageInput } from "./ImageInput";
import { FC, Fragment, memo } from "react";
import { PlaceDoc } from "@/services/types";
import { useFormPlace } from "./useFormPlace";
import { StyleSheet, View } from "react-native";
import { Button } from "@/components/ui/buttons";
import { Text, TextInput } from "@/components/ui";
import { ModalSheetRef } from "@/components/ui/modal";
import { DropdownMenu } from "@/components/ui/dropdown";
import { FormRequestCompleted } from "./FormRequestCompleted";


type FormContentProps = {
  newPlace: Place;
  modalRef: React.RefObject<ModalSheetRef>;
  onNewPlace?: (place: PlaceDoc) => void;
}

export const FormContent: FC<FormContentProps> = memo(function FormContent(props) {
  const { newPlace, modalRef, onNewPlace } = props;

  const { t } = useLocale();
  const form = useFormPlace(newPlace);

  const onSubmit = async () => {
    const placeDoc = await form.handleSubmit();
    if (placeDoc) {
      onNewPlace?.(placeDoc);
    }
  }

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
          dropdownItems={form.dropdownItems}
          onItemPress={item => form.setValue('address', item.value)}
          containerStyle={form.errors ? { borderColor: common.error } : {}}
          placeholderStyle={{
            style: styles.placeholder,
          }}
        />
        <TextInput
          multiline
          style={styles.description}
          onChangeText={text => form.setValue('description', text)}
          placeholder={t('request-place-modal-form-placeholder-description')}
        />
        <ImageInput
          onImageChange={file => form.setValue('image', file)}
        />
        {!form.placeDoc ?
          <Button
            layout
            onPress={onSubmit}
            style={styles.button}
            loading={form.loading}
            disabled={form.errors}
            containerStyle={styles.buttonContainer}
          >
            {t('request-place-modal-form-btn-submit')}
          </Button> :
          <FormRequestCompleted
            modalRef={modalRef}
          />
        }
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
  description: {
    maxHeight: spacing.height * .13,
  },
  button: {
    marginTop: spacing.m,
  },
  buttonContainer: {
    paddingVertical: spacing.m,
  }
})