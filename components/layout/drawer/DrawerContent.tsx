import { Text } from "@/components/ui";
import { FC, memo } from "react";
import { StyleSheet, View } from "react-native";



export const DrawerContent: FC = memo(function DrawerLayout() {

  return (
    <View
      style={styles.container}
    >
      <Text>
        Drawer Content
      </Text>
    </View>
  );
})


const styles = StyleSheet.create({
  container: {

  },
})