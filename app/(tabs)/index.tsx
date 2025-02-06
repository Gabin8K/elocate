import PortalProvider from "@/providers/PortalProvider";
import { KeyboardAvoidingViewProvider } from "@/providers";
import { Map, MapProvider, MapSensor } from "@/components/Map";
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
          <MapSensor />
        </MapProvider>
      </PortalProvider>
    </KeyboardAvoidingViewProvider>
  )
}