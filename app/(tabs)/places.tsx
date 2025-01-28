import { Fragment } from "react";
import { PlacesList } from "@/components/Places";
import { ImagePlace } from "@/components/Places/image";
import { PlacesModal } from "@/components/Places/modal";
import { HeaderPlace } from "@/components/Places/HeaderPlace";
import { PlacesProvider } from "@/components/Places/PlacesContext";
import { ScrollAnimatedCleanup } from "@/providers/ScrollAnimatedProvider";


export default function PlacesTab() {
  return (
    <Fragment>
      <PlacesProvider>
        <HeaderPlace />
        <PlacesList />
        <ImagePlace />
        <PlacesModal />
      </PlacesProvider>
      <ScrollAnimatedCleanup />
    </Fragment>
  )
}