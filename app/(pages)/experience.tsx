import { Fragment } from "react";
import PortalProvider from "@/providers/PortalProvider";
import { MapKeyRefresh } from "@/providers/MapKeyProvider";
import { ScrollAnimatedCleanup } from "@/providers/ScrollAnimatedProvider";
import { ExperienceProvider, ExperienceRequest, HeaderExperience, ListExperience } from "@/components/Experience";



export default function ExperiencePage() {
  return (
    <Fragment>
      <HeaderExperience />
      <PortalProvider>
        <ExperienceProvider>
          <ListExperience />
          <ExperienceRequest />
        </ExperienceProvider>
      </PortalProvider>
      <ScrollAnimatedCleanup />
      <MapKeyRefresh />
    </Fragment>
  )
}