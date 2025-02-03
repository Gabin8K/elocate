import { Fragment } from "react";
import { MapKeyRefresh } from "@/providers/MapKeyProvider";
import { CommentProvider } from "@/components/Experience/CommentContext";
import { ScrollAnimatedCleanup } from "@/providers/ScrollAnimatedProvider";
import { ExperienceProvider, FormContent, HeaderExperience, ListExperience } from "@/components/Experience";



export default function ExperiencePage() {
  return (
    <Fragment>
      <HeaderExperience />
      <ExperienceProvider>
        <CommentProvider>
          <ListExperience />
          <FormContent />
        </CommentProvider>
      </ExperienceProvider>
      <ScrollAnimatedCleanup />
      <MapKeyRefresh />
    </Fragment>
  )
}