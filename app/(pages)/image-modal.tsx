import { Fragment } from "react";
import { useLocalSearchParams } from "expo-router";
import { ImageComponent } from "@/components/Image-Modal";
import { MapKeyRefresh } from "@/providers/MapKeyProvider";


type Params = {
  uri: string;
}


export default function ImageModal() {
  const { uri } = useLocalSearchParams<Params>();

  return (
    <Fragment>
      <ImageComponent
        uri={uri}
      />
      <MapKeyRefresh />
    </Fragment>
  )
}