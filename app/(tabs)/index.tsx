import { reusableStyle } from "@/theme/reusables";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function Page() {
  return (
    <View
      style={reusableStyle.fullCenter}
    >
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  }
})