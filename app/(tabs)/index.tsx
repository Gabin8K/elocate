import { Map, MapProvider } from "@/components/Map";
import { RequestPlace } from "@/components/Map/place";
import { MarkerPlace } from "@/components/Map/place/MarkerPlace";
import { RequestPlaceModal } from "@/components/Map/place/RequestPlaceModal";
import PortalProvider from "@/providers/PortalProvider";

export default function Page() {
  return (
    <PortalProvider>
      <MapProvider>
        <Map>
          <MarkerPlace />
        </Map>
        <RequestPlace />
        <RequestPlaceModal />
      </MapProvider>
    </PortalProvider>
  )
}