import { FC, memo } from "react";
import { useTheme } from "@/hooks";
import { reusableStyle } from "@/theme/reusables";
import { ActivityIndicator, StyleSheet, View } from "react-native";


type LoadingMapProps = {
  loading: boolean;
}


export const LoadingMap: FC<LoadingMapProps> = memo(function LoadingMap(props) {
  const { loading } = props;

  const { colors } = useTheme();

  if (!loading) return null;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background }
      ]}
    >
      <ActivityIndicator
        size={'large'}
        color={colors.primary}
      />
    </View>
  );
});




const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    ...reusableStyle.center,
    ...StyleSheet.absoluteFillObject,
  },
})