import { Fragment } from "react";
import { ExperienceProvider, HeaderExperience, InputContent } from "@/components/Experience";



export default function ExperiencePage() {
  return (
    <Fragment>
      <HeaderExperience />
      <ExperienceProvider>
        <InputContent />
      </ExperienceProvider>
    </Fragment>
  )
}