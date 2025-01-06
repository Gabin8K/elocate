import { KeyboardAvoidingViewProvider } from "@/providers";
import { ExperienceProvider, HeaderExperience, InputContent } from "@/components/Experience";



export default function ExperiencePage() {
  return (
    <KeyboardAvoidingViewProvider>
        <HeaderExperience />
        <ExperienceProvider>
          <InputContent />
        </ExperienceProvider>
    </KeyboardAvoidingViewProvider>
  )
}