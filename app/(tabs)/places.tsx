import { PlacesList } from "@/components/Places";
import { HeaderPlace } from "@/components/Places/HeaderPlace";
import { ImagePlace } from "@/components/Places/image";
import { PlacesModal } from "@/components/Places/modal";
import { PlacesProvider } from "@/components/Places/PlacesContext";
import { Fragment } from "react";


export default function Page() {

  return (
    <Fragment>
      <HeaderPlace />
      <PlacesProvider>
        <PlacesList />
        <ImagePlace />
        <PlacesModal />
      </PlacesProvider>
    </Fragment>
  )
}