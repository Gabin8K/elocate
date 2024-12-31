import { Map, MapProvider } from "@/components/Map";
import { RequestPlace } from "@/components/Map/place";
import { MarkerPlace } from "@/components/Map/place/MarkerPlace";
import { RequestPlaceModal } from "@/components/Map/place/modal/RequestPlaceModal";
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
          <RequestPlace />
          <RequestPlaceModal />
        </MapProvider>
      </PortalProvider>
    </KeyboardAvoidingViewProvider>
  )
}