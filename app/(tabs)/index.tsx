import {  RequestPlace } from "@/components/Map/place";
import PortalProvider from "@/providers/PortalProvider";
import { KeyboardAvoidingViewProvider } from "@/providers";
import { Map, MapProvider, MapMotion } from "@/components/Map";
import { RequestItinerary } from "@/components/Map/itinerary";
import { NearMeComponent } from "@/components/Map/place/near-me";
import { RequestPlaceModal } from "@/components/Map/place/modal/RequestPlaceModal";
import { ItineraryNavigation } from "@/components/Map/itinerary/ItineraryNavigation";


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
          <ItineraryNavigation />
          <MapMotion />
        </MapProvider>
      </PortalProvider>
    </KeyboardAvoidingViewProvider>
  )
}