import { FC, Fragment, memo } from "react";
import { Text, TextInput } from "@/components/ui";
import { StyleSheet, View } from "react-native";
import { spacing } from "@/theme/spacing";
import { DropdownMenu } from "@/components/ui/dropdown";
import { ImageInput } from "@/components/ui/image-input";
import { Button } from "@/components/Buttons";
import { useTheme } from "@/hooks";
import Animated, { LinearTransition } from "react-native-reanimated";




export const FormContent: FC = memo(function FormContent() {
  const { colors } = useTheme();

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
        <Animated.View
          layout={LinearTransition}
          style={[
            styles.form,
            { backgroundColor: colors.background }
          ]}
        >
          <TextInput
            multiline
            placeholder={'Description...'}
          />
          <ImageInput />
        </Animated.View>
        <Button
          layout
          style={styles.button}
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
  form: {
    zIndex: 1,
    rowGap: spacing.s,
  },
  button: {
    marginTop: spacing.m,
  }
})