import { Text } from "@/components/ui";
import { authService } from "@/services";
import { spacing } from "@/theme/spacing";
import { palette } from "@/theme/palette";
import { useLocale, useTheme } from "@/hooks";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { DrawerDevInfo } from "./DrawerDevInfo";
import { Button } from "@/components/ui/buttons";
import { reusableStyle } from "@/theme/reusables";
import { useAuth } from "@/providers/AuthProvider";
import { FC, Fragment, memo, useCallback } from "react";
import { DrawerButton, DrawerButtonProps, DrawerUser } from "./DrawerButton";




export const DrawerContent: FC = memo(function DrawerLayout() {
  const { t } = useLocale();
  const { auth } = useAuth();
  const { mode } = useTheme();

  const buttons: DrawerButtonProps[] = [
    {
      children: t('drawer-experience'),
      href: '/experience',
      icon: 'book-outline',
    },
    {
      children: t('drawer-setting'),
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
          {t('drawer-user-logout')}
        </Button> :
        null
      }
      <DrawerDevInfo />
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
    alignSelf: 'center',
    position: 'absolute',
    bottom: spacing.xxl * 1.5,
  }
})