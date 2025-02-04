import { Fragment } from "react";
import { MapKeyRefresh } from "@/providers/MapKeyProvider";
import { ScrollAnimatedCleanup } from "@/providers/ScrollAnimatedProvider";
import { ExperienceProvider, FormContent, HeaderExperience, ListExperience } from "@/components/Experience";



export default function ExperiencePage() {
  return (
    <Fragment>
      <HeaderExperience />
      <ExperienceProvider>
        <ListExperience />
        <FormContent />
      </ExperienceProvider>
      <ScrollAnimatedCleanup />
      <MapKeyRefresh />
    </Fragment>
  )
}