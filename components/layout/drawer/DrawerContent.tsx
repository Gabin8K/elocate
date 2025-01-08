import { Text } from "@/components/ui";
import { reusableStyle } from "@/theme/reusables";
import { FC, Fragment, memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { palette } from "@/theme/palette";
import { DrawerButton, DrawerButtonProps, DrawerUser } from "./DrawerButton";
import { spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/buttons";
import { authService } from "@/services";
import { useTheme } from "@/hooks";




export const DrawerContent: FC = memo(function DrawerLayout() {
  const { auth } = useAuth();
  const { mode } = useTheme();

  const buttons: DrawerButtonProps[] = [
    {
      children: "Experiences",
      href: '/experience',
      icon: 'book-outline',
    },
    {
      children: "Settings",
      href: '/setting',
      icon: 'settings-outline',
    }
  ];

  const onLogout = useCallback(() => {
    authService.onGoogleSignout();
  }, []);


  return (
    <Fragment>
      <View
        style={styles.container}
      >
        <View
          style={[
            reusableStyle.row,
            { marginHorizontal: spacing.m }
          ]}
        >
          <Text
            variant={'title_b'}
            style={styles.title}
          >
            EL
          </Text>
          <Ionicons
            name={'location-outline'}
            size={24}
            color={palette.light.primary}
          />
          <Text
            variant={'title_b'}
            style={styles.title}
          >
            CATE
          </Text>
        </View>
        <View
          style={styles.content}
        >
          <DrawerUser
            uri={auth?.photoURL}
            username={auth?.displayName}
          />
          {buttons.map((button, index) => (
            <DrawerButton
              key={index}
              {...button}
            />
          ))}
        </View>
      </View>
      {auth ?
        <Button
          variant={'text'}
          onPress={onLogout}
          style={styles.button}
          textStyle={{
            color: mode === 'light' ? 'gray1' : 'background'
          }}
        >
          Se Deconnecter
        </Button> :
        null
      }
    </Fragment>
  );
})


const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.m,
  },
  title: {
    fontSize: 26,
    lineHeight: 26,
  },
  content: {
    left: 0,
    width: "100%",
    position: "absolute",
    paddingTop: spacing.l,
    top: spacing.height * .07,
  },
  button: {
    width: '90%',
    position: 'absolute',
    bottom: spacing.m,
    alignSelf: 'center',
  }
})