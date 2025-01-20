import { Fragment } from "react";
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
    </Fragment>
  )
}