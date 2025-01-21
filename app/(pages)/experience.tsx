import { Fragment } from "react";
import { MapKeyRefresh } from "@/providers/MapKeyProvider";
import { ScrollAnimatedCleanup } from "@/providers/ScrollAnimatedProvider";
import { ExperienceProvider, HeaderExperience, InputContent, ListExperience } from "@/components/Experience";



export default function ExperiencePage() {
  return (
    <Fragment>
      <HeaderExperience />
      <ExperienceProvider>
        <ListExperience />
        <InputContent />
      </ExperienceProvider>
      <ScrollAnimatedCleanup />
      <MapKeyRefresh />
    </Fragment>
  )
}