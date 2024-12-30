import { FC, Fragment, memo } from "react";
import { ImageInput, Text, TextInput } from "@/components/ui";
import { StyleSheet, View } from "react-native";
import { spacing } from "@/theme/spacing";
import { DropdownMenu } from "@/components/ui/dropdown";




export const FormContent: FC = memo(function FormContent() {

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
          dropdownItems={[
            { label: 'item 1', value: 'item 1' },
            { label: 'item 2', value: 'item 2' },
            { label: 'item 3', value: 'item 3' },
            { label: 'item 4', value: 'item 4' },
            { label: 'item 5', value: 'item 5' },
          ]}
        />
        <TextInput
          placeholder={'Description...'}
        />
        <ImageInput/>
      </View>
    </Fragment>
  );
});


const styles = StyleSheet.create({
  content: {
    rowGap: spacing.s,
  }
})