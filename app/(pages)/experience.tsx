import { Fragment } from "react";
import { ExperienceProvider, HeaderExperience, InputContent, ListExperience } from "@/components/Experience";



export default function ExperiencePage() {
  return (
    <Fragment>
      <HeaderExperience />
      <ExperienceProvider>
        <ListExperience />
        <InputContent />
      </ExperienceProvider>
    </Fragment>
  )
}