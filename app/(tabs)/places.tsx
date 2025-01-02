import { PlacesList } from "@/components/Places";
import { HeaderPlace } from "@/components/Places/HeaderPlace";
import { ImagePlace } from "@/components/Places/image";
import PortalProvider from "@/providers/PortalProvider";


export default function Page() {

  return (
    <PortalProvider>
      <HeaderPlace />
      <PlacesList />
      <ImagePlace />
    </PortalProvider>
  )
}