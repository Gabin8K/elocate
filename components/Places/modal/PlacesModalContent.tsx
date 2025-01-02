import { FC, memo } from "react";
import { ModalSheet } from "@/components/ui/modal";
import { Image, StyleSheet, View } from "react-native";
import { spacing } from "@/theme/spacing";
import { Text } from "@/components/ui";
import { reusableStyle } from "@/theme/reusables";
import { IconButton } from "@/components/Buttons";
import { common } from "@/theme/palette";
import { IconApp } from "./IconApp";


type PlacesModalContentProps = {
  open: boolean;
  title: string;
  onHere?: () => void;
  onClose?: () => void;
  onGoogleMaps?: () => void;
}




export const PlacesModalContent: FC<PlacesModalContentProps> = memo(function PlacesModalContent(props) {
  const { open, title, onGoogleMaps, onHere, onClose } = props;

  return (
    <ModalSheet
      open={open}
      onClose={onClose}
    >
      <View
        style={styles.container}
      >
        <Text
          variant={'body1_m'}
          style={{ textAlign: 'center' }}
        >
          {title}
        </Text>
        <View
          style={styles.content}
        >
          <IconButton
            onPress={onGoogleMaps}
            styleContainer={styles.button}
          >
            <Image
              source={require('@/assets/images/google-maps.png')}
              style={styles.icon}
            />
          </IconButton>
          <IconButton
            onPress={onHere}
            styleContainer={styles.button}
          >
            <IconApp />
          </IconButton>
        </View>
      </View>
    </ModalSheet>
  );
});




const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.s,
    paddingBottom: spacing.m,
    rowGap: spacing.m,
  },
  content: {
    ...reusableStyle.row,
    ...reusableStyle.center,
    columnGap: spacing.s,
  },
  icon: {
    width: spacing.l,
    height: spacing.l,
    objectFit: 'contain',
  },
  button: {
    borderWidth: 1,
    borderColor: common.gray2,
  }
})