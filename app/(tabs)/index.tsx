import { Map, MapProvider } from "@/components/Map";
import PortalProvider from "@/providers/PortalProvider";
import { KeyboardAvoidingViewProvider } from "@/providers";
import { NearMeComponent } from "@/components/Map/place/near-me";
import { RequestItinerary, RequestPlace } from "@/components/Map/place";
import { RequestPlaceModal } from "@/components/Map/place/modal/RequestPlaceModal";


export default function MapTab() {
  return (
    <KeyboardAvoidingViewProvider>
      <PortalProvider>
        <MapProvider>
          <Map />
          <NearMeComponent />
          <RequestPlace />
          <RequestPlaceModal />
          <RequestItinerary />
        </MapProvider>
      </PortalProvider>
    </KeyboardAvoidingViewProvider>
  )
}