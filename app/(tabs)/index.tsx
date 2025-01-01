import { Map, MapProvider } from "@/components/Map";
import { RequestPlace } from "@/components/Map/place";
import { MarkerPlace } from "@/components/Map/place/MarkerPlace";
import { RequestPlaceModal } from "@/components/Map/place/modal/RequestPlaceModal";
import { NearMeComponent } from "@/components/Map/place/near-me";
import { KeyboardAvoidingViewProvider } from "@/providers/KeyboardAvoidingViewProvider";
import PortalProvider from "@/providers/PortalProvider";

export default function Page() {
  return (
    <KeyboardAvoidingViewProvider>
      <PortalProvider>
        <MapProvider>
          <Map>
            <MarkerPlace />
          </Map>
          <NearMeComponent />
          <RequestPlace />
          <RequestPlaceModal />
        </MapProvider>
      </PortalProvider>
    </KeyboardAvoidingViewProvider>
  )
}