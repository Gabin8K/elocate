import { useLocale } from "@/hooks";
import { FormContent } from "./input";
import { useAuth } from "@/providers/AuthProvider";
import { useExperiences } from "./ExperienceContext";
import { FC, Fragment, memo, useEffect } from "react";
import { ExperienceModalLogin } from "./ExperienceModalLogin";



export const ExperienceRequest: FC = memo(function ExperienceRequest() {

  const { t } = useLocale();
  const { auth } = useAuth();
  const experience = useExperiences();

  const isReply = !!experience.reply;
  const requiredAuth = experience.showLoginModal;
  
  useEffect(() => {
    if (experience.showExperience || experience.reply) {
      if (auth) {
        experience.closeLoginModal();
      }
      else {
        experience.openLoginModal();
      }
    }
  }, [experience.showExperience, experience.reply, auth]);


  return (
    <Fragment>
      {requiredAuth ?
        <ExperienceModalLogin
          label={t(isReply ? 'experience-login-reply' : 'experience-login-experience')}
        /> :
        <FormContent />
      }
    </Fragment>
  )
});